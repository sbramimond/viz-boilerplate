import {threeChannel} from '@/messageChannel';
import Aqua from '@/render/aqua';

let aqua: Aqua = null;

self.onmessage = async ({data: {canvas = null}}) => {
    if (!canvas) {
        return;
    }

    aqua = new Aqua(canvas);
};

threeChannel.onmessage = ({data: {type = '', data = {}}}) => {
    if (!aqua.camera) {
        return;
    }

    let {camera} = aqua;

    if (type === 'cameraUpdate') {
        let {position = [], rotation = []} = data;

        camera.position.fromArray(position);
        camera.rotation.fromArray(rotation);

        return;
    }

    if (type === 'THREE:click') {
        // let {x = 0, y = 0} = data;
        // let vector = new Three.Vector3(x, y, 0);
    }

    if (type === 'THREE:dblclick') {
        aqua.dispatchEvent('THREE:dblclick', data.x, data.y);
    }
};

export default {};
