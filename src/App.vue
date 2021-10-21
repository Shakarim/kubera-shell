<template>
  <v-app>
    <v-system-bar app>
      <v-spacer></v-spacer>
      <v-icon>mdi-check-bold</v-icon>
    </v-system-bar>

    <v-navigation-drawer app width="300">
      <v-navigation-drawer absolute color="grey lighten-3" mini-variant>
        <v-avatar class="d-block text-center mx-auto mt-4" color="grey darken-1" size="36" ></v-avatar>

        <v-divider class="mx-3 my-5"></v-divider>

        <v-avatar v-for="n in 6" :key="n" class="d-block text-center mx-auto mb-9" color="grey lighten-1" size="28" >
        </v-avatar>
      </v-navigation-drawer>

      <v-list class="pl-14" shaped>
        <v-list-item v-for="n in 5" :key="n" link>
          <v-list-item-content>
            <v-list-item-title>Item {{ n }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <ModelerIndex></ModelerIndex>
    </v-main>
  </v-app>
</template>

<script>
  import ModelerIndex from './components/modeler/Index.vue'

  export default {
    name: 'App',

    components: {
      ModelerIndex
    },

    data: () => ({
      //
    }),
  };
</script>
