// components/DeleteKeys.tsx

"use client";

import { useState } from "react";
import { Button } from "./ui/button"; // Adjust the path if necessary
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { deleteAllKeys } from "@/app/action"; // Adjust the path based on your file structure

export default function DeleteKeys () {
  const [deleteSuccess, setDeleteSuccess] = useState<boolean | null>(null);

  const handleDeleteAll = async () => {
    console.log("Delete all keys triggered!"); // Debugging log
    try {
      await deleteAllKeys();
      setDeleteSuccess(true);
      console.log("All test data has been deleted.");
    } catch (error) {
      console.error("Error deleting test data:", error);
      setDeleteSuccess(false);
    }
  };

  return (
    <Card className="w-full max-w-lg p-6 mt-6 bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">
          Delete All Attendee Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-4">Click the button below to delete all attendee data.</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" onClick={handleDeleteAll}>
          Delete All Data
        </Button>
      </CardFooter>
      {deleteSuccess === true && (
        <p className="text-green-500 text-center mt-4">All data deleted successfully.</p>
      )}
      {deleteSuccess === false && (
        <p className="text-red-500 text-center mt-4">Error deleting data.</p>
      )}
    </Card>
  );
};

