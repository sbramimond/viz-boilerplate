import React, { useEffect, useRef } from 'react';

import * as Three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let chartworker = new Worker(
    new URL('../worker/chart.worker.ts', import.meta.url)
);
let threeWorker = new Worker(
    new URL('../worker/three.worker.ts', import.meta.url)
);

let threeChannel = new BroadcastChannel('THREE:threeChannel');

// export interface HelloProps {
//     compiler?: string;
//     framework?: string;
// }

export default () => {
    let x: object = { a: 1 };
    let y: object = (n: number) => n + 1;
    let canvasRef = useRef(null);
    let threeRef = useRef(null);
    let copyRef = useRef(null);

    useEffect(() => {
        if (!copyRef?.current) {
            return;
        }

        let canvas = copyRef.current;
        let { width, height } = canvas;

        let scene = new Three.Scene();
        let camera = new Three.PerspectiveCamera(75, width / height, 1, 1000);
        let renderer = new Three.WebGLRenderer({ antialias: true, canvas });

        camera.position.set(0, 0, 10);
        camera.up.set(0, 0, 1);
        // camera.lookAt(0, 0, 0);

        renderer.setSize(width, height);
        renderer.setClearColor(0xff0000, 1);
        renderer.render(scene, camera);

        let controls = new OrbitControls(camera, renderer.domElement);

        controls.update();

        function animate() {
            controls.update();
            renderer.render(scene, camera);
        }

        renderer.setAnimationLoop(animate);

        controls.addEventListener('change', () => {
            threeChannel.postMessage({
                type: 'cameraUpdate',
                data: {
                    position: camera.position.toArray(),
                    rotation: camera.rotation.toArray(),
                    target: controls.target.toArray(),
                },
            });
        });

        let handleClick = (e: MouseEvent) => {
            let rect = copyRef.current.getBoundingClientRect();

            threeChannel.postMessage({
                type: 'THREE:click',
                data: {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                },
            });
        };

        copyRef.current.onclick = handleClick;

        return () => {
            copyRef.current.onclick = null;
        };
    }, []);

    useEffect(() => {
        if (!canvasRef?.current || !threeRef?.current) {
            return;
        }

        let chartOffscreen = canvasRef.current.transferControlToOffscreen();
        chartworker.postMessage({ canvas: chartOffscreen }, [chartOffscreen]);

        let threeOffscreen = threeRef.current.transferControlToOffscreen();
        threeWorker.postMessage({ canvas: threeOffscreen }, [threeOffscreen]);
    }, []);

    return (
        <>
            <h1>
                Hello from {x.toString()} and {y.toString()} !
            </h1>
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                style={{ width: '400px', height: '400px' }}
            ></canvas>

            <canvas
                ref={threeRef}
                width={400}
                height={400}
                style={{ width: '400px', height: '400px' }}
            ></canvas>

            <canvas
                ref={copyRef}
                width={400}
                height={400}
                style={{
                    border: 'solid 1px #0000ff',
                }}
            ></canvas>
        </>
    );
};
