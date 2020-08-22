/**
 * This example works with nodejs.
 * It create a thousand entities with 1 component
 * and run three time the execution loop with 1 system
 */
const {
  performance
} = require('perf_hooks');
//require node build for Enki engine
const EnkiEngine = require('../build/enki-engine.node');

//create instance of Engine in debug mode so a lot of values will be printed in console
const eng = EnkiEngine();
//get entity manager
const entityMgr = eng.EntityManager;
//get component manager
const componentMgr = eng.ComponentManager;

// get system manager
const sysMgr = eng.SystemManager;
const position = {
  name: 'Position',
  data: {
    x: {type: 'number'},
    y: {type: 'number'}
  }
}
componentMgr.register(position)


//create my system.
const Move = () => {

  const execute = (components) => {
    const position = components.get('Position')
    position.x += 10;
    position.y += 10;
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
sysMgr.register(Move)

//create 100000 entities
const t0 = performance.now();
for(let i=0; i< 100000; i++){
  const myEntity = entityMgr.add();

//add component "Position" to entity with initial value for x and y to be 10
  componentMgr.add(myEntity, 'Position', {x:10*i, y:10*i});
}
const t1 = performance.now();
console.log(`Creating 100000 entities in ${t1 - t0} milliseconds.`);

const t2 = performance.now();

//execute all systems registered
sysMgr.execute(); // move system will be executed and position will be updated
const t3 = performance.now();
sysMgr.execute();
const t4 = performance.now();
sysMgr.execute();
const t5 = performance.now();
console.log(`First System Execution loop ${t3 - t2} milliseconds.`);
console.log(`Second System Execution loop in ${t4 - t3} milliseconds.`);
console.log(`Third System Execution loop in ${t5 - t4} milliseconds.`);
console.log(`All System Execution loops in ${t5 - t2} milliseconds.`);
