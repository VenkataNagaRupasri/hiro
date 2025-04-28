// testFetchEvent.js

import { getEventByTitle } from "./fetch-event.js"

// This function is used to test the fetch-event.js script to ensure all data is returning correctly.
async function testGetEvent() {
  const event = await getEventByTitle("Hackathon")

  if (event) {
    console.log("Event fetched successfully:")
    console.log(`Name: ${event.eventName}`)
    console.log(`Latitude: ${parseFloat(event.eventGeo.latitude)}`)
    console.log(`Longitude: ${parseFloat(event.eventGeo.longitude)}`)
    console.log(`Building: ${event.eventBldg}`)
    console.log(`Room: ${event.eventRm}`)
    console.log(`Time: ${event.eventTime}`)
  } else {
    console.log("No event found or an error occurred.")
  }
}

testGetEvent()
