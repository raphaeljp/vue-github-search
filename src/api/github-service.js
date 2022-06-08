import axios from 'axios'

const http = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Accept: 'application/vnd.github.v3+json',
    }
})


/**
 * Returns a list of repositories that contains the param informed in the name.
 * It should contain the wildcard sign '*' in the beginning and in the end of the param.
 * @param {string} query A string containing the owner and name of the desired repository.
 * e.g., *react*
 */
export function searchRepositoriesByName (query) {
    return http.get(`/search/repositories?${query}`)
        .then(res => res.data)
}

/**
 * Returns only the repository that exactly matches the param informed.
 * @param {string} owner A string containing the owner of the desired repository.
 * @param {string} name A string containing the name of the desired repository.
 */
export function fetchRepositoryByName (owner, name) {
    return http.get(`/repos/${owner}/${name}`)
        .then(res => res.data)
}

/**
 * Returns a list of contributors to an informed repository.
 * @param {string} owner A string containing the owner of the desired repository.
 * @param {string} name A string containing the name of the desired repository.
 * @param {string} page A string containing the page number of the desired repository list.
 */
export function listRepositoryContributors (owner, name, page) {
    return http.get(`/repos/${owner}/${name}/contributors?per_page=100&page=${page}`)
        .then(res => {
            const links = res.headers.link ? res.headers.link.split(';') : []
            const last = links.filter(link => link.includes('rel="last"'))[0]
            let totalPages = 0

            if (last) {
                const totalPagesLink = links[links.indexOf(last) - 1].replace('<', '').replace('>', '')
                totalPages = parseInt(new URLSearchParams(totalPagesLink).get('page'))
            } else {
                totalPages = page
            }

            return {
                results: res.data,
                pages: totalPages
            }
        })
}