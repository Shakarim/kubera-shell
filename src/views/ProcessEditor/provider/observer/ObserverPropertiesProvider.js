import identityProp from './parts/IdentityProp';

function createObserverTabGroups(element, translate) {
  let observerGroup = {
    id: 'general',
    label: 'General',
    entries: []
  };
  identityProp(observerGroup, element, translate);

  return [observerGroup];
}

export default function ObserverPropertiesProvider(propertiesPanel, translate) {
  this.getTabs = function(element) {
    return function(entries) {
      let observerTab = {
        id: 'observer',
        label: 'Observer',
        groups: createObserverTabGroups(element, translate)
      };

      entries.push(observerTab);

      return entries;
    }
  };

  propertiesPanel.registerProvider(500, this);
}

ObserverPropertiesProvider.$inject = ['propertiesPanel', 'translate'];