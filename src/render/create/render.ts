import * as Three from 'three';

export default function (canvas: HTMLCanvasElement) {
    let {width, height} = canvas;
    let scene = new Three.Scene();
    let camera = new Three.PerspectiveCamera(75, width / height, 1, 1000);

    camera.position.set(0, 0, 10);
    // camera.up.set(0, 0, 0);

    let renderer = new Three.WebGLRenderer({
        antialias: true,
        canvas,
    });

    renderer.setPixelRatio(2);

    return {
        renderer,
        scene,
        camera,
    };
}
