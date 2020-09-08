# Enki - Engine

![unit_test](https://github.com/enkige/engine/workflows/Unit%20Test/badge.svg) ![build](https://github.com/enkige/engine/workflows/Build/badge.svg)


Enki Engine is a Entity Component System library in native Javascript.  
It is highly inspired from the ECSY framework made by Mozila.  

Enki Engine in a few points:  

* __Easy to understand and get started__ with examples provided with major rendering engine like THREE.JS
* Native javascript with __very small footprint__. The build is around 30-60kb depending on platforms.
* __Crossplatforms__ support: 
    * Browser: Chrome, Safari, Firefox, Edge (usually last 3 versions only)
    * ECMAScript Modules, play well with React and other framework
    * Node 12+ (it probably work for older versions of node but we don't actively support it and won't fix bugs for them)
* early version so expect a few missing features or issues. 

Breaking changes may happen until Enki Engine reach version 0.1 hence we strongly advise to read the release notes on github before updating the package.
Please see the [changelog](changelog.md) for breaking changes

## Getting started

The best way to get started is to have a look at our examples in the [examples]('./examples) folder.
You can add Enki Engine with npm or yarn:

    npm install @enki/engine

### Creating a component

A component is a simple javascript object consisting of a required name property and an optional data structure as followed:

    const myComponent = {
        name: 'myComponentName', //only alphanumeric allowed, no space, no symbol. Name is case sensitive
    }

The data itself is a representation of the data your component store. It must be an object where each key will be a data.
You can specify the type and default value for each property. By default, every key is required, you can add optional key by using an `optional` property set to true.  Here are the different way you can specify data:

        const myComponent = {
            name: 'myComponentName', //only alphanumeric allowed, no space, no symbol
            data: {
                firstData: {}, //nothing specified so firstData can be anything
                aString: {type: 'string'}, //simply specify type
                aNumberWithDefault: {type: 'number', default:0},
                anOptionalValue: {optional: true}, // this value will be required 
                anArrayOfAnything: {type: 'array'}, //an array of mixed type (or not)
                anArrayOfString: {type: 'array', childType: 'string', default: ['blue', 'red'] } // an array of string with a default value 
            }
        }
 
Here are the different available values for the data structure keys:
* __type__: any of 'string', 'number', 'array', 'enum', 'any'
* __childType__: only used if __type__ is `array`. Any of 'string', 'number', 'mixed'.  
* __default__: any value that must match the type.
* __optional__: boolean. set it to true if the property is optional. 
* __allowed__: array of values that are allowed when type is enum.


Please note that the type `any` allow you to pass any type of data, such as class instance, functions, objects etc. and that no data validation will be made for these properties.
This allow to pass complex data such as Rendering Engine Mesh for examples (see the [THREE.JS](./examples/three.js/index.html) example).   

#### Using your component into the Engine

You need to register your component before you add it to an entity. Components name need to be unique.
If an existing component as the same name as your component, your component will override the existing one.
This can be used to override predefined components from the engine.  

You can use the following snippet to register a component:
    
    const myComponent = {name:'custom'};
    const eng = EnkiEngine();
    eng.componentMgr.register(myComponent); // registering component here
    eng.componentMgr.add(
      eng.EntityManager.add(),
     'custom'
     );
    
See the [examples](./examples) folder for some complex examples of custom components.
### Using Templates
In most softwares and games, you will reuse the same types of entity with the same list of components attached to it. 
Enki Engine has a notion of templates that makes this easier. A template consist of a unique name, a list of component and their associated default values. 
Templates take care of registration components for you and make creating several entities with the same component easier.

For example, a 3D entity object may have a few components like: 
* position
* velocity
* renderable

You could set them up with the Entity and Component Manager or you can create a template as followed: 

    import {Position, Velocity, Renderable} from './components.js';
    //we don't register components and only register template
    const eng = EnkiEngine.default();

    // get template manager
    const tplMgr = eng.TemplateManager;
    // prepare default values
    const dv = new Map()
        .set('Position', {x: 0, y: 0, z: 0})
    //register new template
    tplMgr.register('3Dobject', [Position, Velocity, Renderable], dv);
    const values = new Map()
                .set('Velocity', {dx: dx, dy: dy, dz: dz} );
    const entity1 = tplMgr.create('3Dobject', values);
    const entity2 = tplMgr.create('3Dobject', values);
    const entity3 = tplMgr.create('3Dobject', values);
    

See the full example ['./examples/three.js/template_example.html']('./examples/three.js/template_example.html') and
 compare it with non template code ['./examples/three.js/index.html']('./examples/three.js/index.html')
    

### Create a System

A system is a simple javascript native function that return an object with two functions:

* __execute__: the main function called every execution loop as many time as there entities that fullfill the system query
* __events__: a function called every time an event the system listen is happening. For each event fired, this function will be called as many time as there are entities that fullfill the system query. 

It also must have 2 additional properties:
* __query__: An array of component name that is used to retrieve entities that the system apply to
* __events__: An array of events name the system will listen to

The main system function is called once when registering the sytem. in each execution loop as many time as there entities that fullfill the system query.
For each call, the main function is called with the following parameter (in that order):
* __components__: A [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) of all Components of the given entity.
 
A simple System can be as followed:
    
    const f = () => {
        return {
          execute: (entityComponents) => { /* some logic */ }
          events: (entityComponents, eventName, eventData) => { /* some logic */ }
        }
    }
    f.query = ['someComponentName'] //name of components are case sensitive 
    f.events = ['someEventName'] //name of events are case sensitive

#### Register a system in the Engine    

You need to register the system before it will be executed. This can be used by the `register` function of the SystemManager.
The following code shows an example of system registration:

        const mySystem = () => {
           return {
                    execute: (entityComponents) => { /* some logic */ }
                    events: (entityComponents, eventName, eventData) => { /* some logic */ }
                  }
        }
        mySystem.query = ['someComponentName']; 
        mySystem.events = []; 
        const eng = EnkiEngine();
        eng.systemMgr.register(mySystem); // registering system here
        
#### Execute Systems loop

Once systems are registered, you need to manually call the execution of all systems:
    
    const executionResults = eng.systemMgr.execute()

This is usually done within an animation loop. If your systems return values, they will be returned with the following format: 

    Map({systemName} => Map( {entityID} => {returnedValue} )

For example:

     Map(1) { 'HiddenSystem' => Map(1) { '1234567890' => true } }
     
#### Using events

Before you can use an event, this even must be registered within the systemManager instance. 
You can do so with the following function:
    
    eng.systemMgr.registerEvent('MyEventName')

Once an event is registered, you can trigger events by using the following: 

    eng.systemMgr.triggerEvent('MyEventName', {})

You can pass data to the she system Events function by passing an object as the second parameter of the `triggerEvent` function. 
You can also enforce which entities will be triggered by this event by passing an array of entity ID as the third parameter of the `triggerEvent` function. 

Here is a full example that trigger a click event with some user input and only allow the `display` element to be trigered by this event.

    const eng = EnkiEngine();
    const someComponentName = { name:'someComponentName' }
    const mySystem = () => {
               return {
                        execute: (entityComponents) => { /* some logic */ }
                        events: (entityComponents, eventName, eventData) => { 
                            if (eventName == 'click') { /* some logic */ }
                        }
                      }
            }
    mySystem.query = ['someComponentName']; 
    mySystem.events = ['click]; // add listener to click event
    const eng = EnkiEngine();
    eng.systemMgr.register(mySystem); // registering system here
    eng.systemMgr.registerEvent('click'); // registering system event here
    const en = eng.entityMgr.add('display')
    componentMgr.add(en, someComponentName.name)
    eng.systemMgr.triggerEvent('click', {name: 'my new name'},['display']) // trigger a 'click' event with data only for the entity 'display'
    
     

    
### Creating a custom Storage Instance

In most cases, it is preferable to use the internal storage of Enki though in some specific case, you may want to use a different storage.
Example of storage could be a React State or Redux for applications. 

Creating a custom storage is straight forward. You need to first create a specific function with the following signature:


```
/**
 * @param {boolean} verbose - true if verbose mode set in Enki Engine
 * @param {{Entities: {Set}, ComponentMap:{Map}, EntityComponents: {Map} }} [state] - Optional Object containing 3 property that must react like Map or Set. Will be used to store the state
 * @returns {{addEntity: (function(*): Set<any>), removeEntityComponent: removeEntityComponent, getEntityComponents: (function(*): any), getEntities: (function(): Set<*>), addEntityComponent: addEntityComponent, getEntity: (function(*=): *), removeEntity: (function(*=): boolean), getEntityByComponents: (function(Array): *), getState: (function(): Object}}
 */
```

It is possible to use the second parameter of the constructor to pass external state to the Engine, this allow to extends the storage engine.
An example is available [here](./examples/react_state_storage/storage.js)

The signature of each returned functions are available [here](./src/storage/memoryStorage.js).

#### Using your storage

The storage is key to the EnkiEngine. It is not possible to use it without a storage and it must be initialised as early as possible hence the only way to register your storage is to pass it as a parameter when you create an instance of the EnkiEngine.
YOu can do so by setting the `storageType` to `custom` and passing your storage function to the `storageInstance`.

    const Storage = function(verbose) {...}
    const eng = EnkiEngine({mode: 'debug', storageType: 'custom', storageInstance: Storage});

An example of custom storage using a React State is available in the [examples](./examples/react_state_storage/storage.js) folder.

## Run examples

The easiest way to run the examples included in the examples folder is to clone this repository.
Then you need to install the dependencies for Enki Engine:
    
    npm install 

Most examples run with nodes as followed :    

    npm run example -- ./examples/nodeUsage.js

Other examples are based on a html files and shows ways to use Enki in browser. For these examples, you need a http server running. 
We recommend a simple server `http-server` but you can use any other one.  

    npm install -g http-server
    
You must run the server directly at the root of the package (`packages/engine`).
You can do so with the command:
    
    http-server

Then you can access the example at the following url: 

    htpp://localhost:8080/examples/some_example/index.html

(remember to change `some_example` to the example you want to check.)

### List of Examples available

We will try to keep this list updated but the best way to check examples available is to go to the [examples](./examples) folder.

* `basic.js`: a basic example of creating systems and components
* `html_script_usage`: a basic browser example to show how to use EnkiEngine without ES6 modules.
* `react_state_storage`: a very simple custom storage example using React state
* `three.js`: a basic example to integrate three.js rendering engine with 1000 entities.  
* `performance.js`: basic (and very flawed) performance test with 100,000 entities. Performance really depend on the complexity of the systems registered.
