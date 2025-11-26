import {Col, Row, Button} from 'antd';
import {useEffect, useRef} from 'react';

import OffscreenCanvas from '@/component/OffscreenCanvas';

let threeChannel = new BroadcastChannel('THREE:threeChannel');

import getControl from '@/render/create/control';
import getRender from '@/render/create/render';

import ChartWorker from '@/worker/chart.worker.ts?worker';
import ThreeWorker from '@/worker/three.worker.ts?worker';

import style from './index.module.less';

console.log(style);
let chartworker = new ChartWorker();
let threeWorker = new ThreeWorker();

export default () => {
    let copyRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!copyRef?.current) {
            return () => {};
        }

        let canvas = copyRef.current;
        let {width, height} = canvas;
        let {camera, renderer, scene} = getRender(canvas);

        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        renderer.render(scene, camera);

        let controls = getControl(camera, renderer);

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
            let rect = copyRef.current?.getBoundingClientRect();
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
            <Button type="primary" onClick={() => {
                Sentry.captureMessage('用户尝试进行无效操作', 'warning');
            }}>测试</Button>
            <Row>
                <Col span={12}>
                    <OffscreenCanvas
                        worker={chartworker}
                        width={400}
                        height={400}
                        style={{
                            width: '400px',
                            height: '400px',
                        }}
                    />
                </Col>
                <Col span={12}>
                    <div className={style['canvas-container']}>
                        <canvas
                            ref={copyRef}
                            width={400}
                            height={400}
                            style={{
                                border: 'solid 1px #0000ff',
                                position: 'absolute',
                                zIndex: 1,
                            }}
                        ></canvas>
                        <OffscreenCanvas
                            worker={threeWorker}
                            width={400}
                            height={400}
                            style={{
                                width: '400px',
                                height: '400px',
                                position: 'absolute',
                                zIndex: 0,
                            }}
                        />

                    </div>
                </Col>
            </Row>
        </>
    );
};
