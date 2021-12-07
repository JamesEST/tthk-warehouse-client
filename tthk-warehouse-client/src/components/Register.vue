<template>
  <v-layout align-center justify-center>
    <v-card elevation="3" max-width="500px">
      <v-form>
        <v-card-title></v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field label="First name" prepend-icon="person"/>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Last name"/>
            </v-col>
          </v-row>
          <v-text-field label="E-mail" prepend-icon="email"/>
          <v-text-field label="Password" prepend-icon="lock"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn class="text-right" text type="submit" color="grey darken-1">
            <span class="material-icons">person_add</span>
            Sign Up
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-layout>
</template>


<script>
export default {
  name: "Register"
}
</script>

<style scoped>

</style>