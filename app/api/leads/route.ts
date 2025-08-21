import { NextResponse } from 'next/server'
import { getLeads } from '../contact/simple-storage'

export async function GET() {
  try {
    const leads = await getLeads()
    return NextResponse.json(leads)
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}