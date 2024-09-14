'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAttendees } from '@/app/action'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Attendee {
  name: string
  date: string
}

export function AttendeesList() {
  const [attendees, setAttendees] = useState<Attendee[]>([])

  useEffect(() => {
    const fetchAttendees = async () => {
      const fetchedAttendees = await getAttendees()
      setAttendees(fetchedAttendees)
    }
    fetchAttendees()
  }, [])

  const getMostVotedDate = () => {
    const dateCounts: Record<string, number> = {}
    attendees.forEach(attendee => {
      dateCounts[attendee.date] = (dateCounts[attendee.date] || 0) + 1
    })
    const mostVotedDate = Object.keys(dateCounts).reduce((a, b) =>
      dateCounts[a] > dateCounts[b] ? a : b
    )
    return mostVotedDate
  }

  const mostVotedDate = attendees.length > 0 ? getMostVotedDate() : null

  const fadeIn = {
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  }

  return (
    <Card className="w-full bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">The Cool People Attending 😎</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {attendees.length === 0 ? (
            <motion.p
              key="no-attendees"
              initial={{ opacity: 0 }}
              animate="visible"
              exit="exit"
              variants={fadeIn}
            >
              No one has voted yet.
            </motion.p>
          ) : (
            <>
              <motion.div
                key="most-voted-date"
                initial={{ opacity: 0 }}
                animate="visible"
                exit="exit"
                variants={fadeIn}
                className="mb-4 text-center font-semibold"
              >
                Most Voted Date ↗️:  {mostVotedDate}th September
              </motion.div>
              <motion.ul
                key="attendees-list"
                initial={{ opacity: 0 }}
                animate="visible"
                exit="exit"
                variants={fadeIn}
                className="space-y-2"
              >
                {attendees.map((attendee, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-100 p-2 rounded"
                  >
                    {attendee.name} - Voted for: {attendee.date}th September
                  </motion.li>
                ))}
              </motion.ul>
            </>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
