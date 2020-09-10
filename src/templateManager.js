import {ValidationError} from './utils/errors';
import {isString, isArray, isMap} from './utils/validate'

export const TemplateManager = (entityMgr, componentMgr, verbose) => {
    const _registeredTemplates = new Map()

    const _log = (...$msg) => {
        if (verbose) {
            console.log('Template Manager: ', ...$msg);
        }
    };


    /**
     * Register a new Template for use
     *
     * @param {string} name - Name of the template, must be unique
     * @param {Array} components - Array of Components used by this templates. Cannot be empty.
     * @param {Map} defaultValues - Map of default Values for each components in `components` param. Key must be a component name.
     * @param {boolean} registerComponents - If true, will register components if they are not already registered. if false, will fail registration of template if a component is not registered
     * @returns {Boolean} - True if registered
     *
     * @throws ValidationError - Error if the templates is invalid
     */
    const register = (name, components, defaultValues = null, registerComponents = true) => {
        _log('Registering template')

        if (!isString(name)) {
            throw new ValidationError('Invalid name for template');
        }

        // check iof template already exists
        if (_registeredTemplates.has(name)) {
            throw new ValidationError('A template with this name already exists.');
        }

        if (!isArray(components, 'components') || components.length == 0) {
            throw new ValidationError('Invalid components list');
        }

        // check if all components are registered, if not registered
        for(let c of components) {
            if(!componentMgr.isRegistered(c['name']) && registerComponents) {
                componentMgr.register(c)
            } else if (!componentMgr.isRegistered(c['name']) && !registerComponents) {
                throw new ValidationError(`Component ${c['name']} is not registered.`);
            }
        }

        if (defaultValues !== null && !isMap(defaultValues)) {
            throw new ValidationError('defaultValues must be a Map.');
        }

        _log('Template validation successful')

        _registeredTemplates.set(name, {
            name,
            components,
            defaultValues: defaultValues || new Map()
        })


        return true;
    }

    /**
     *  Create an entity based on the given template
     * @param {string} templateName - Name of the template to use
     * @param {Map} values - Map of component values
     * @param {string} [entityId] - Optional Entity Id to use during creation
     * @returns {string} - Id of the entity added
     *
     * @throws ValidationError|Error
     */
    const create = (templateName, values, entityId) => {
        if (!_registeredTemplates.has(templateName)) {
            throw new ValidationError('Template does not exist');
        }

        const template = _registeredTemplates.get(templateName);


        const id = entityMgr.add(entityId)
        for (let c of template['components']) {
            try {
                // prepare values for component
                let v = {}
                if(typeof values !== 'undefined') {
                    v = values.get(c['name']);
                }
                const d = template['defaultValues'].get(c['name']) || {};
                const data = Object.assign(d, v)

                //add component to entity
                componentMgr.add(id, c['name'], data)
            } catch (err) {
                //we need to delete the entity and all associated components
                entityMgr.remove(id)
                _log(`TemplateManager: Failed to add ${c['name']} component to entity.`)
                _log(err.message)

                //bubble up error
                throw new Error(`TemplateManager: Failed to add ${c['name']} component to entity during creation.`)
            }

        }


        return id;
    }

    /**
     * Return a Map containing all registered templates
     * @returns {Map<any, any>}
     */
    const list = () => {
        return new Map(_registeredTemplates)
    }

    /**
     * Remove a template.
     * Removing a template does not remove existing enitties created with this template.
     *
     * @param {string} templateName - Name of the template to remove
     * @returns {boolean} - True if template was removed
     *
     * @throws ValidationError
     */
    const remove = (templateName) => {
        if (!_registeredTemplates.has(templateName)) {
            throw new ValidationError('Template does not exist');
        }
        return _registeredTemplates.delete(templateName);
    }

    /**
     * Load several templates and entities in one go from an object
     *
     * @param {object} schema - Object
     */
    const load = (data) => {
        try {
            if(data.hasOwnProperty('templates')) {
                // register all templates
                _log('Loading templates')
                for( let t of data['templates']) {
                    register(t['name'], t['components'], new Map(Object.entries(t['defaultValues'])))
                }
            } else {
                _log('Your object must contains a `templates` property');
                return false
            }
        } catch(err) {
            _log(err);
            throw new Error('Not able to load templates because of malformed data.');
        }
        return true
    }

    /**
     * Dump all templates and template entities into an object
     */
    const dump = () => {
        const data = {
            templates: [],
        }

        // dump templates
        _registeredTemplates.forEach((t) => {

            data['templates'].push({
                name: t['name'],
                components: t['components'],
                defaultValues: Object.fromEntries(t['defaultValues'])
            });
        })

        return data;

    }

    return {
        list,
        register,
        create,
        remove,
        dump,
        load
    };
};
