'use server'

import { kv } from '@vercel/kv'

interface Attendee {
  name: string;
  date: string;
}

// Save a new attendee
export async function saveAttendee(name: string, date: string) {
  const attendees = await kv.get<Attendee[]>('attendees') || []
  
  // Check if the name already exists
  if (attendees.some(attendee => attendee.name === name)) {
    throw new Error('This name has already been used')
  }

  attendees.push({ name, date })
  await kv.set('attendees', attendees)
}

// Get all attendees
export async function getAttendees(): Promise<Attendee[]> {
  return await kv.get<Attendee[]>('attendees') || []
}


// Delete a single attendee by name
export async function deleteAttendee(name: string) {
  const attendees = await kv.get<Attendee[]>('attendees') || []
  const updatedAttendees = attendees.filter(attendee => attendee.name !== name)
  await kv.set('attendees', updatedAttendees)
}

// Function to delete all data (attendees in this case)
export async function deleteAllKeys() {
  // Use kv.delete to remove the 'attendees' key entirely
  await kv.del('attendees')
  
  console.log('All keys deleted')
}