<template>
  <v-form v-model="formStruct.valid">
    <v-toolbar flat color="blue-grey lighten-1" dark>
      <v-toolbar-title>Process Configuration</v-toolbar-title>
    </v-toolbar>
    <v-tabs>
      <v-tab><v-icon>mdi-cog-outline</v-icon></v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <h1>General</h1>
          </v-card-text>

          <v-col cols="1" md="12">
            <v-switch v-model="formStruct.executable" label="Executable"></v-switch>
            <v-text-field label="Name" outlined></v-text-field>
            <v-text-field label="Version Tag" outlined></v-text-field>
          </v-col>
          <v-divider></v-divider>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-form>
</template>

<script>
  export default {
    name: 'ProcessModelerProperty',
    data: function() {
      return {
        formStruct: {
          valid: true,
          executable: false
        }
      }
    }
  }
</script>