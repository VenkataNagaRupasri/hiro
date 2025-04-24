import { db } from "./firebase.js";
import {
  collection,
  doc,
  setDoc,
  Timestamp,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const eventForm = document.getElementById("eventForm");
  const showFormBtn = document.getElementById("showFormBtn");
  const latInput = document.getElementById("eventLat");
  const lngInput = document.getElementById("eventLng");

  // 🔹 Initialize Leaflet Map
  const map = L.map("map").setView([39.78, -84.06], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  let marker;
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    // ✅ Use full precision (no toFixed)
    latInput.value = lat;
    lngInput.value = lng;
    if (marker) {
      marker.setLatLng(e.latlng);
    } else {
      marker = L.marker(e.latlng).addTo(map);
    }
  });

  showFormBtn.addEventListener("click", () => {
    eventForm.style.display = "block";
    showFormBtn.style.display = "none";
  });

  eventForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const eventName = document.getElementById("eventName").value;
    const eventBldg = document.getElementById("eventBldg").value;
    const eventRm = document.getElementById("eventRm").value;
    const latitude = parseFloat(latInput.value);
    const longitude = parseFloat(lngInput.value);
    const eventTime = new Date(document.getElementById("eventTime").value);

    // Optional: Coordinate validation
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      alert("Invalid coordinates. Please pick a valid location on the map.");
      return;
    }

    try {
      const snapshot = await getDocs(collection(db, "events"));
      let maxId = 0;
      snapshot.forEach((doc) => {
        const match = doc.id.match(/^event(\d{6})$/);
        if (match) {
          const num = parseInt(match[1]);
          if (num > maxId) maxId = num;
        }
      });

      const nextId = `event${String(maxId + 1).padStart(6, "0")}`;
      console.log("🆕 New Event ID:", nextId);

      // Save as full-precision doubles
      await setDoc(doc(db, "events", nextId), {
        eventName,
        eventBldg,
        eventRm,
        eventGeo: [latitude, longitude],
        eventTime: Timestamp.fromDate(eventTime),
      });

      alert(`✅ Event added with ID: ${nextId}`);
      eventForm.reset();
      if (marker) map.removeLayer(marker);
      showFormBtn.style.display = "block";
      eventForm.style.display = "none";
    } catch (err) {
      console.error("❌ Failed to add event:", err);
      alert("Error saving event.");
    }
  });
});
