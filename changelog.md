# Changelog

## Version 0.2.0

* Add Template feature

## Version 0.1.0

* __Breaking Change__:
    * New event system to have reactive ECS framework. All Systems must be updated or will be rejected when being registered.
* Fix issue when deleting an entity. Components added to the entity will now be removed as well.
* Storage Engine improvement:
    * storage is exported as `_storage`, this allow developers to extend the current storage engine.
    * add a function `getState` to retrieve the current state of the storage engine
    * add new parameter to storage to allow passing an external state to the Storage Engine. This allow developer to further extend the storage engine by themselves.  

## Version 0.0.7

* Bump version for npm repository

## Version 0.0.6

* Fix Issue with systems query using multiple components when one of these components is unused or not registered
* Expose Storage instance from EnkiEngine. 
* Expose returned values of Systems after executions 

## Version 0.0.5

* Fix package.json for failing es6 module imports for browser.

## Version 0.0.4

* Add unit tests
* Fix several minor issues such as returned values uniformity and parameters validation tests

## Version 0.0.3

* Fix issue when adding component with enum, any and array data types.
* Add unit tests for ComponentManager
* Add Docstring for Component Manager