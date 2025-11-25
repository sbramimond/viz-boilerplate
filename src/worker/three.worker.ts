import * as THREE from 'three';

let threeChannel = new BroadcastChannel('THREE:threeChannel');
let camera = null;

self.onmessage = async ({data}) => {
    if (data.type === 'canvas' && data.canvas) {
        createRender(data.canvas);
    }
};

let createRender = (canvas) => {
    let {width, height} = canvas;
    let scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    camera.position.set(0, 0, 10);
    camera.up.set(0, 0, 1);

    let renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas,
    });

    renderer.setPixelRatio(2);
    renderer.setAnimationLoop(animate);

    let axeHelper = new THREE.AxesHelper(50);
    let gridHelper = new THREE.GridHelper(100, 20);

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
    });
    let cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);

    scene.add(cube);
    scene.add(axeHelper);
    scene.add(gridHelper);

    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
};

threeChannel.onmessage = ({data: {type = '', data = {}}}) => {
    if (!camera) return;

    if (type === 'cameraUpdate') {
        let {position = [], rotation = []} = data;
        camera.position.fromArray(position);
        camera.rotation.fromArray(rotation);
        return;
    }

    if (type === 'THREE:click') {
        let {x = 0, y = 0} = data;
        let vector = new THREE.Vector3(x, y, 0);
        console.log(vector.unproject(camera));
    }
};
