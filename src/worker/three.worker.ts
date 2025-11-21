import * as Three from 'three';

// interface ICameraData {
//     position: number[];
//     rotation: number[];
// }

let threeChannel = new BroadcastChannel(
    'THREE:threeChannel'
);
let camera = null;

let createRender = (canvas) => {
    let { width, height } = canvas;
    let scene = new Three.Scene();

    camera =
        new Three.PerspectiveCamera(
            75,
            width / height,
            1,
            1000
        );
    camera.position.set(0, 0, 10);
    camera.up.set(0, 0, 1);
    // camera.lookAt(0, 0, 0);

    let renderer =
        new Three.WebGLRenderer({
            antialias: true,
            canvas,
        });

    renderer.setPixelRatio(2);
    renderer.setAnimationLoop(animate);

    let axeHelper =
        new Three.AxesHelper(50);
    let gridHelper =
        new Three.GridHelper(100, 20);

    let geometry =
        new Three.BoxGeometry(1, 1, 1);
    let material =
        new Three.MeshBasicMaterial({
            color: 0x00ff00,
        });
    let cube = new Three.Mesh(
        geometry,
        material
    );
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

self.onmessage = ({
    data: { canvas = null },
}) => {
    if (canvas) {
        createRender(canvas);
    }
};

threeChannel.onmessage = ({
    data: { type = '', data = {} },
}) => {
    if (type === 'cameraUpdate') {
        let {
            position = [],
            rotation = [],
        } = data;

        camera.position.fromArray(
            position
        );
        camera.rotation.fromArray(
            rotation
        );

        return;
    }

    if (type === 'THREE:click') {
        let { x = 0, y = 0 } = data;

        let vector = new Three.Vector3(
            x,
            y,
            0
        );

        console.log(
            vector.unproject(camera)
        );
    }
};
