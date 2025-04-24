// arrow.js
// This script adds a custom component that changes rotation of the arrow entity based on the users camera POV and the target (event) location. 
 
AFRAME.registerComponent("arrow-pointer", {
  init: function () {
    this.arrowEl = this.el // The entity doing the pointing (tagged element)
    this.targetEl = document.querySelector("#event") // The entity we want to point toward
    this.cameraEl = document.querySelector("a-camera") // POV using the user's camera
  },

  // With every frame update, 90ms, rotate toward the targetEL
  tick: function () {
    if (!this.targetEl || !this.cameraEl) return

    // World position of the event (target) element
    const targetWorldPos = new THREE.Vector3()
    this.targetEl.object3D.getWorldPosition(targetWorldPos)

    // Converted event (target) world position to Local position of camera element
    const targetLocalPos = targetWorldPos.clone()
    this.cameraEl.object3D.worldToLocal(targetLocalPos)

    // Angle in radians
    const angleRad = Math.atan2(targetLocalPos.y, targetLocalPos.x)

    // Convert radian angle to degrees
    var angleDeg = (180 / 3.1415926535) * angleRad - 90

    // Set degree to the x-axis of the arrow element
    this.arrowEl.setAttribute("rotation", { x: 0, y: 0, z: angleDeg })
  },
})
