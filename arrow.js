
// arrow.js
// This script adds a custom component that changes rotation of the arrow entity based on the
//  users camera POV and the target (event) location. 
 

AFRAME.registerComponent("arrow-pointer", {
  init: function () {
    this.arrowEl = this.el; // The entity doing the pointing (tagged element)
    this.cameraEl = document.querySelector("a-camera"); // POV using the user's camera
    this.targetEl = null; // The entity we want to point toward
    
    // Use the event-selected event to set the target element
    this.onEventSelected = (e) => {
      if (e.detail && e.detail.entity) {
        this.targetEl = e.detail.entity;
        console.log("Arrow targeting:", this.targetEl.id);
      }
    };
    // Listen for the event-selected event to update the target element
    document.addEventListener("event-selected", this.onEventSelected);
  },

  tick: function () {
    if (!this.targetEl || !this.cameraEl) {
      // Fallback to first available event if no target
      this.targetEl = document.querySelector("[click-display-info]");
      if (!this.targetEl) return;
    }

    // Original code set 1 rotation logic
    const targetWorldPos = new THREE.Vector3();
    this.targetEl.object3D.getWorldPosition(targetWorldPos);

    const cameraPos = new THREE.Vector3();
    this.cameraEl.object3D.getWorldPosition(cameraPos);

    const targetLocalPos = targetWorldPos.clone();
    this.cameraEl.object3D.worldToLocal(targetLocalPos);

    // Angle in radians
    const angleRad = Math.atan2(targetLocalPos.y, targetLocalPos.x);
    // Convert radian angle to degrees
    const angleDeg = THREE.MathUtils.radToDeg(angleRad) - 90;
    // Set degree to the x-axis of the arrow element
    this.arrowEl.setAttribute("rotation", {
      x: 0,
      y: 0,
      z: angleDeg
    });
  },

  remove: function() {
    document.removeEventListener("event-selected", this.onEventSelected);
  }
});
