import Vue from 'vue'
import axios from "axios";
import Vuex from 'vuex'

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
    alertNotification (state) {
        return state.alertNotification
    }
}

const actions = {
    registerUser ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/register', {
                'email': payload.email,
                'password': payload.password,
                'firstName': payload.firstName,
                'lastName': payload.lastName
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
                    if (response.data.success) {
                        resolve(response.data)
                        commit('setAccessToken', response.data.accessToken)
                    } else if (response.status === 401) {
                        commit('createNewAlert', {
                            color: 'error',
                            text: response.data.error
                        })
                    }
                }).catch((error) => {
                commit('createNewAlert', {
                    color: 'error',
                    text: error.response.data.error
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
    setAccessToken (state, payload) {
        state.accessToken = payload
        localStorage.setItem('token', payload)
    },
    deleteUserData (state) {
        state.user = null
        state.accessToken = null
        localStorage.removeItem('token')
    },
    setUser (state, payload) {
        state.user = payload
    }
}
Vue.use(Vuex)
export default new Vuex.Store ({
    state,
    errors,
    getters,
    actions,
    mutations,
})