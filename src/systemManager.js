import {isArray, isString} from './utils/validate';

export const SystemManager = (storage, verbose) => {

    const _storage = storage;
    const _registeredSystems = new Map();
    const _registerEvents = new Set();


    const _log = (...$msg) => {
        if (verbose) {
            console.log('System Manager: ', ...$msg)
        }
    }

    const _query = (q) => {
        return _storage.getEntityByComponents(q);
    }

    const _validate = (system) => {
        //check that system is a function with the correct prototype
        if (typeof (system) !== 'function' || !system.hasOwnProperty('query')) {
            _log('Trying to register a system that is either not a function or does not have a name and query defined');
            return false;
        }

        if (!isArray(system.query, 'string')) {
            _log(`System ${system.name} does not have a correct query. A query must be an array of string.`)
            return false;
        }

        if (!isArray(system.events, 'string')) {
            _log(`System ${system.name} does not have a correct events trigger setup. Systems must have an events property that is an empty array or an array of Events name.`)
            return false;
        }

        const res = system()
        if(!res.hasOwnProperty('execute') || typeof (res.execute) !== 'function') {
            _log(`System ${system.name} does not have an execute function`)
            return false
        }

        if(!res.hasOwnProperty('events') || typeof (res.events) !== 'function') {
            _log(`System ${system.name} does not have an events function`)
            return false
        }

        return true
    }


    /**
     * Execute all registered systems
     * @returns {Map{Array}} - Return values from each system
     */
    const execute = () => {
        // loop through all systems
        const returnValues = new Map();
        for (let [name, system] of _registeredSystems) {
            const entities = _query(system.query);
            returnValues.set(name, new Map())
            entities.forEach((e) => {
                returnValues.get(name).set(e, system.instance.execute(_storage.getEntityComponents(e)))
            })
        }
        return returnValues;
    }

    /**
     * Register a new system
     * @param {function} system - A system to be registered
     * @returns {boolean} - True if successful else false
     */
    const register = (system) => {
        if (_validate(system)) {
            _log(`Registering ${system.name} System`)
            _registeredSystems.set(system.name, { instance: system(), query: system.query, events: system.events});
            return true;
        } else {
            _log(`System ${system.name} failed validation and was not registered.`);
            return false;
        }
    }

    /**
     * Register Event
     * @param {string} eventName - Event Name
     * @returns {boolean} - True if registered
     */
    const registerEvent = (eventName) => {
        if (isString(eventName)) {
            _registerEvents.add(eventName);
            return true;
        } else {
            _log(`Event ${eventName} failed validation and was not registered.`);
            return false;
        }
    }

    const triggerEvent = (eventName, eventData) => {
        if(!_registerEvents.has(eventName)) {
            _log(`Event ${eventName} is not registered.`);
            return false;
        }

        // loop through all systems
        const returnValues = new Map();
        for (let [name, system] of _registeredSystems) {
            if(system.events.includes(eventName)){
                const entities = _query(system.query);
                returnValues.set(name, new Map())
                entities.forEach((e) => {
                    returnValues.get(name).set(e, system.instance.events(_storage.getEntityComponents(e),eventName,eventData))
                })
            }
        }
        return returnValues;
    }

    return {
        execute,
        register,
        registerEvent,
        triggerEvent
    }

}
