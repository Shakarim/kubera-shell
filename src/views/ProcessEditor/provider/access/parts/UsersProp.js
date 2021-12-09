import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import {is, getBusinessObject} from 'bpmn-js/lib/util/ModelUtil';

const propParentName = 'kubera:Users';

let elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
  cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
  extensionElementsHelper = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper');

function getExtensionElement(element, type) {
  if (!element.extensionElements) {
    return;
  }

  return element.extensionElements.values.filter((extensionElement) => {
    return extensionElement.$instanceOf(type);
  })[0];
}

function isExtensionElements(element) {
  return is(element, 'bpmn:ExtensionElements');
}

export default function(group, element, translate, bpmnModeler, bpmnFactory) {
  let businessObject = getBusinessObject(element);
  let moddle = bpmnModeler.get('moddle');

  if (is(element, 'bpmn:UserTask')) {
    group.entries.push(entryFactory.table(translate, {
      id: 'users',
      modelProperties: ['kubera:user'],
      labels: ['User'],
      description: 'Enter users which have access',
      addLabel: 'Add user',
      validate: function(element, value, node, idx) {
        return;
      },
      addElement: function(element, node, event, scopeNode) {
        let commands = [];
        let extensionElements = businessObject.extensionElements;
        if (!extensionElements) {
          extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, businessObject, bpmnFactory);
          commands.push(cmdHelper.updateBusinessObject(element, businessObject, { extensionElements: extensionElements }));
        }
        let users = getExtensionElement(businessObject, propParentName);
        if (!users) {
          users = elementHelper.createElement('kubera:Users', {}, extensionElements, bpmnFactory);
          extensionElements.get('values').push(users);
        }
        let newValue = elementHelper.createElement('kubera:User', { identity: '' }, users, bpmnFactory);

        commands.push(cmdHelper.addElementsTolist(element, users, 'users', [ newValue ]));
        return commands;
      },
      updateElement: function(element, value, node, index) {
        let item = getExtensionElement(businessObject, propParentName).users[index];
        return cmdHelper.updateBusinessObject(element, item, {identity: value['kubera:user']});
      },
      removeElement: function(element, node, index) {
        let commands = []
        let users = getExtensionElement(businessObject, propParentName);

        commands.push(cmdHelper.removeElementsFromList(element, users, 'users', null, [ users.users[index] ]));

        if (users.get('users').length === 1) {
          commands.push(extensionElementsHelper.removeEntry(businessObject, element, users));
        }

        return commands;
      },
      getElements: function(element, node) {
        switch(businessObject.$type) {
          case 'bpmn:UserTask':
            // Get extensions node
            let users = getExtensionElement(businessObject, propParentName);
            if (users && Array.isArray(users.users)) {
              node.querySelectorAll('input[name="kubera:user"]').forEach((e, i) => e.value = users.users[i].identity || '');
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