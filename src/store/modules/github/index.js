import router from '@/router'
import handleGithubApiError from '@/api/error/github-service-error-handling'

import {
    fetchRepositoryByName,
    searchRepositoriesByName,
    listRepositoryContributors
} from '@/api/github-service'

const state = () => ({
    search: {
        type: '',
        name: '',
    },
    repositories: null,
    pagination: {
        page: 1,
        perPage: 30,
        total: 0,
        totalPages: 0,
    },
    selectedRepository: null,
    loading: {
        repoList: false,
        singleRepo: false,
        contributors: false
    },
})

const mutations = {
    SET_SEARCH_DATA(state, payload) {
        state.search = payload
    },
    SET_REPOSITORIES(state, payload) {
        state.repositories = payload
    },
    SET_PAGINATION(state, amount) {
        state.pagination.total = amount > 1000 ? 1000 : amount
        state.pagination.totalPages = amount > 1000
            ? Math.ceil(1000 / state.pagination.perPage)
            : Math.ceil(amount / state.pagination.perPage)
    },
    CHANGE_PAGE(state, page) {
        state.pagination.page = page
    },
    SET_SELECTED_REPOSITORY(state, payload) {
        state.selectedRepository = payload
    },
    SET_LOADING(state, { type, value}) {
        state.loading[type] = value
    }
}

const actions = {
    async searchRepositories({ commit }, { type, name, page = 1 }) {
        commit('SET_LOADING', { type: 'repoList', value: true })

        const params = {
            q: `${name.replace(/\*/g, '')} in:name`,
            page
        }

        const query = new URLSearchParams(params).toString()

        commit('SET_SEARCH_DATA', { type, name })

        await searchRepositoriesByName(query)
            .then(data => {
                commit('SET_REPOSITORIES', data.items)
                commit('SET_PAGINATION', data.total_count)
            })
            .catch(err => {
                console.error('<<< ERROR SEARCHING FOR REPOSITORIES: ', err)
                
                const error = handleGithubApiError(err)
                commit('SET_ALERT', { type: 'error', msg: error.text }, { root: true })
            })
            .finally(() => commit('SET_LOADING', { type: 'repoList', value: false }))
    },
    async paginateRepositories({ commit, state }, page) {
        commit('SET_LOADING', { type: 'repoList', value: true })

        const params = {
            q: `${state.search.name.replace(/\*/g, '')} in:name`,
            page
        }

        const query = new URLSearchParams(params).toString()

        const data = await searchRepositoriesByName(query)
            .then(data => {
                commit('SET_REPOSITORIES', data.items)
                commit('CHANGE_PAGE', page)
            })
            .catch(err => {
                console.error('<<< ERROR SEARCHING FOR REPOSITORIES: ', err)
                
                const error = handleGithubApiError(err)
                commit('SET_ALERT', { type: 'error', msg: error.text }, { root: true })
            })
            .finally(() => commit('SET_LOADING', { type: 'repoList', value: false }))
    },
    async fetchRepository({ commit }, { type, name }) {
        commit('SET_LOADING', { type: 'singleRepo', value: true })
        commit('SET_SEARCH_DATA', { type, name })

        const [ owner, repo ] = name.split('/')
        
        const data = await fetchRepositoryByName(owner, repo)
            .then(async (data) => {
                await commit('SET_SELECTED_REPOSITORY', data)
                router.push(`/repo/${owner}/${repo}`)
            })
            .catch(err => {
                console.error('<<< ERROR FETCHING REPOSITORY DATA: ', err)
                
                const error = handleGithubApiError(err)
                commit('SET_ALERT', { type: 'error', msg: error.text }, { root: true })
            })
            .finally(() => commit('SET_LOADING', { type: 'singleRepo', value: false }))
    },
    resetSelectedRepository({ commit }) {
        commit('SET_SELECTED_REPOSITORY', null)
    },
    async listRepositoryContributors({ commit }, { owner, name, page = 1 }) {
        commit('SET_LOADING', { type: 'contributors', value: true })

        const data = await listRepositoryContributors(owner, name, page)
            .catch(err => {
                console.error('<<< ERROR FETCHING REPOSITORY CONTRIBUTORS: ', err)
                
                const error = handleGithubApiError(err)
                commit('SET_ALERT', { type: 'error', msg: error.text }, { root: true })
            })
            .finally(() => commit('SET_LOADING', { type: 'contributors', value: false }))

        return data
    }
}

const getters = {}

const githubModule = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

export default githubModule