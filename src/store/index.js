import { createStore } from 'vuex'
import githubModule from './modules/github'

const state = {
    alert: {
        active: false,
        type: '',
        msg: ''
    }
}

const mutations = {
    SET_ALERT(state, { type, msg }) {
        state.alert = {
            active: true,
            type,
            msg
        }
    },
    DISMISS_ALERT(state) {
        state.alert = {
            active: false,
            type: '',
            msg: ''
        }
    }
}

const actions = {
    async setAlert({ commit }, { type, msg }) {
        await commit('DISMISS_ALERT')
        await commit('SET_ALERT', { type, msg })
    }
}

const getters = {}

const store = createStore({
    modules: {
        github: githubModule
    },
    state,
    getters,
    actions,
    mutations
})

export default store