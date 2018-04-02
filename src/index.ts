/**
 * @author dadigua
 */
import * as BABYLON from 'babylonjs';
import { h } from './h';
import { Mesh } from './components';
export * from './components';
export * from './component';


export * from './render';
export * from './util';

function getComponent(inst): Mesh<any> {
    return inst['__component__'];
}


const PGL = {
    h,
    getComponent
};

export default PGL;
export {
    h,
    getComponent
};
