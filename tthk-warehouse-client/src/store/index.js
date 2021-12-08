import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import auth from './modules/auth';
import createPersistedState from "vuex-persistedstate";

const state = () => ({
    accessToken: null,
    alertNotification: {
        status: false,
        color: 'error',
        text: 'Unhandled error.'
    },
    user: null
})

const errors = {
    USER_REGISTERED_SUCCESSFULLY: 'User registered successfully.',
    ACCESS_DENIED: 'Sorry, you cannot use this page.'
}

const getters = {
    isAuthenticated: (state) => !!state.user,
    StateUser: (state) => state.user,
}

const actions = {
    registerUser ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/users', {
                'email': payload.email,
                'password': payload.password,
                'first_name': payload.first_name,
                'last_name': payload.last_name,
                'address_id':{
                    'address_line_1': payload.address_line_1,
                    'address_line_2': payload.address_line_2,
                    'city': payload.city,
                    'postal_code': payload.postalCode,
                    'country': payload.country,
                    'telephone': payload.phone
                },
                'payment_id':{
                    'payment_type': payload.paymentType,
                    'card_number': payload.cardNumber,
                    'expiry': payload.expiry
                }
                
            })
                .then((response) => {
                    if (response.status === 200) {
                        commit('createNewAlert', {
                            color: 'success',
                            text: errors.USER_REGISTERED_SUCCESSFULLY
                        })
                        resolve()
                    }
                }).catch((error) => {
                if (error.response.status === 409) {
                    commit('createNewAlert', {
                        color: 'error',
                        text: 'Username is already taken!'
                    })
                } else {
                    commit('createNewAlert', {
                        color: 'error',
                        text: error.response.data.error
                    })
                }
                reject()
            })
        })
    },
    authUser ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/users/verify', {
                'email': payload.email,
                'password': payload.password
            })
                .then((response) => {
                    if (response.data) {
                        resolve(response.data)
                        console.log(response.data.ID)
                        localStorage.setItem('token', response.data.ID)
                    } else if (response.status === 401) {
                        commit('createNewAlert', {
                            color: 'error',
                            text: response.data
                        })
                    }
                }).catch((error) => {
                commit('createNewAlert', {
                    color: 'error',
                    text: error.response.data
                })
                reject(error)
            })
        })
    },

}
const mutations = {
    createNewAlert (state, payload) {
        state.alertNotification.text = payload.text
        state.alertNotification.color = payload.color
        state.alertNotification.status = true
    },
    setAlertStatus (state, payload) {
        state.alertNotification.status = payload
    },

    setUserData (state, payload) {
        state.user = payload
    },

    deleteUserData (state) {
        state.user = null
    }
    
}
Vue.use(Vuex)
export default new Vuex.Store ({
    modules: {
        auth
    },
    plugins: [createPersistedState()],
   


    state,
    errors,
    getters,
    actions,
    mutations,
})