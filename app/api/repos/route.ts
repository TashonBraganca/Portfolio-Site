import { NextResponse } from 'next/server'
import { getUserRepos } from '@/lib/github'
import { github } from '@/lib/config'

export async function GET() {
  try {
    const repos = await getUserRepos(github.username)
    return NextResponse.json(repos)
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    )
  }
}