function calcPosFromLatLonRod(lat, lon) {
    var phi = lat * (Math.PI / 180)
    var theta = (lon + 180) * (Math.PI / 180)
    let x = -(Math.cos(phi) * Math.cos(theta))
    let y = Math.cos(phi) * Math.sin(theta)
    let z = Math.sin(phi)
    return { x, y, z }
}