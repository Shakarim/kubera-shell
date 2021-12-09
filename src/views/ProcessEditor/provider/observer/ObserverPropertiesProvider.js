import identityProp from './parts/IdentityProp';

function createObserverTabGroups(element, translate) {
  let observerGroup = {
    id: 'observer',
    label: 'Observer',
    entries: []
  };
  identityProp(observerGroup, element, translate);

  return [observerGroup];
}

export default function ObserverPropertiesProvider(propertiesPanel, translate) {
  this.getTabs = function(element) {
    return function(entries) {
      entries.map(function(tab) {
        if (tab.id === 'general') {
          createObserverTabGroups(element, translate).forEach((group) => tab.groups.splice(1, 0, group));
        }
        return tab;
      });

      return entries;
    }
  };

  propertiesPanel.registerProvider(500, this);
}

ObserverPropertiesProvider.$inject = ['propertiesPanel', 'translate'];