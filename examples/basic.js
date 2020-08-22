/*
This examples shows how you can create your own systems and register them into the engine
 */

//this is a simple component with several data points
const PositionComponent = {
  name: 'Position',
  data: {
    x: {type: 'number', default: 0},
    y: {type: 'number', default: 0},
    z: {type: 'number', default: 0}
  }
}

//this is an empty components that is used as a "flag" for system to query the relevant entities
const RenderableComponent = {
  name: 'Renderable'
}

//create my system.
const Move = () => {
  const log = (msg) => {
    console.log(`Custom System: ${msg}`)
  }

  const execute = (components) => {
    log('In my custom System')
    const position = components.get('Position')
    position.x += 10;
    position.y += 10;
    log('New Position', components)
    return components;
  }

  const events = () => {

  }

  return {
    execute,
    events
  }


};
Move.query = ['Position'];
Move.events = [];




//require node build for Enki engine
const EnkiEngine = require('../build/enki-engine.node');

//create instance of Engine in debug mode so a lot of values will be printed in console
const eng = EnkiEngine({mode: 'debug'});


//get component manager
const componentMgr = eng.ComponentManager;
//register new components
componentMgr.register(PositionComponent);
componentMgr.register(RenderableComponent);


//get entity manager
const entityMgr = eng.EntityManager;
//add a new entity
const myEntity = entityMgr.add();

//add component "Position" to entity with initial value for x and y to be 10
componentMgr.add(myEntity, 'Position', {x:10, y:10});
componentMgr.add(myEntity, 'Renderable');


// get system manager
const sysMgr = eng.SystemManager;
sysMgr.register(Move)
//execute all systems registered
sysMgr.execute(); // move system will be executed and position will be updated

