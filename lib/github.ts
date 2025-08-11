export interface Repository {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  created_at: string
  updated_at: string
  watchers_count: number
  fork: boolean
}

export async function getUserRepos(username: string): Promise<Repository[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          'User-Agent': 'Portfolio-Site'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos: Repository[] = await response.json()
    
    // Filter out forks and sort by activity score
    const filteredRepos = repos
      .filter(repo => !repo.fork && repo.description)
      .map(repo => ({
        ...repo,
        score: repo.stargazers_count * 3 + repo.forks_count + repo.watchers_count
      }))
      .sort((a, b) => b.score - a.score)

    return filteredRepos
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error)
    return []
  }
}