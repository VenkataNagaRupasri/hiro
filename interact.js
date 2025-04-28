// interact.js
// This component modifies an entity to do something when the user touches the screen location 
// where the entity is displayed 
// (i.e., user touches event box with cursor, box displays event information on screen, user touches again, event info goes away).

AFRAME.registerComponent("click-display-info", {
  schema: {
    eventData: { type: 'string', default: '{}' }
  },

  init: function () {
    this.originalColor = this.el.getAttribute("material").color || "#3399ff";
    this.isSelected = false;

    try {
      this.eventData = JSON.parse(this.data.eventData);
    } catch (e) {
      console.error("Failed to parse event data:", e);
      this.eventData = {};
    }

    this.el.addEventListener("click", this.onClick.bind(this));
  },

  onClick: function () {
    const infoWindow = document.getElementById("displayWindow");
    const infoDisplay = document.getElementById("display-info-text");

    // Deselect all other events
    document.querySelectorAll("[click-display-info]").forEach(el => {
      if (el !== this.el) {
        const comp = el.components["click-display-info"];
        el.setAttribute("material", "color", comp.originalColor);
        comp.isSelected = false;
      }
    });

    // Toggle selection
    if (!this.isSelected) {
      // Select this event
      this.el.setAttribute("material", "color", "white");
      this.isSelected = true;
      infoWindow.object3D.visible = true;

      // Format time
      const eventTime = new Date(this.eventData.eventTime).toLocaleString();

      // Update display
      infoDisplay.setAttribute("value",
        `Name: ${this.eventData.eventName}
        \nBldg: ${this.eventData.eventBldg}
        \nRm: ${this.eventData.eventRm}
        \nTime: ${eventTime}`
      );

      // Dispatch selection event
      const event = new CustomEvent("event-selected", {
        detail: {
          entity: this.el,
          eventData: this.eventData
        }
      });
      document.dispatchEvent(event);
    } else {
      // Deselect
      this.el.setAttribute("material", "color", this.originalColor);
      this.isSelected = false;
      infoWindow.object3D.visible = false;
    }
  }
});