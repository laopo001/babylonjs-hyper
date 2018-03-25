/**
 * @author dadigua
 */

import * as BABYLON from 'babylonjs';
// import { Scene, Engine } from 'babylonjs';
import { h } from './h';
import { Mesh } from './component'
export * from './component';
export * from './components';

export * from './render';
export * from './node';
export * from './run';
export * from './h';
export * from './config/index';
export * from './out_util';


const PGL = {
    h,
    getComponent: function (inst): Mesh<any> {
        return inst['__component__'];
    }
};

export default PGL;