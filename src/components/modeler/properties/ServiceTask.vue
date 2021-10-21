<template>
  <v-form v-model="formStruct.valid">
    <v-toolbar flat color="blue-grey lighten-1" dark>
      <v-toolbar-title>Service Task Configuration</v-toolbar-title>
    </v-toolbar>
    <v-tabs>
      <v-tab><v-icon>mdi-cog-outline</v-icon></v-tab>
      <v-tab><v-icon>mdi-format-list-checkbox</v-icon></v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <h1>General</h1>
          </v-card-text>

          <v-col cols="1" md="12">
            <v-text-field label="Name" outlined></v-text-field>
          </v-col>
          <v-divider></v-divider>

          <v-card-text>
            <h1>Implementation</h1>
          </v-card-text>

          <v-col cols="1" md="12">
            <v-select :items="items" label="Outlined style" outlined></v-select>
            <v-text-field label="Implementation " outlined></v-text-field>
          </v-col>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-form>
</template>

<script>
  export default {
    name: 'ServiceTaskModelerProperty',
    data: function() {
      return {
        tab: 1,
        formStruct: {
          valid: true,
          executable: false
        }
      }
    }
  }
</script>