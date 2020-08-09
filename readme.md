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
    
## Advance usage

### Creating a custom component

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

#### Using your custom component into the Engine

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

### Create your own System

A system is a simple javascript native function. It must have 2 additional properties:
* __query__: An array of component name that is used to retrieve entities that the system apply to
* __name__ : the name of the system. 

The main system function is called in each execution loop as many time as there entities that fullfill the system query.
For each call, the main function is called with the following parameter (in that order):
* __components__: A [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) of all Components of the given entity.
 
A simple System can be as followed:
    
    const f = (components) => {
    }
    f.query = ['someComponentName'] //name of components are case sensitive 

#### Register my custom system in the Engine    

You need to register the system before it will be executed. This can be used by the `register` function of the SystemManager.
The following code shows an example of system registration:

        const mySystem = (components) => {}
        mySystem.query = ['someComponentName']; 
        const eng = EnkiEngine();
        eng.systemMgr.register(mySystem); // registering system here
        
#### Execute Systems loop

Once systems are registered, you need to manually call the execution of all systems:
    
    const executionResults = eng.systemMgr.execute()

This is usually done within an animation loop. If your systems return values, they will be returned with the following format: 

    Map({systemName} => Map( {entityID} => {returnedValue} )

For example:

     Map(1) { 'HiddenSystem' => Map(1) { '1234567890' => true } }

    
### Creating a custom Storage Instance

In most cases, it is preferable to use the internal storage of Enki though in some specific case, you may want to use a different storage.
Example of storage could be a React State or Redux for applications. 

Creating a custom storage is straight forward. You need to first create a specific function with the following signature:


```$xslt
/**
 * 
 * @param {boolean} verbose - true if verbose mode set in Enki Engine
 * @returns {{addEntity: (function(*): Set<any>), removeEntityComponent: removeEntityComponent, getEntityComponents: (function(*): any), getEntities: (function(): Set<*>), addEntityComponent: addEntityComponent, getEntity: (function(*=): *), removeEntity: (function(*=): boolean), getEntityByComponents: (function(Array): *)}}
 * @constructor
 */
```

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

* `html_script_usage`: a basic browser example to show how to use EnkiEngine without ES6 modules.
* `react_state_storage`: a very simple custom storage example using React state
* `three.js`: a basic example to integrate three.js rendering engine with 1000 entities.  
* `customSystem.js`: a basic example of creating a custom system and registering it
* `customComponent.js`: basic example to create a custom component and registering it
* `performance.js`: basic (and very flawed) performance test with 100,000 entities. Performance really depend on the complexity of the systems registered.
