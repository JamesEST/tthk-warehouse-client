<template>
  <v-layout align-center justify-center>
    <v-card elevation="3" max-width="500px">
      <v-form @submit.prevent="auth">
        <v-card-title></v-card-title>
        <v-card-text>
          <v-text-field v-model="email" label="E-mail" prepend-icon="email"/>
          <v-text-field v-model="password" label="Password" prepend-icon="lock"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn :loading="loading" class="text-right" text type="submit" color="grey darken-1" :disabled="fieldsIsBlank">
            <span class="material-icons">login</span>
            Log in
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      validationText: '',
    }
  },
  computed: {
    fieldsIsBlank() {
      return this.password.length === 0 || this.email.length === 0
    }
  },
  methods: {
    ...mapActions(['authUser']),
     auth() {
      let email = this.email
      let password = this.password
      this.loading = true
      this.authUser({
        email: email,
        password: password
      }).then(() => {
        this.loading = false;
        this.$router.push('/store')
      }).catch(() => {
        this.loading = false
      })
    },
  }
}
</script>

<style scoped>

</style>