import rulesProp from './parts/RulesProp';

export default function ConditionsPropertiesProvider(propertiesPanel, translate) {
  this.getTabs = function(element) {
    return function(entries) {
      entries.map(function(tab) {
        if (tab.id === 'general') {
          tab.groups.map(function(group) {
            if (group.id === 'general') {
              rulesProp(group, element, translate)
            }
            return group;
          });
        }
        return tab;
      });

      return entries;
    }
  };

  propertiesPanel.registerProvider(500, this);
}

ConditionsPropertiesProvider.$inject = ['propertiesPanel', 'translate'];