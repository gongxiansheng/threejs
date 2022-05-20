let renderer
let camera
let scene
let light
let mesh
function initThree() {
    renderer = new THREE.WebGLRenderer({
        antialias: true // 开启抗锯齿 占资源 影响性能在大量对象渲染时
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    renderer.setClearColor(0xffffff, 1.0)

}

function initCamera() {
    const fov = 75;
    const aspect = 2; //window.innerWidth / window.innerHeight;  // 相机默认值
    const near = 0.1;
    const far = 5;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0,0,2)
}

function initScene() {
    scene = new THREE.Scene();
}

function initLight() {
    const color = 0xFFFFFF;
    const intensity = 1;
    light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
}

function initObject() {
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
    // const material = new THREE.MeshLambertMaterial({
    //     color: 0xff00ff,
    // });
    // const material = new THREE.MeshPhongMaterial({color: 0x44aa88});
    // mesh = new THREE.Mesh(geometry, material);
    cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
    ];
    // mesh.position.set(2,1,0)
    // scene.add(mesh);
}
function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});
   
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
   
    cube.position.x = x;
   
    return cube;
}
function render(time) {
    // mesh.rotation.x += 0.005;
    // mesh.rotation.y += 0.005;
    time *= 0.001;
    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
    });
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
function animate() {
    requestAnimationFrame(animate)
    render()
}
function initCanvas() {
    initThree()
    initScene()
    initCamera()
    initLight()
    initObject()
    requestAnimationFrame(render);
}
