// Event.js Script
import { getEventByTitle } from "./fetch-event.js";

// This script performs two actions. The first is to parse the url parameter for the eventTitle variable. The second is to wait for the document to load, link scene and event entity to their respective variables, place event location via coordinates, and apply values to the display info window.

// Get url parameter
let urlParameter = new URLSearchParams(document.location.search)

document.addEventListener("DOMContentLoaded", async function () {
  const scene = document.querySelector("a-scene");
  if (scene) {
    console.log("event-js scene found!");
    console.log("Scene load state: ", scene.hasLoaded);

    const elementEvent = document.getElementById("event");

    if (elementEvent) {
      console.log("Event entity found!");
      const infoDisplay = document.getElementById("display-info-text");

      // Set scale, primitive and color.
      elementEvent.setAttribute("geometry", {
        primitive: "box",
        width: 8,
        height: 8,
        depth: 8,
      });

      // Create search variable to match with firebase event
      const eventTitle = urlParameter.get("eventName");
      const event = await getEventByTitle(eventTitle);

      // Place entity at gps location using events geloc data from firebase
      elementEvent.setAttribute("gps-new-entity-place", {
        latitude: parseFloat(event.eventGeo.latitude),
        longitude: parseFloat(event.eventGeo.longitude),
      });
      // Log position
      console.log(
        "Event Position:",
        elementEvent.getAttribute("gps-new-entity-place")
      );

      // Display values of event data from firebase
      infoDisplay.setAttribute(
        "value",
        `Name: ${event.eventName}
        \nBldg: ${event.eventBldg} 
        \nRm:  ${event.eventRm}
        \nTime:  ${event.eventTime.toDate().toLocaleString()}`
      );
    } else {
      console.error("Event entity not found!");
    }
  } else {
    console.error("Scene element not found!");
  }
});
