"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AttendeesList } from "./guestlist";
import PartyLocationMap from "./location";
import { saveAttendee } from "@/app/action";

export default function HomePage() {
  const [canAttend, setCanAttend] = useState<boolean | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleVote = async () => {
    if (canAttend === false) {
      console.log("User cannot attend");
    } else if (selectedDate && name) {
      try {
        await saveAttendee(name, selectedDate);
        // Reset the form and show the attendees list
        setCanAttend(null);
        setSelectedDate(null);
        setName("");
        setError(null);
      } catch (error) {
        console.log("something went wrong");
      }
    }
  };

  const fadeIn = {
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl" // Adjusted to allow more space for two columns
      >
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          {/* Left: Party Location Map inside a Card */}
          <Card className="lg:w-1/3 w-full p-6 bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-center text-xl font-bold">
                Party Location 🗺️
              </CardTitle>
            </CardHeader>
            <CardContent>
              {canAttend && (
                <div className="w-full flex justify-center lg:justify-start mt-6 lg:mt-0">
                  <PartyLocationMap />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right: Main Invitation Content */}
          <Card className="lg:w-2/3 w-full p-6 bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-center text-xl font-bold">
                <motion.span
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  You&apos;re Invited! 🎉
                </motion.span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {canAttend === null ? (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate="visible"
                    exit="exit"
                    variants={fadeIn}
                  >
                    <p className="text-center mb-4">
                      Can you attend the birthday celebration?
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button onClick={() => setCanAttend(true)}>
                        Yes, I can!
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setCanAttend(false)}
                      >
                        Sorry, I can&apos;t
                      </Button>
                    </div>
                  </motion.div>
                ) : canAttend ? (
                  <motion.div
                    key="canAttend"
                    initial={{ opacity: 0 }}
                    animate="visible"
                    exit="exit"
                    variants={fadeIn}
                  >
                    <p className="text-center mb-4">
                      Great! Which date works best for you?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {["20", "21", "22"].map((date) => (
                        <motion.div
                          key={date}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex justify-center"
                        >
                          <Button
                            variant={
                              selectedDate === date ? "default" : "outline"
                            }
                            onClick={() => setSelectedDate(date)}
                            className="w-full max-w-xs"
                          >
                            {date}th September
                          </Button>
                        </motion.div>
                      ))}
                    </div>

                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mb-4"
                    />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                  </motion.div>
                ) : (
                  <motion.div
                    key="cannotAttend"
                    initial={{ opacity: 0 }}
                    animate="visible"
                    exit="exit"
                    variants={fadeIn}
                  >
                    <p className="text-center mb-4">
                      We&apos;re sorry you can&apos;t make it. Thanks for
                      letting us know!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
            <CardFooter className="flex justify-center">
              <AnimatePresence>
                {canAttend !== null && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      onClick={handleVote}
                      disabled={canAttend && (!selectedDate || !name)}
                    >
                      {canAttend ? "Submit Vote" : "Confirm"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardFooter>
          </Card>
        </div>

        {/* Attendees List */}
        <AttendeesList />

        {/* Spotify Playlist Card */}
        <Card className="w-full max-w-lg p-4 mt-6 bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold">
              <motion.span
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                DJ Flusha TrackList 🎶
              </motion.span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <iframe
              src="https://open.spotify.com/embed/playlist/4WPiuw0MT178PGXV67xfxb?utm_source=generator"
              width="100%"
              height="352"
              style={{ borderRadius: "12px" }}
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
