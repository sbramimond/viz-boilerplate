import * as Three from 'three';
import {LineMaterial} from 'three/examples/jsm/lines/LineMaterial.js';
import {LineSegments2} from 'three/examples/jsm/lines/LineSegments2.js';
import {LineSegmentsGeometry} from 'three/examples/jsm/lines/LineSegmentsGeometry.js';

const LINE_DATA = [
    [
        // 线1: 前下边
        {start: [-2, -1.5, 1], end: [2, -1.5, 1]},
        // 线2: 前右边
        {start: [2, -1.5, 1], end: [2, 1.5, 1]},
        // 线3: 前上边
        {start: [2, 1.5, 1], end: [-2, 1.5, 1]},
        // 线4: 前左边
        {start: [-2, 1.5, 1], end: [-2, -1.5, 1]},

        // 线5: 后下边
        {start: [-2, -1.5, -1], end: [2, -1.5, -1]},
        // 线6: 后右边
        {start: [2, -1.5, -1], end: [2, 1.5, -1]},
        // 线7: 后上边
        {start: [2, 1.5, -1], end: [-2, 1.5, -1]},
        // 线8: 后左边
        {start: [-2, 1.5, -1], end: [-2, -1.5, -1]},

        // 线9: 左下棱
        {start: [-2, -1.5, 1], end: [-2, -1.5, -1]},
        // 线10: 右下棱
        {start: [2, -1.5, 1], end: [2, -1.5, -1]},
        // 线11: 右上棱
        {start: [2, 1.5, 1], end: [2, 1.5, -1]},
        // 线12: 左上棱
        {start: [-2, 1.5, 1], end: [-2, 1.5, -1]},
    ],
    [
        {start: [8, -1.5, 1], end: [12, -1.5, 1]},
        // 前右边
        {start: [12, -1.5, 1], end: [12, 1.5, 1]},
        // 前上边
        {start: [12, 1.5, 1], end: [8, 1.5, 1]},
        // 前左边
        {start: [8, 1.5, 1], end: [8, -1.5, 1]},

        // 后下边
        {start: [8, -1.5, -1], end: [12, -1.5, -1]},
        // 后右边
        {start: [12, -1.5, -1], end: [12, 1.5, -1]},
        // 后上边
        {start: [12, 1.5, -1], end: [8, 1.5, -1]},
        // 后左边
        {start: [8, 1.5, -1], end: [8, -1.5, -1]},

        // 左下棱
        {start: [8, -1.5, 1], end: [8, -1.5, -1]},
        // 右下棱
        {start: [12, -1.5, 1], end: [12, -1.5, -1]},
        // 右上棱
        {start: [12, 1.5, 1], end: [12, 1.5, -1]},
        // 左上棱
        {start: [8, 1.5, 1], end: [8, 1.5, -1]},
    ],
];

export default function ({scene}: {scene: Three.Scene}): void {
    let material = new LineMaterial({
        linewidth: 5,
        color: 0x00ff00,
    });

    LINE_DATA.forEach((item) => {
        let positions = [];

        item.forEach((line) => {
            positions.push(...line.start, ...line.end);
        });

        let geometry = new LineSegmentsGeometry();
        geometry.setPositions(positions);

        let cube = new LineSegments2(geometry, material);

        scene.add(cube);
    });
}
