// fetchEvent.js

// This script is a function that takes in the time of the fieldname and attempts to match it with an event in the database. If a match is found then the event data is returned.

// Imports
import { db } from "./firebase.js"
import {
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

export async function getEventByTitle(eventTitle) {
  // Create collection from database and query against input
  const events = collection(db, "events")
  const qry = query(events, where("eventName", "==", eventTitle))

  // Attempt to get results
  try {
    const querySnapshot = await getDocs(qry)

    if (querySnapshot.empty) {
      console.warn(`No event found with eventName ${eventTitle}`)
      return null
    }

    // Create object to be returned for matching event
    const doc = querySnapshot.docs[0]
    const data = doc.data()

    return data
  } catch (error) {
    console.error("Error from getEventByTitle:", error)
    return null
  }
}
