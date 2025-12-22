import * as Three from 'three';

export default function ({scene, renderer, camera}): void {
    renderer.setAnimationLoop(animate);

    let axeHelper = new Three.AxesHelper(50);
    let gridHelper = new Three.GridHelper(100, 20);

    let geometry = new Three.BoxGeometry(1, 1, 1);
    let material = new Three.MeshBasicMaterial({
        color: 0x00ff00,
    });
    let cube = new Three.Mesh(geometry, material);
    cube.position.set(0, 0, 0);

    // scene.add(cube);
    scene.add(axeHelper);
    scene.add(gridHelper);

    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
}
