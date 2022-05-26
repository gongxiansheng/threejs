import * as THREE from 'three';
import { FontLoader } from 'https://threejs.org/examples/jsm/loaders/FontLoader.js';
import { ParametricGeometry } from 'https://threejs.org/examples/jsm/geometries/ParametricGeometry.js';
import { TextGeometry } from 'https://threejs.org/examples/jsm/geometries/TextGeometry.js';
let renderer
let camera
let scene
let light
let cubes

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
    // const fov = 40;
    const aspect = 2; //window.innerWidth / window.innerHeight;  // 相机默认值
    const near = 0.1;
    // const far = 5;
    const far = 1000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 3)
}

function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);
}

function initLight() {
    const color = 0xFFFFFF;
    const intensity = 1;
    light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
}

const objects = [];
const spread = 15;

function addObject(x, y, obj) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
}

function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
}

function addSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
}

function initObject() {
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const widthSegments = 4; // ui: widthSegments
    const heightSegments = 4; // ui: heightSegments
    const depthSegments = 4; // ui: depthSegments
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth, widthSegments, heightSegments, depthSegments);
    // const material = new THREE.MeshLambertMaterial({
    //     color: 0xff00ff,
    // });
    // const material = new THREE.MeshPhongMaterial({color: 0x44aa88});
    // mesh = new THREE.Mesh(geometry, material);
    cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2),
    ];
    // mesh.position.set(2,1,0)
    // scene.add(mesh);
}

function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
}

function loadFont(params) {
    const loader = new FontLoader()
    loader.load('./node_modules/three/examples/fonts/helvetiker_regular.typeface.json', font => {
        const text = 'three.js'; // ui: text
        const geometry = new TextGeometry(text, {
            font: font,
            size: 3, // ui: size
            height: 0.2, // ui: height
            curveSegments: 12, // ui: curveSegments
            bevelEnabled: true, // ui: bevelEnabled
            bevelThickness: 0.15, // ui: bevelThickness
            bevelSize: 0.3, // ui: bevelSize
            bevelSegments: 5, // ui: bevelSegments
        });
        const mesh = new THREE.Mesh(geometry, createMaterial());
        geometry.computeBoundingBox();
        geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);
        mesh.position.z = -2;
        scene.add(mesh);
    })
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
    loadFont()
    requestAnimationFrame(render);
}

initCanvas()