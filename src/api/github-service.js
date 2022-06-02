import axios from 'axios'

const http = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Accept: 'application/vnd.github.v3+json',
    }
})

export async function searchRepositoriesByName (name) {
  return http.get(`/search/repositories?q=${name}+name`)
      .then(res => res.data)
      .catch(err => {
          console.error('<<< ERROR SEARCHING FOR REPOSITORIES: ', err);
          return err
      })
}

export async function fetchRepositoriesByName (param) {
  const [ owner, name ] = param.split('/')

  return http.get(`/repos/${owner}/${name}`)
      .then(res => res.data)
      .catch(err => {
          console.error('<<< ERROR SEARCHING FOR REPOSITORY: ', err);
          return err
      })
}

export async function listRepositoryContributors (param) {
  const [ owner, name ] = param.split('/')

  return http.get(`/repos/${owner}/${name}/contributors`)
      .then(res => res.data)
      .catch(err => {
          console.error('<<< ERROR SEARCHING FOR REPOSITORY CONTRIBUTORS: ', err);
          return err
      })
}