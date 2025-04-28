
// fetchEvent.js
// This script is a function that takes in the name of the fieldname and attempts to
//  match it with an event in the database. If a match is found then the event data is returned.

// Imports
import { db } from "./firebase.js"
import {
  collection,
  query,
  where,
  getDocs,
  GeoPoint
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Helper to parse geo array like ["39.7862° N", "84.0684° W"]
//function parseGeo(geoArray) {
//  const latStr = geoArray[0]
//  const lngStr = geoArray[1]
//
//  const lat = parseFloat(latStr) * (latStr.includes("S") ? -1 : 1)
//  const lng = parseFloat(lngStr) * (lngStr.includes("W") ? -1 : 1)
//
//  return {
//    latitude: lat,
//    longitude: lng
//  }
//}
//

function processGeoData(geoData) {
  if (typeof geoData === 'string') {
    const parts = geoData.split(',');
    //console.error("Error finding event by 1", );
    if (parts.length === 2) {
      const latitude = parseFloat(parts[0].trim());
      const longitude = parseFloat(parts[1].trim());
      //console.error("Error finding event by 1", );
      if (!isNaN(latitude) && !isNaN(longitude)) {
        console.error("Error finding event by 1", );
        return { latitude, longitude };
      }
    }
  }  
  if (Array.isArray(geoData) && geoData.length === 2) {
    //console.error("Error finding event by 1", );
    const [latitude, longitude] = geoData;
    return {
      latitude: typeof latitude === 'number' ? latitude : parseFloat(latitude),
      longitude: typeof longitude === 'number' ? longitude : parseFloat(longitude),
    };
  }
  if (geoData instanceof GeoPoint) {
    //console.error("Error finding event by 1", );
    return {
      latitude: parseFloat(geoData.latitude),
      longitude: parseFloat(geoData.longitude)
    };
  }
  if (typeof geoData === 'object') {
    //console.error("Error finding event by 1", );
    return {
      latitude: parseFloat(geoData.latitude || geoData.lat || 0),
      longitude: parseFloat(geoData.longitude || geoData.lng || 0)
    };
  }
  if (typeof geo.latitude === "function" && typeof geo.longitude === "function") {
    //console.error("Error finding event by 1", );
    return {
      latitude: geo.latitude(),
      longitude: geo.longitude()
    };
  }
  if (typeof geo.latitude === "number" && typeof geo.longitude === "number") {
    //console.error("Error finding event by 1", );
    return {
      latitude: geo.latitude,
      longitude: geo.longitude
    };
  }
}

export async function getEventByTitle(eventTitle) {
  try {
    const events = await getAllEvents();
    return events.find(event => event.eventName === eventTitle) || null;
  } catch (error) {
    //console.error("Error finding event by title:", error);
    return null;
  }
}

export async function getAllEvents() {
  // Create collection from database
  const events = collection(db, "events")

  // Attempt to get results
  try {
    const querySnapshot = await getDocs(events)
    const mockEvents = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const geoData = processGeoData(data.eventGeo);
      

      // Put data into an array
      mockEvents.push({
        id: doc.id,
        eventName: data.eventName,
        eventBldg: data.eventBldg,
        eventRm: data.eventRm,
        eventTime: data.eventTime.toDate?.() || new Date(data.eventTime),
        eventGeo: geoData
          
        
      })
    })

    return mockEvents
  } catch (error) {
    console.error("Error fetching events:", error)
    return []
  }
}


// Mock event data - no Firebase dependency
//export const mockEvents = [
//  {
//    id: "event1",
//    eventName: "Tech Conference",
//    eventBldg: "Convention Center",
//    eventRm: "Hall A",
//    eventTime: new Date(Date.now() + 86400000), // Tomorrow
//    eventGeo: {
//      latitude: 39.7862,
//      longitude: -84.0684
//    }
//  },
//  {
//    id: "event2",
//    eventName: "Music Festival",
//    eventBldg: "City Park",
//    eventRm: "Main Stage",
//    eventTime: new Date(Date.now() + 172800000), // 2 days from now
//    eventGeo: {
//      latitude: 39.787,
//      longitude: -84.0684
//    }
//  },
//  {
//    id: "event3",
//    eventName: "Art Exhibition",
//    eventBldg: "Museum",
//    eventRm: "Gallery 3",
//    eventTime: new Date(Date.now() + 259200000), // 3 days from now
//    eventGeo: {
//      latitude: 39.7868,
//      longitude: -84.068
//    }
//  },
//  {
//    id: "event4",
//    eventName: "Luncheon",
//    eventBldg: "Student Union",
//    eventRm: "201",
//    eventTime: new Date(Date.now() + 259200000), // 3 days from now
//    eventGeo: {
//      latitude: 39.7668,
//      longitude: -84.068
//    }
//  },
//  {
//    id: "event5",
//    eventName: "CS Class",
//    eventBldg: "Russ",
//    eventRm: "402",
//    eventTime: new Date(Date.now() + 259200000), // 3 days from now
//    eventGeo: {
//      latitude: 39.7768,
//      longitude: -84.068
//    }
//  }
//];
//
//export async function getEventByTitle(eventTitle) {
//  return mockEvents.find(event => event.eventName === eventTitle) || null;
//}
