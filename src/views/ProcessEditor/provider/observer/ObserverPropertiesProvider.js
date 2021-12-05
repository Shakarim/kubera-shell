// require your custom property entries.
import identityProp from './parts/IdentityProp';

var PRIORITY = 500;


// create the custom magic tab
// the properties are organized in groups
function createObserverTabGroups(element, translate) {

  // create a group called "Black Magic".
  var observerGroup = {
    id: 'general',
    label: 'General',
    entries: []
  };

  // add the spell props to the black magic group
  identityProp(observerGroup, element, translate);

  return [observerGroup];
}

/**
 * A provider with a `#getTabs(element)` method
 * that exposes tabs for a diagram element.
 *
 * @param {PropertiesPanel} propertiesPanel
 * @param {Function} translate
 */
export default function ObserverPropertiesProvider(propertiesPanel, translate) {

  // API ////////

  /**
   * Return the tabs provided for the given element.
   *
   * @param {DiagramElement} element
   *
   * @return {(Object[]) => (Object[])} tab entry middleware
   */
  this.getTabs = function(element) {
    /**
     * We return a middleware that modifies
     * the existing tabs.
     *
     * @param {Object[]} entries
     *
     * @return {Object[]} modified entries
     */
    return function(entries) {
      var observerTab = {
        id: 'observer',
        label: 'Observer',
        groups: createObserverTabGroups(element, translate)
      };

      entries.push(observerTab);
  
      // show general + "magic" tab
      return entries;
    }
  };


  // registration ////////

  // register our custom magic properties provider
  // use a lower priority to ensure it is loaded after
  // the basic BPMN properties
  propertiesPanel.registerProvider(PRIORITY, this);
}

ObserverPropertiesProvider.$inject = ['propertiesPanel', 'translate'];