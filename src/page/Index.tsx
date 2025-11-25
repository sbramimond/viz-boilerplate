import {useEffect, useRef} from 'react';

import * as Three from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import Hello from '@/component/index/Hello';
import OffscreenCanvas from '@/component/OffscreenCanvas';

let threeChannel = new BroadcastChannel('THREE:threeChannel');

import ChartWorker from '@/worker/chart.worker.ts?worker';
import ThreeWorker from '@/worker/three.worker.ts?worker';

let chartworker = new ChartWorker();
let threeWorker = new ThreeWorker();

export default () => {
    const COPY_REF = useRef<HTMLCanvasElement>(null);

    // 使用自定义Hook管理Web Worker
    // let Chart = useCanvasWorker('@/worker/chart.worker.ts?worker');
    // useCanvasWorker('@/worker/three.worker.ts?worker', threeRef);

    useEffect(() => {
        if (!COPY_REF?.current) {
            return () => {};
        }

        const CANVAS = COPY_REF.current;
        const {width, height} = CANVAS;

        const SCENE = new Three.Scene();
        const CAMERA = new Three.PerspectiveCamera(75, width / height, 1, 1000);
        const RENDERER = new Three.WebGLRenderer({
            antialias: true,
            canvas: CANVAS,
        });

        CAMERA.position.set(0, 0, 10);
        CAMERA.up.set(0, 0, 1);

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
            threeChannel.postMessage({
                type: 'cameraUpdate',
                data: {
                    position: CAMERA.position.toArray(),
                    rotation: CAMERA.rotation.toArray(),
                    target: CONTROLS.target.toArray(),
                },
            });
        });

        const HANDLE_CLICK = (e: MouseEvent) => {
            const RECT = COPY_REF.current!.getBoundingClientRect();
            threeChannel.postMessage({
                type: 'THREE:click',
                data: {
                    x: e.clientX - RECT.left,
                    y: e.clientY - RECT.top,
                },
            });
        };

        COPY_REF.current.onclick = HANDLE_CLICK;

        return () => {
            if (COPY_REF.current) {
                COPY_REF.current.onclick = null;
            }
        };
    }, []);

    return (
        <>
            <Hello compiler="TypeScript" framework="React" />

            <OffscreenCanvas
                worker={chartworker}
                width={400}
                height={400}
                style={{
                    width: '400px',
                    height: '400px',
                }}
            />
            <OffscreenCanvas
                worker={threeWorker}
                width={400}
                height={400}
                style={{
                    width: '400px',
                    height: '400px',
                }}
            />
            {/* <canvas
                ref={canvasRef}
                width={400}
                height={400}
                style={{
                    width: '400px',
                    height: '400px',
                }}
            ></canvas>

            <canvas
                ref={threeRef}
                width={400}
                height={400}
                style={{
                    width: '400px',
                    height: '400px',
                }}
            ></canvas>

            <canvas
                ref={copyRef}
                width={400}
                height={400}
                style={{
                    border: 'solid 1px #0000ff',
                }}
            ></canvas> */}
        </>
    );
};
