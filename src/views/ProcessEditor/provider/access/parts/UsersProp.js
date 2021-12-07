import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import {is, getBusinessObject} from 'bpmn-js/lib/util/ModelUtil';
import CmdHelper from '../../../helper/CmdHelper';

const propParentName = 'access:Users';

function getExtensionElement(element, type) {
  if (!element.extensionElements) {
    return;
  }

  return element.extensionElements.values.filter((extensionElement) => {
    return extensionElement.$instanceOf(type);
  })[0];
}

export default function(group, element, translate, bpmnModeler) {
  let businessObject = getBusinessObject(element);
  let moddle = bpmnModeler.get('moddle');
  let modeling = bpmnModeler.get('modeling');

  if (is(element, 'bpmn:UserTask')) {
    group.entries.push(entryFactory.table(translate, {
      id: 'users',
      modelProperties: ['access:user'],
      labels: ['User'],
      description: 'Enter users which have access',
      addLabel: 'Add user',
      addElement: function(element, node, event, scopeNode) {
        // Get extensions node
        let extensionElements = businessObject.extensionElements || moddle.create('bpmn:ExtensionElements');
        // Get values from extension node
        let existEEV = extensionElements.get('values');
        // Get/create `users` tag inside extensions
        let users = getExtensionElement(businessObject, propParentName) || moddle.create(propParentName);
        let user = moddle.create('access:User', {identity: ''});

        // Add new item into `users` block
        users.get('users').push(user);

        // Check `access:Users` block existing in extensions and replace old value for new
        let existIndex = existEEV.findIndex((el, i, arr) => el.$type === 'access:Users');
        extensionElements.get('values')[(existIndex === -1) ? 0 : existIndex] = users;

        // Update properties for current element
        modeling.updateProperties(element, {extensionElements});

        // return [CmdHelper.addElementsTolist(element, users, 'identity', [user])];
      },
      updateElement: function(element, value, node, idx) {
        // Get extensions node
        let extensionElements = businessObject.extensionElements || moddle.create('bpmn:ExtensionElements');
        // Get values from extension node
        let existEEV = extensionElements.get('values');
        // Get/create `users` tag inside extensions
        let users = getExtensionElement(businessObject, propParentName) || moddle.create(propParentName);

        // Add new item into `users` block
        users.get('users')[idx] = moddle.create('access:User', {identity: value['access:user']});

        // Check `access:Users` block existing in extensions and replace old value for new
        let existIndex = existEEV.findIndex((el, i, arr) => el.$type === 'access:Users');
        extensionElements.get('values')[(existIndex === -1) ? 0 : existIndex] = users;

        // Update properties for current element
        modeling.updateProperties(element, {extensionElements});
      },
      removeElement: function(element, node, index) {
        // return [{'access:user': 'qwe'}]
      },
      getElements: function(element, node) {
        switch(businessObject.$type) {
          case 'bpmn:UserTask':// Get extensions node
            let users = getExtensionElement(businessObject, propParentName);
            return (users && Array.isArray(users.users)) ? users.users : [];
            // return (users && Array.isArray(users.users)) ? users.users.map((q) => q.identity) : [];
            break;
          default:
            return [];
            break;
        }
      }
    }));
  }
}