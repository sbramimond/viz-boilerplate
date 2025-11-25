import {useEffect, useRef} from 'react';

import * as Three from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import Hello from '@/component/Hello';

// 使用Vite的特殊worker导入语法
import ChartWorker from '@/worker/chart.worker.ts?worker';
import ThreeWorker from '@/worker/three.worker.ts?worker';

let chartworker = new ChartWorker();
let threeWorker = new ThreeWorker();

let threeChannel = new BroadcastChannel('THREE:threeChannel');

export default () => {
    let canvasRef = useRef(null);
    let threeRef = useRef(null);
    let copyRef = useRef(null);

    useEffect(() => {
        if (!copyRef?.current) {
            return;
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
        let threeOffscreen = threeRef.current.transferControlToOffscreen();

        chartworker.postMessage({canvas: chartOffscreen}, [chartOffscreen]);

        // 先初始化 Three.js，然后发送 canvas
        threeWorker.postMessage({type: 'init-three'});
        setTimeout(() => {
            threeWorker.postMessage({type: 'canvas', canvas: threeOffscreen}, [threeOffscreen]);
        }, 100);
    }, []);

    return (
        <>
            <Hello compiler="TypeScript" framework="React" />
            <canvas
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
            ></canvas>
        </>
    );
};
