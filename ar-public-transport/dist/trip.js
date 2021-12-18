import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from 'https://unpkg.com/three@0.127.0/examples/jsm/webxr/ARButton.js';

import {Location, BuslineLocations, exampleBusLine} from './line.js';

//global threejs objects

let scene, camera, renderer, controls;
let cube;
let loader;

let seeLandmarkList = false;

let visibleMesh;

//logic global variables

let currentLocation, globalNewLocation;

function getCanvasWidth() {
    return document.getElementById("three-d-area").clientWidth;
}

function getCanvasHeight() {
    return document.getElementById("three-d-area").clientHeight;
}

function wiringHTML(){
    //slider
    document.getElementById("myRange").oninput = (function(){
        onPostionChanged();
    })

    //new Location button
    document.getElementById("newLocation").onclick = (function(){
        updateViewToNewLocation();
        hideNewLocationBtn();
    })

    //toggle Button
    document.getElementById("toggleView").onclick = (function(){
        seeLandmarkList = !seeLandmarkList;
        if(seeLandmarkList){
            $("#close-location-container").hide();
            $("#landmark-list-container").show();
            $("#toggleView").prop('value', 'Show closest Landmark');
        }else{
            $("#landmark-list-container").hide();
            $("#close-location-container").show();
            $("#toggleView").prop('value', 'List of Landmarks');
        }
    })

    //AR button
    document.getElementById("openAR").onclick = (function(){
        window.open('/arview.html', '_blank');
    })
}

function setup(){

    //Create scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, getCanvasWidth() / getCanvasHeight(), 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( getCanvasWidth(), getCanvasHeight());
    renderer.xr.enabled = true;

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
    const material = new THREE.MeshBasicMaterial( { color: 0x82868c } );
    cube = new THREE.Mesh( geometry, material );
    cube.scale.set(2, 2, 2);
    scene.add( cube );

    //setupt OrbitControl
    controls = new OrbitControls( camera, renderer.domElement );

    //load 3D object
    loader = new GLTFLoader();

    camera.position.z = 10;
    camera.position.x = 0;
    camera.position.y = 5;
    controls.update();
    animate();
}

function animate() {
	requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

    controls.update();
	renderer.render( scene, camera );
}

function onPostionChanged(directUpdate = false){
    //normally access the device longitude and latitude here

    //fake location here instead:
    let fakePos = parseInt(document.getElementById("myRange").value);

    let newLocation = exampleBusLine.getClosestLocation(fakePos, fakePos);

    updateLandmarkList(newLocation);

    if(newLocation != currentLocation){
        globalNewLocation = newLocation;

        if(directUpdate){
            updateViewToNewLocation();
        }else{
            showNewLocationBtn();
        }
    }
}

function updateLandmarkList(location){

    let locationData = exampleBusLine.getLocationsWithEstimations(location);
    //remove old
    document.getElementById("landmark-list").innerHTML = "";
    //add correct layout
    for(let i=0; i < locationData.length; i++){
        let timeString;
        if(locationData[i].minute == 0){
            timeString = "";
        }else{
            timeString = "~ " + locationData[i].minute + "m";
        }

        let classText = "";
        if(locationData[i].timeId == 0) classText = "landmark past";
        if(locationData[i].timeId == 1) classText = "landmark current";
        if(locationData[i].timeId == 2) classText = "landmark future";

        let divLandmark = document.createElement("div");
        divLandmark.className = classText;
        let imgElem = document.createElement("img");
        imgElem.className = "round-img";
        imgElem.src = './data/images/' + locationData[i].imagePath;
        divLandmark.appendChild(imgElem);
        let headElem = document.createElement("h4");
        headElem.appendChild(document.createTextNode(locationData[i].headline));
        divLandmark.appendChild(headElem);
        let minElem = document.createElement("p");
        minElem.appendChild(document.createTextNode(timeString));
        minElem.className = "minShow";
        divLandmark.appendChild(minElem);

        document.getElementById("landmark-list").appendChild(divLandmark);

        // $("#landmark-list").html(
        //     '<div class="landmark past"><img src="./data/images/' + locationData[i].imagePath + '" class="' + classText + '"><h4>' + locationData[i].headline + '</h4><p class="minShow">' + timeString + '</p></div>'
        // )
    }
}

function updateViewToNewLocation(){
    currentLocation = globalNewLocation;
    //update Headline
    document.getElementById("cont-Headline").innerHTML = currentLocation.headline;

    //update Text
    document.getElementById("cont-longText").innerHTML = currentLocation.text;

    //update 3D scene
    if(visibleMesh != null){
        scene.remove(visibleMesh);
    }
    loadGltfObjIntoScene(currentLocation.objPath, currentLocation.posX, currentLocation.posY, currentLocation.posZ, currentLocation.scaleX, currentLocation.scaleY, currentLocation.scaleZ);
    
}

function loadGltfObjIntoScene(path, x, y, z, xs, ys, zs){
    scene.add(cube);
    loader.load( path, function ( gltf ) {
        gltf.scene.position.set(x, y, z);
        gltf.scene.scale.set(xs, ys, zs);
        visibleMesh = gltf.scene;
        scene.remove(cube);
	    scene.add( visibleMesh );
    }, undefined, function ( error ) {
        scene.remove(cube);
	    console.error( error );
    } );
}

function showNewLocationBtn(){
    document.getElementById("newLocation").style.bottom = "15px";
}

function hideNewLocationBtn(){
    document.getElementById("newLocation").style.bottom = "-200px";

    //check whether need to switch to landmarkview
    if(seeLandmarkList == true){
        seeLandmarkList = false;
        $("#landmark-list-container").hide();
        $("#close-location-container").show();
        $("#toggleView").prop('value', 'List of Landmarks');
    }
}


$("#landmark-list-container").hide();
setup();
wiringHTML();
onPostionChanged(true);
