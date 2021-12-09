import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import {is, getBusinessObject} from 'bpmn-js/lib/util/ModelUtil';

const propParentName = 'kubera:Groups';

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
      id: 'groups',
      modelProperties: ['kubera:group'],
      labels: ['Group'],
      description: 'Enter groups which have access',
      addLabel: 'Add group',
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
        let groups = getExtensionElement(businessObject, propParentName);
        if (!groups) {
          groups = elementHelper.createElement('kubera:Groups', {}, extensionElements, bpmnFactory);
          extensionElements.get('values').push(groups);
        }
        let newValue = elementHelper.createElement('kubera:Group', { identity: '' }, groups, bpmnFactory);

        commands.push(cmdHelper.addElementsTolist(element, groups, 'groups', [ newValue ]));
        return commands;
      },
      updateElement: function(element, value, node, index) {
        let item = getExtensionElement(businessObject, propParentName).groups[index];
        return cmdHelper.updateBusinessObject(element, item, {identity: value['kubera:group']});
      },
      removeElement: function(element, node, index) {
        let commands = []
        let groups = getExtensionElement(businessObject, propParentName);

        commands.push(cmdHelper.removeElementsFromList(element, groups, 'groups', null, [ groups.groups[index] ]));

        if (groups.get('groups').length === 1) {
          commands.push(extensionElementsHelper.removeEntry(businessObject, element, groups));
        }

        return commands;
      },
      getElements: function(element, node) {
        switch(businessObject.$type) {
          case 'bpmn:UserTask':
            // Get extensions node
            let groups = getExtensionElement(businessObject, propParentName);
            if (groups && Array.isArray(groups.groups)) {
              node.querySelectorAll('input[name="kubera:group"]').forEach((e, i) => e.value = groups.groups[i].identity || '');
              return groups.groups;
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