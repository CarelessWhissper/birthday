'use server'

import { kv } from '@vercel/kv'

interface Attendee {
  name: string;
  date: string;
}

export async function saveAttendee(name: string, date: string) {
  const attendees = await kv.get<Attendee[]>('attendees') || []
  
  // Check if the name already exists
  if (attendees.some(attendee => attendee.name === name)) {
    throw new Error('This name has already been used')
  }

  attendees.push({ name, date })
  await kv.set('attendees', attendees)
}

export async function getAttendees(): Promise<Attendee[]> {
  return await kv.get<Attendee[]>('attendees') || []
}

export async function deleteAttendee(name: string) {
  const attendees = await kv.get<Attendee[]>('attendees') || []
  const updatedAttendees = attendees.filter(attendee => attendee.name !== name)
  await kv.set('attendees', updatedAttendees)
}