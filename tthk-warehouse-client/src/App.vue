<template>
  <v-app>
   <div>
     <v-app-bar
      color="grey darken-2"
      dense
      dark
    >
      <v-toolbar-title>WareHouse</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn exact to="/register" elevation="0" icon><v-icon>mdi-account-plus</v-icon></v-btn>
      <v-btn exact to="/login" elevation="0" icon><v-icon>login</v-icon></v-btn>

    </v-app-bar>
   </div>

    <v-main>
      <v-container fill-height>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
};
</script>
