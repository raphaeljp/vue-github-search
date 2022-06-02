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
 * @param {string} name A string containing the owner and name of the desired repository.
 * e.g., *react*
 */
export async function searchRepositoriesByName (name) {
  return http.get(`/search/repositories?q=${name}+name`)
      .then(res => res.data)
      .catch(err => {
          console.error('<<< ERROR SEARCHING FOR REPOSITORIES: ', err);
          return err
      })
}

/**
 * Returns only the repository that exactly matches the param informed.
 * @param {string} param A string containing the owner and name of the desired repository.
 * e.g., facebook/react
 */
export async function fetchRepositoriesByName (param) {
  const [ owner, name ] = param.split('/')

  return http.get(`/repos/${owner}/${name}`)
      .then(res => res.data)
      .catch(err => {
          console.error('<<< ERROR SEARCHING FOR REPOSITORY: ', err);
          return err
      })
}

/**
 * Returns a list of contributors to an informed repository.
 * @param {string} param A string containing the owner and name of the desired repository.
 * e.g., facebook/react
 */
export async function listRepositoryContributors (param) {
  const [ owner, name ] = param.split('/')

  return http.get(`/repos/${owner}/${name}/contributors`)
      .then(res => res.data)
      .catch(err => {
          console.error('<<< ERROR SEARCHING FOR REPOSITORY CONTRIBUTORS: ', err);
          return err
      })
}