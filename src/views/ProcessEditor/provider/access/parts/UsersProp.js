import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import {is, getBusinessObject} from 'bpmn-js/lib/util/ModelUtil';

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
      setControlValue: function(element, entryNode, input, prop, value, idx) {
        // Get extensions node
        let users = getExtensionElement(businessObject, propParentName);
        let userList = (users && Array.isArray(users.users)) ? users.users : [];
        let inputValue = (userList[idx] && userList[idx].identity) ? userList[idx].identity : '';
        input.setAttribute("value", inputValue);
      },
      validate: function(element, value, node, idx) {
        return;
      },
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
      },
      updateElement: function(element, value, node, index) {
        // Get/create `users` tag inside extensions
        let users = getExtensionElement(businessObject, propParentName);
        let input = (users.get('users')[index].identity !== value['access:user'])
          ? node.querySelectorAll('[data-index="' + index + '"]')[0].getElementsByTagName('input')[0]
          : undefined;
        if (users && users.get('users')[index])
          users.get('users')[index].identity = value['access:user'];

        if (input)
          setTimeout(function() {input.selectionStart = input.selectionEnd = input.value.length;}, 0);
      },
      removeElement: function(element, node, index) {
        // Get extensions node
        let extensionElements = businessObject.extensionElements || moddle.create('bpmn:ExtensionElements');
        // Get values from extension node
        let existEEV = extensionElements.get('values');
        // Get/create `users` tag inside extensions
        let users = getExtensionElement(businessObject, propParentName) || moddle.create(propParentName);

        // Add new item into `users` block
        if (users.get('users')[index])
          users.get('users').splice(index, 1);

        // Check `access:Users` block existing in extensions and replace old value for new
        let existIndex = existEEV.findIndex((el, i, arr) => el.$type === 'access:Users');
        extensionElements.get('values')[(existIndex === -1) ? 0 : existIndex] = users;

        // Update properties for current element
        modeling.updateProperties(element, {extensionElements});
      },
      getElements: function(element, node) {
        switch(businessObject.$type) {
          case 'bpmn:UserTask':
            // Get extensions node
            let users = getExtensionElement(businessObject, propParentName);
            return (users && Array.isArray(users.users)) ? users.users : [];
            break;
          default:
            return [];
            break;
        }
      }
    }));
  }
}