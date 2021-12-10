import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import {is, getBusinessObject} from 'bpmn-js/lib/util/ModelUtil';

let elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
  cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
  extensionElementsHelper = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper');


export default function(group, element, translate) {
  if (is(element, 'bpmn:ServiceTask')) {
    group.entries.push(entryFactory.selectBox(translate, {
      id : 'type',
      description : 'Select type of service',
      label : 'Service type',
      selectOptions: [
        { value: 'specificModule', name: translate('Specific module') }
      ],
      modelProperty : 'implType',

      validate: function(element) {
        let bo = getBusinessObject(element);
        return (bo.get('observer:type')) ? {} : {implType: 'service task must have a type'}
      },
      get: function(element, node) {
        let bo = getBusinessObject(element);
        return {
          implType: bo.get('observer:type') || ''
        };
      },
      set: function(element, values, node) {
        let bo = getBusinessObject(element);
        let newType = values.implType;

        let props = {'observer:type': newType};
        switch (newType) {
          case 'specificModule':
            props['observer:identity'] = '';
            break;
          default:
            delete props['observer:identity'];
            break;
        }

        let commands = [];
        commands.push(cmdHelper.updateBusinessObject(element, bo, props));

        return commands;
      }
    }));

    group.entries.push(entryFactory.textField(translate, {
      id : 'identity',
      description : 'Enter identity',
      label : 'Identity',
      modelProperty : 'observer:identity',
      hidden: function(element) {
        let bo = getBusinessObject(element);
        return bo.get('observer:type') !== 'specificModule';
      },
      validate: function(element) {
        let bo = getBusinessObject(element);
        return (bo.get('observer:identity')) ? {} : {'observer:identity': 'service task must have an identity'}
      },
    }));
  }
}