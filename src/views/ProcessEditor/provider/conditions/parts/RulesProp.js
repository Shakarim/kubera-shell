import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {is} from 'bpmn-js/lib/util/ModelUtil';


export default function(group, element, translate) {
  if (is(element, 'bpmn:SequenceFlow')) {
    group.entries.push(entryFactory.textField(translate, {
      id : 'rules',
      description : 'Enter rules of conditions',
      label : 'Rules',
      modelProperty : 'conditions:rules'
    }));
  }
}