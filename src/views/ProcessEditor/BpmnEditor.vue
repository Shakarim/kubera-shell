<template>
  <div>
    <div class="main-container">
      <div class="bpmn-content">
        <div class="canvas" id="js-canvas"></div>
        <div class="properties-panel-parent" id="js-properties-panel"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import '@/assets/scss/bpmn.scss';

  import BpmnModeler from 'bpmn-js/lib/Modeler';

  import propertiesPanelModule from 'bpmn-js-properties-panel';
  import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/bpmn';

  import defaultDiagramXML from '../../../public/bpmn/defaultDiagram.bpmn';

//  import observerPropertiesProviderModule from './provider/observer';
//  import observerModdleDescriptor from './descriptors/observer';

  export default {
    data() {
      return {
        modeler: null
      }
    },
    components: {},
    methods: {
      initSchema: function() {
        this.modeler = new BpmnModeler({
          container: '#js-canvas',
          propertiesPanel: {
            parent: '#js-properties-panel'
          },
          additionalModules: [
            propertiesPanelModule,
            propertiesProviderModule,
//            observerPropertiesProviderModule
          ],
          moddleExtensions: {
//            observer: observerModdleDescriptor
          }
        });
      },
      async openDiagram(xml) {
        try {
          await this.modeler.importXML(xml);
        } catch (err) {
          console.error(err);
        }
      }
    },
    mounted: function() {
      this.initSchema();
      this.openDiagram(defaultDiagramXML);
    }
  };
</script>

<style>
  #js-canvas {
    width: 100%;
    height: 700px;
  }
  #process-editor .card-body {
    padding: 0;
  }
</style>