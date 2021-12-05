import rulesProp from './parts/RulesProp';

function createConditionsTabGroups(element, translate) {
  let generalGroup = {
    id: 'general',
    label: 'General',
    entries: []
  };
  rulesProp(generalGroup, element, translate);

  return [generalGroup];
}

export default function ConditionsPropertiesProvider(propertiesPanel, translate) {
  this.getTabs = function(element) {
    return function(entries) {
      let conditionsTab = {
        id: 'conditions',
        label: 'Conditions',
        groups: createConditionsTabGroups(element, translate)
      };

      entries.push(conditionsTab);

      return entries;
    }
  };

  propertiesPanel.registerProvider(500, this);
}

ConditionsPropertiesProvider.$inject = ['propertiesPanel', 'translate'];