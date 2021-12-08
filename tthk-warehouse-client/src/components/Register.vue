<template>
  <v-layout align-center justify-center>
    <v-card elevation="3" max-width="500px">
      <v-form @submit.prevent="registration">
        <v-card-title></v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="first_name" label="First name" prepend-icon="person"/>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="last_name" label="Last name"/>
            </v-col>
          </v-row>
          <v-text-field v-model="email" label="E-mail" prepend-icon="email"/>
          <v-text-field v-model="password" label="Password" prepend-icon="lock"/>

          <v-text-field v-model="address_line_1" label="Address line 1" prepend-icon="home"/>
          <v-text-field v-model="address_line_2" label="Address line 2" prepend-icon="home"/>
          <v-text-field v-model="postalCode" label="postal_code" prepend-icon="source"/>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="city" label="City" prepend-icon="apartment"/>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="country" label="Country" prepend-icon="language"/>
            </v-col>
          </v-row>
          <v-text-field v-model="phone" label="Telephone" prepend-icon="phone"/>
          <v-text-field v-model="paymentType" label="Payment type" prepend-icon="credit_card"/>
          <v-text-field v-model="cardNumber" label="Card Number" prepend-icon="credit_card"/>
          <v-text-field v-model="expiry" label="Expiry" prepend-icon="pin"/>
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
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      address_line_1: '',
      address_line_2: '',
      postalCode: '',
      city: '',
      country: '',
      phone: '',
      paymentType: '',
      cardNumber: '',
      expiry: '',
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
    ...mapActions({
      registerUser: 'registerUser'
    }),
    registration() {
      this.loading = true
      this.registerUser({
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
        postalCode: this.postalCode,
        city: this.city,
        country: this.country,
        phone: this.phone,
        paymentType: this.paymentType,
        cardNumber: this.cardNumber,
        expiry: this.expiry,
        address_line_1: this.address_line_1,
        address_line_2: this.address_line_2
      }).then(() => {
        this.loading = false
        this.$router.push('/')
      }).catch(() => {
        this.loading = false
      })
    },
  }
}
</script>

<style scoped>

</style>