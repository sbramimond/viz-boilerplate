import * as Three from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

export default function (camera: Three.Camera, renderer: Three.WebGLRenderer): OrbitControls | null {
    return new OrbitControls(camera, renderer.domElement);
}
