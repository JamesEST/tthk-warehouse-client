<template>
  <v-snackbar v-model="alertNotificationStatus" :color="alertNotification.color" bottom
              right timeout="1000" :multi-line="alertNotification.text > 40"
  >
    <v-icon v-if="alertNotification.color === 'error'" left>mdi-alert-circle-outline</v-icon>
    <v-icon v-else-if="alertNotification.color === 'warning'" left>mdi-alert-outline</v-icon>
    <v-icon v-else-if="alertNotification.color === 'success'" left>mdi-check-circle-outline</v-icon>
    <v-icon v-else left>mdi-information-outline</v-icon>
    {{ alertNotification.text }}
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AlertNotification',
  computed: {
    ...mapState(['alertNotification']),
    alertNotificationStatus: {
      get() {
        return this.$store.getters.alertNotification.status
      },
      set(payload) {
        this.$store.commit('setAlertStatus', payload)
      }
    }
  }
}
</script>

<style scoped>
</style>
