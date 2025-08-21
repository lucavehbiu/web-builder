import fs from 'fs'
import path from 'path'

const LEADS_FILE = path.join(process.cwd(), 'leads.json')

export async function saveLeadToFile(formData: Record<string, string | string[] | undefined>) {
  try {
    // Read existing leads or create empty array
    let leads = []
    if (fs.existsSync(LEADS_FILE)) {
      const fileContent = fs.readFileSync(LEADS_FILE, 'utf-8')
      leads = JSON.parse(fileContent)
    }

    // Add new lead with timestamp
    const newLead = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      dateFormatted: new Date().toLocaleString(),
      ...formData
    }

    leads.push(newLead)

    // Save back to file
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2))
    
    console.log(`Lead saved to local file. Total leads: ${leads.length}`)
    
    return newLead
  } catch (error) {
    console.error('Error saving lead to file:', error)
    throw error
  }
}

export async function getLeads() {
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      return []
    }
    
    const fileContent = fs.readFileSync(LEADS_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('Error reading leads:', error)
    return []
  }
}