
// distance-tick.js
// This script creates a customized component for an AFRAME 
// entity where the distance between a user and their target (event) is populated 
// into the text attribute of another element (arrow) with every frame update.


AFRAME.registerComponent("distance-calc", {
  schema: {
    mode: { type: 'string', default: 'selected' }
  },

  init: function () {
    this.textEl = this.el; // The entity doing the pointing (tagged element)
    this.cameraEl = document.querySelector("a-camera"); // POV using the user's camera
    this.targetEl = null; // The entity we want to point toward
    this.targetName = "";

    // Use the event-selected event to set the target element
    this.onEventSelected = (e) => {
      if (this.data.mode === 'selected' && e.detail) {
        this.targetEl = e.detail.entity;
        this.targetName = e.detail.eventData.eventName || "selected event";
      }
    };
    // Listen for the event-selected event to update the target element
    document.addEventListener("event-selected", this.onEventSelected);
  },
  
  tick: function () {
    if (!this.targetEl || !this.cameraEl) return;

    const targetPos = new THREE.Vector3();
    this.targetEl.object3D.getWorldPosition(targetPos);

    const cameraPos = new THREE.Vector3();
    this.cameraEl.object3D.getWorldPosition(cameraPos);

    const distance = cameraPos.distanceTo(targetPos).toFixed(2);
    const text = `${this.targetName} is this way.\nDistance: ${distance}m`;

    this.textEl.setAttribute("value", text);
  },

  remove: function() {
    document.removeEventListener("event-selected", this.onEventSelected);
  }
});
