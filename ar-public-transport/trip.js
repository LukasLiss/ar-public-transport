import './tripstyle.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, controls;
let cube;

function getCanvasWidth() {
    return document.getElementById("three-d-area").clientWidth;
}

function getCanvasHeight() {
    return document.getElementById("three-d-area").clientHeight;
}

function setup(){

    //Create scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, getCanvasWidth() / getCanvasHeight(), 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( getCanvasWidth(), getCanvasHeight());

    scene.background = new THREE.Color( 0xffffff );

    //light
    const light = new THREE.AmbientLight( 0xffffff ); // soft white light
    scene.add( light );

    const dirLight1 = new THREE.DirectionalLight( 0xffddcc, 3 );
    dirLight1.position.set( 1, 0.75, 0.5 );
    scene.add( dirLight1 );

    const dirLight2 = new THREE.DirectionalLight( 0xccccff, 3 );
    dirLight2.position.set( - 1, 0.75, - 0.5 );
    scene.add( dirLight2 );

    document.getElementById("three-d-area").appendChild( renderer.domElement );

    //3d input
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    //setupt OrbitControl
    controls = new OrbitControls( camera, renderer.domElement );

    //load 3D object
    const loader = new GLTFLoader();

    loader.load( './data/kaiser/kaiser.gltf', function ( gltf ) {
        gltf.scene.position.set(4, -1, 8);
        gltf.scene.scale.set(6, 6, 6);
	    scene.add( gltf.scene );
    }, undefined, function ( error ) {
	    console.error( error );
    } );

    camera.position.z = 10;
    camera.position.x = 0;
    camera.position.y = 5;
    controls.update();
    animate();
}

function animate() {
	requestAnimationFrame( animate );

    controls.update();
	renderer.render( scene, camera );
}

setup();