import usersProp from './parts/UsersProp';
import groupsProp from './parts/GroupsProp';

function createAccessTabGroups(element, translate, modeler, bpmnFactory) {
  let usersGroup = {
    id: 'users',
    label: 'Users',
    entries: []
  };
  usersProp(usersGroup, element, translate, modeler, bpmnFactory);

  let groupsGroup = {
    id: 'groups',
    label: 'Groups',
    entries: []
  };
  groupsProp(groupsGroup, element, translate, modeler, bpmnFactory);

  return [
    usersGroup,
    groupsGroup
  ];
}

export default function AccessPropertiesProvider(propertiesPanel, translate, modeler, bpmnFactory) {
  this.getTabs = function(element) {
    return function(entries) {
      let accessTab = {
        id: 'access',
        label: 'Access',
        groups: createAccessTabGroups(element, translate, modeler, bpmnFactory)
      };

      entries.push(accessTab);

      return entries;
    }
  };

  propertiesPanel.registerProvider(500, this);
}

AccessPropertiesProvider.$inject = ['propertiesPanel', 'translate', 'bpmnjs', 'bpmnFactory'];