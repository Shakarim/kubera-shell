import usersProp from './parts/UsersProp';

function createAccessTabGroups(element, translate, modeler) {
  let usersGroup = {
    id: 'users',
    label: 'Users',
    entries: []
  };
  usersProp(usersGroup, element, translate, modeler);

  return [usersGroup];
}

export default function AccessPropertiesProvider(propertiesPanel, translate, modeler) {
  this.getTabs = function(element) {
    return function(entries) {
      let accessTab = {
        id: 'access',
        label: 'Access',
        groups: createAccessTabGroups(element, translate, modeler)
      };

      entries.push(accessTab);

      return entries;
    }
  };

  propertiesPanel.registerProvider(500, this);
}

AccessPropertiesProvider.$inject = ['propertiesPanel', 'translate', 'bpmnjs'];