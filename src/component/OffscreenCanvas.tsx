import {useEffect, useRef} from 'react';

interface OffscreenCanvasProps {
    worker: Worker;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
}

export default function OffscreenCanvas({worker, width, height, style}: OffscreenCanvasProps) {
    let canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        let offscreen = canvasRef.current.transferControlToOffscreen();
        worker.postMessage(
            {
                canvas: offscreen,
            },
            [offscreen]
        );
    }, [worker.postMessage]);

    return <canvas ref={canvasRef} width={width} height={height} style={style}></canvas>;
}
