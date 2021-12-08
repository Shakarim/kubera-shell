import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import {is, getBusinessObject} from 'bpmn-js/lib/util/ModelUtil';

const propParentName = 'access:Users';

let elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
  cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');

function getExtensionElement(element, type) {
  if (!element.extensionElements) {
    return;
  }

  return element.extensionElements.values.filter((extensionElement) => {
    return extensionElement.$instanceOf(type);
  })[0];
}

export default function(group, element, translate, bpmnModeler, bpmnFactory) {
  let businessObject = getBusinessObject(element);

  if (is(element, 'bpmn:UserTask')) {
    group.entries.push(entryFactory.table(translate, {
      id: 'users',
      modelProperties: ['access:user'],
      labels: ['User'],
      description: 'Enter users which have access',
      addLabel: 'Add user',
      validate: function(element, value, node, idx) {
        return;
      },
      addElement: function(element, node, event, scopeNode) {
        let users = getExtensionElement(businessObject, propParentName);
        let newValue = elementHelper.createElement('access:User', { identity: undefined }, users, bpmnFactory);
        return cmdHelper.addElementsTolist(element, users, 'users', [ newValue ]);
      },
      updateElement: function(element, value, node, index) {
        let item = getExtensionElement(businessObject, propParentName).users[index];
        return cmdHelper.updateBusinessObject(element, item, {identity: value['access:user']});
      },
      removeElement: function(element, node, index) {
        let users = getExtensionElement(businessObject, propParentName);
        return cmdHelper.removeElementsFromList(element, users, 'users', null, [ users.users[index] ]);
      },
      getElements: function(element, node) {
        switch(businessObject.$type) {
          case 'bpmn:UserTask':
            // Get extensions node
            let users = getExtensionElement(businessObject, propParentName);
            if (users && Array.isArray(users.users)) {
              node.querySelectorAll('input[name="access:user"]').forEach((e, i) => e.value = users.users[i].identity);
              return users.users;
            }
            return [];
            break;
          default:
            return [];
            break;
        }
      }
    }));
  }
}