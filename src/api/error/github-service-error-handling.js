const text = {
    404: 'Oops, looks like the repository you are looking for does not exist.',
    500: 'Oops, looks like something went wrong. Please try again later.',
    default: 'Oops, looks like something went wrong. Please try again later.'
}

export default function handleGithubApiError(data) {
    return {
        code: data.response.status,
        message: data.response.data.message,
        text: text[data.response.status] || text.default,
    }
}
