import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {is} from 'bpmn-js/lib/util/ModelUtil';


export default function(group, element, translate) {
  // only return an entry, if the currently selected
  // element is a start event.

  if (is(element, 'bpmn:ServiceTask')) {
    group.entries.push(entryFactory.textField(translate, {
      id : 'identity',
      description : 'Enter observer identity',
      label : 'Observer identity',
      modelProperty : 'observer:identity'
    }));
  }
}