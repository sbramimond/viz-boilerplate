import React, { useEffect, useRef } from 'react';

import * as Three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const CHARTWORKER = new Worker(
    new URL('../worker/chart.worker.ts', import.meta.url)
);
const THREE_WORKER = new Worker(
    new URL('../worker/three.worker.ts', import.meta.url)
);

const THREE_CHANNEL = new BroadcastChannel('THREE:threeChannel');

export interface HelloProps {
    compiler?: string;
    framework?: string;
}

export default ({
    compiler = 'TypeScript',
    framework = 'react',
}: HelloProps) => {
    const X: object = { a: 1 };
    const Y: object = (n: number) => n + 1;
    const CANVAS_REF = useRef(null);
    const THREE_REF = useRef(null);
    const COPY_REF = useRef(null);

    useEffect(() => {
        if (!COPY_REF?.current) {
            return;
        }

        const CANVAS = COPY_REF.current;
        const { width, height } = CANVAS;

        const SCENE = new Three.Scene();
        const CAMERA = new Three.PerspectiveCamera(75, width / height, 1, 1000);
        const RENDERER = new Three.WebGLRenderer({
            antialias: true,
            canvas: CANVAS,
        });

        CAMERA.position.set(0, 0, 10);
        RENDERER.setSize(width, height);
        RENDERER.setClearColor(0xff0000, 1);
        RENDERER.render(SCENE, CAMERA);

        const CONTROLS = new OrbitControls(CAMERA, RENDERER.domElement);

        CONTROLS.update();

        function animate() {
            CONTROLS.update();
            RENDERER.render(SCENE, CAMERA);
        }

        RENDERER.setAnimationLoop(animate);

        CONTROLS.addEventListener('change', () => {
            THREE_CHANNEL.postMessage({
                type: 'cameraUpdate',
                data: {
                    position: CAMERA.position.toArray(),
                    rotation: CAMERA.rotation.toArray(),
                    target: CONTROLS.target.toArray(),
                },
            });
        });

        const HANDLE_CLICK = (e: MouseEvent) => {
            const RECT = COPY_REF.current.getBoundingClientRect();

            THREE_CHANNEL.postMessage({
                type: 'THREE:click',
                data: {
                    x: e.clientX - RECT.left,
                    y: e.clientY - RECT.top,
                },
            });
        };

        COPY_REF.current.onclick = HANDLE_CLICK;

        return () => {
            COPY_REF.current.onclick = null;
        };
    }, []);

    useEffect(() => {
        if (!CANVAS_REF?.current || !THREE_REF?.current) {
            return;
        }

        const CHART_OFFSCREEN = CANVAS_REF.current.transferControlToOffscreen();
        CHARTWORKER.postMessage({ canvas: CHART_OFFSCREEN }, [CHART_OFFSCREEN]);

        const THREE_OFFSCREEN = THREE_REF.current.transferControlToOffscreen();
        THREE_WORKER.postMessage({ canvas: THREE_OFFSCREEN }, [
            THREE_OFFSCREEN,
        ]);
    }, []);

    return (
        <>
            <h1>
                Hello from {X.toString()} and {Y.toString()} !
            </h1>
            <canvas
                ref={CANVAS_REF}
                width={400}
                height={400}
                style={{ width: '400px', height: '400px' }}
            ></canvas>

            <canvas
                ref={THREE_REF}
                width={400}
                height={400}
                style={{ width: '400px', height: '400px' }}
            ></canvas>

            <canvas
                ref={COPY_REF}
                width={400}
                height={400}
                style={{
                    border: 'solid 1px #0000ff',
                }}
            ></canvas>
        </>
    );
};
