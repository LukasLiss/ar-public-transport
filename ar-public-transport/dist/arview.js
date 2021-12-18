import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { ARButton } from 'https://unpkg.com/three@0.127.0/examples/jsm/webxr/ARButton.js';

var camera
var scene 
var renderer
var arbutton
var controller
var reticle

var hitTestSource = null
var hitTestSourceRequested = false

init()
renderer.setAnimationLoop(render);

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;

    arbutton = ARButton.createButton(renderer, { 
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: document.getElementById('arOverlay') } 
    })
    document.body.appendChild(arbutton);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    reticle = new THREE.Mesh(new THREE.RingBufferGeometry(0.15, 0.2, 32).rotateX(-Math.PI/2), new THREE.MeshBasicMaterial());
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);
    reticle.add(new THREE.AxesHelper(0.5));
    reticle.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(0.1, 0.1), new THREE.MeshBasicMaterial()))

    controller = renderer.xr.getController(0);
    scene.add(controller);

    scene.add(new THREE.AxesHelper(1));
}

function render(timestamp, frame) {
    if(frame){
        var referenceSpace = renderer.xr.getReferenceSpace();
        var session = renderer.xr.getSession();

        if (hitTestSourceRequested === false) {
            session.requestReferenceSpace('viewer').then(function (referenceSpace) {
                session.requestHitTestSource({ space: referenceSpace }).then(function (source) {
                    hitTestSource = source;
                });
            });
            session.addEventListener('end', function () {
                hitTestSourceRequested = false;
                hitTestSource = null;
            });
            hitTestSourceRequested = true;
        }

        if (hitTestSource) {
            var hitTestResults = frame.getHitTestResults(hitTestSource);
            if (hitTestResults.length) {
                var hit = hitTestResults[0];
                reticle.visible = true;
                reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);

                // TODO apply some additional rotation here

            } else {
                reticle.visible = false;
            }
        }
    
    }
    renderer.render(scene, camera);
}