// event-rotate.js
// This component rotates an entity at every frame tick (might add limiter to conserve resources)
AFRAME.registerComponent("rotation-tick", {
  init: function () {
    this.rotationTmp = { x: 0, y: 0, z: 0 } // Properly initialize rotationTmp
  },
  tick: function () {
    var el = this.el
    var rotation = el.getAttribute("rotation")

    // Increment the rotation
    this.rotationTmp.x = rotation.x + 0.2
    this.rotationTmp.y = rotation.y + 0.2
    this.rotationTmp.z = rotation.z + 0.2

    // Apply new rotation
    el.setAttribute("rotation", this.rotationTmp)
  },
})
