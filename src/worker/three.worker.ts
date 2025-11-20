import * as THREE from 'three';

// interface ICameraData {
//     position: number[];
//     rotation: number[];
// }

const ab = 1;
console.log(ab);

let threeChannel = new BroadcastChannel('THREE:threeChannel');
let camera = null;

let createRender = (canvas) => {
    let { width, height } = canvas;
    let scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 100);

    let renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    renderer.setAnimationLoop(animate);
    renderer.setPixelRatio(2);

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
};

self.onmessage = ({ data: { canvas = null } }) => {
    if (canvas) {
        createRender(canvas);
    }
};

threeChannel.onmessage = ({ data: { type = '', data = {} } }) => {
    if (type === 'cameraUpdate') {
        let { position = [], rotation = [] } = data;

        camera.position.fromArray(position);
        camera.rotation.fromArray(rotation);
    }
};
