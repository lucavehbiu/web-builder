import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  // In Edge Runtime, we can't read from file system
  // You would need to use a database or external service
  // For now, returning a placeholder response
  return NextResponse.json({
    message: 'Leads are stored via email. Check your inbox at info@lucavehbiu.com',
    note: 'For production, consider using a database like Supabase or PlanetScale'
  })
}