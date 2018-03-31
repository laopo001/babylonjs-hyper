/**
 * @author dadigua
 */
import * as BABYLON from 'babylonjs';

import { createScene, run, Node, Enity, InternalContext } from './index';


export const update_queue: Enity[] = [];
export const next_queue: Function[] = [];



function call_update_queue() {
    for (let i = 0; i < update_queue.length; i++) {
        let c = update_queue[i];
        c.update && c.update();
    }
}
function call_next_queue() {
    let cb;
    while (cb = next_queue.pop()) {
        cb();
    }
}

export interface Option {
    debugger: boolean;
}

export function render(root: Node, canvas, option?: Option) {
    option = Object.assign({ debugger: false }, option || {});
    if (canvas == null) { console.error('canvas not found'); return; }
    // Load the 3D engine
    const engine = new BABYLON.Engine(canvas as HTMLCanvasElement, true, { preserveDrawingBuffer: true, stencil: true });
    // CreateScene function that creates and return the scene
    let innerContent: InternalContext = { engine, canvas, collisions: [], meshs: [], shadowGeneratorRenderList: [], debugger: option.debugger };
    const scene = createScene(root, innerContent);
    // Physics engine
    // var physicsViewer = new BABYLON.Debug.PhysicsViewer();
    // var physicsHelper = new BABYLON.PhysicsHelper(scene);
    if (option.debugger) {
        scene.debugLayer.show();
    }
    scene.preventDefaultOnPointerDown = false;
    scene.registerBeforeRender(function () {
        call_next_queue();
        call_update_queue();
    });
    // run the render loop
    engine.runRenderLoop(function () {
        // call_next_queue();
        // call_update_queue();
        scene.render();
    });
    // the canvas/window resize event handler
    window.addEventListener('resize', function () {
        engine.resize();
    });
    return scene;
}
