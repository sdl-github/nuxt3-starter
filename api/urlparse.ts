export function parseGithubRepo(full_name: string) {
  return request({
    url: '/url/github-repo',
    params: { full_name },
  })
}
