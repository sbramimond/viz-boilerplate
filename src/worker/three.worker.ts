import * as Three from 'three';

import {threeChannel} from '@/messageChannel';
import getRender from '@/render/create/render';

let iCamera = null;

self.onmessage = async ({data: {canvas = null}}) => {
    if (!canvas) {
        return;
    }

    createRender(canvas);
};

let createRender = (canvas: HTMLCanvasElement) => {
    let {camera, renderer, scene} = getRender(canvas);

    iCamera = camera;
    renderer.setAnimationLoop(animate);

    let axeHelper = new Three.AxesHelper(50);
    let gridHelper = new Three.GridHelper(100, 20);

    let geometry = new Three.BoxGeometry(1, 1, 1);
    let material = new Three.MeshBasicMaterial({
        color: 0x00ff00,
    });
    let cube = new Three.Mesh(geometry, material);
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
    if (!iCamera) return;

    if (type === 'cameraUpdate') {
        let {position = [], rotation = []} = data;

        iCamera.position.fromArray(position);
        iCamera.rotation.fromArray(rotation);

        return;
    }

    if (type === 'THREE:click') {
        // let {x = 0, y = 0} = data;
        // let vector = new Three.Vector3(x, y, 0);
    }
};

export default {};
