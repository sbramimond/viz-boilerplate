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
    let copyRef = useRef<HTMLCanvasElement>(null);

    // 使用自定义Hook管理Web Worker
    // let Chart = useCanvasWorker('@/worker/chart.worker.ts?worker');
    // useCanvasWorker('@/worker/three.worker.ts?worker', threeRef);

    useEffect(() => {
        if (!copyRef?.current) {
            return () => {};
        }

        let canvas = copyRef.current;
        let {width, height} = canvas;

        let scene = new Three.Scene();
        let camera = new Three.PerspectiveCamera(75, width / height, 1, 1000);
        let renderer = new Three.WebGLRenderer({
            antialias: true,
            canvas,
        });

        camera.position.set(0, 0, 10);
        camera.up.set(0, 0, 1);

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
            let rect = copyRef.current!.getBoundingClientRect();
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
            if (copyRef.current) {
                copyRef.current.onclick = null;
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
