<template>
  <div id="modeler">
    <div id="diagram-container" style="position: absolute; width: 100%; height: 100%;">
      <div id="canvas" style="position: absolute; width: 100%; height: 100%;"></div>
    </div>

    <v-navigation-drawer app clipped right v-bind:width="400" v-if="selectedItem !== null && availableItemTypes.includes(selectedItem.element.type)">
      <ProcessModelerProperty v-if="selectedItem.element.type == 'bpmn:Process'"></ProcessModelerProperty>
      <ServiceTaskModelerProperty v-if="selectedItem.element.type == 'bpmn:ServiceTask'"></ServiceTaskModelerProperty>
    </v-navigation-drawer>

    <v-footer app color="transparent" height="72" inset>
      <v-row align="center" justify="space-around">
        <v-btn elevation="2" color="error">
          Cancel changes
          <v-icon right dark>mdi-undo</v-icon>
        </v-btn>
        <v-btn elevation="2" color="success">
          Save diagram
          <v-icon right dark>mdi-content-save</v-icon>
        </v-btn>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
  import 'bpmn-js/dist/assets/diagram-js.css'
  import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
  import BpmnJS from 'bpmn-js/dist/bpmn-modeler.development'
  import axios from 'axios'
  import ProcessModelerProperty from './properties/Process.vue'
  import ServiceTaskModelerProperty from './properties/ServiceTask.vue'

  export default {
    name: 'Modeler',

    components: {
      ProcessModelerProperty,
      ServiceTaskModelerProperty
    },

    data: function() {
      return {
        modeler: null,
        selectedItem: null,
        availableItemTypes: [
          'bpmn:Process',
          'bpmn:ServiceTask'
        ]
      }
    },
    mounted: function() {
      this.modeler = new BpmnJS({
        container: '#canvas'
      });
      this.importXml();
      this.registerEvents()
    },
    methods: {
      importXml: function() {
        let self = this;
        axios
          .get('/default_schema.xml', {})
          .then(function (response) {self.loadXml(response.data)});
      },
      loadXml: async function(xml) {
        try {
          await this.modeler.importXML(xml);

          let canvas = this.modeler.get('canvas');

          canvas.zoom('fit-viewport');
        } catch (error) {
          console.log(error)
        }
      },
      registerEvents: function() {
        let eventBus = this.modeler.get('eventBus');
        let self = this;
        eventBus.on('element.click', function(e) {
          console.log(e)
          self.selectedItem = e;
        });
      }
    }
  };
</script>