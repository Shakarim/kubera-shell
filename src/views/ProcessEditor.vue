<template>
  <div>

    <base-header class="pb-6 pb-6 pt-5 pt-md-8 bg-gradient-success">
    </base-header>

    <!--Charts-->
    <b-container fluid class="mt--7" id="process-editor">
      <b-row>
        <b-col xl="12" class="mb-5 mb-xl-0">
          <card header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-muted text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 mb-0">Sales value</h5>
              </b-col>
            </b-row>
            <bpmn-editor></bpmn-editor>
          </card>
        </b-col>
      </b-row>
      <!-- End charts-->
    </b-container>

  </div>
</template>
<script>
  // Components
  import BpmnEditor from './ProcessEditor/BpmnEditor';

  export default {
    components: {
      BpmnEditor
    },
    data() {
      return {}
    },
    methods: {
    },
    mounted() {
    }
  };
</script>
