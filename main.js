import * as THREE from 'three'
import* as dat from 'dat.gui'
import fragment from './shader/fragment.glsl'
import vertex from './shader/vertex.glsl'
import {TimelineMax } from "gsap"

const OrbitControls = require("three-orbit-controls")(THREE)

export default class Sketch {
    constructor(selector) {
        this.scene = new THREE.Scene()
        this.renderer = new THREE.WebGLRenderer()
        
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setClearColor(0xeeeeee, 1)

        this.container = document.getElementById(selector)
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight
        this.container.appendChild(this.renderer.domElement)

        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth/ window.innerHeight, 0.001, 1000)
        this.camera.position.set(0, 0, 2)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.time = 0
        this.paused = false

        this.setupResize()

        this.addObjects()
        
        this.resize()

        this.render()
    }

    settings() {
        this.settings = {
            time: 0
        }
        this.gui = new dat.GUI()
        this.gui.add(this.settings, 'time', 0, 100, 0.01)
    }

    resize() {
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight
        this.renderer.setSize(this.width, this.height)
        this.camera.aspect = this.width / this.height

        this.imageAspect = 853/1280
        let a1,a2
        if (this.height / this.width > this.imageAspect) {
            a1 = this.width / this.height * this.imageAspect
            a2 = 1
        } else {
            a1 = 1
            a2 = this.height / this.width * this.imageAspect
        }

        // this.material.uniforms.resolution.value.x = this.width
        // this.material.uniforms.resolution.value.y = this.height
        // this.material.uniforms.resolution.value.z = a1
        // this.material.uniforms.resolution.value.w = a2

        this.camera.updateProjectionMatrix()
    }
    setupResize() {
        window.addEventListener('resize', this.resize.bind(this))
    }

    addObjects() {
        // this.material = new THREE.ShaderMaterial({
        //     extension: {
        //         directives: '#extension GL_OES_standard_derivatives : enable'
        //     },
        //     uniforms: {

        //         time: { type: 'f', value: 0 },
        //         resolution: { type: 'v4', value: new THREE.Vector4() },
        //         uvRatel: {value: new THREE.Vector2(1,1)},
        //     },
        
        //     vertexShader: vertex,
        
        //     fragmentShader: fragment
        // })
        this.material = new THREE.MeshBasicMaterial({
            color: 0xff0f0f,
            side: THREE.DoubleSide
        })
        this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1)

        this.plane = new THREE.Mesh(this.geometry, this.material)

        this.scene.add(this.plane)
    }

    stop() {
        this.paused = true
    }

    play() {
        this.paused = false
        this.render()
    }

    render() {
        if (this.paused) return
        this.time += 0.05
        // this.material.uniforms.time.value = this.time
        requestAnimationFrame(this.render.bind(this))
        this.renderer.render(this.scene, this.camera)
    }
}

new Sketch('container')
