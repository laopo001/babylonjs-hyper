import * as BABYLON from 'babylonjs';

import { create, run, Node, Enity } from './index';


export const update_queue: Enity[] = []
export const next_queue: Function[] = []
function call_update_queue() {
    for (let i = 0; i < update_queue.length; i++) {
        update_queue[i].update()
    }
}
function call_next_queue() {
    let cb;
    while (cb = next_queue.pop()) {
        cb()
    }
}

interface Option {
    debugger: boolean
}

export function render(root: Node, canvas, option: Option = { debugger: false }) {
    if (canvas == null) { console.error('canvas not found'); return; }
    // Load the 3D engine
    var engine = new BABYLON.Engine(canvas as HTMLCanvasElement, true, { preserveDrawingBuffer: true, stencil: true });
    // CreateScene function that creates and return the scene
    var scene = create(root, engine);
    // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
    // Target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // Attach the camera to the canvas
    camera.attachControl(canvas, false);
    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    // var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    if (option.debugger) {
        scene.debugLayer.show();
    }
    // run the render loop
    engine.runRenderLoop(function () {
        call_update_queue();
        scene.render();
        call_next_queue();
    });
    // the canvas/window resize event handler
    window.addEventListener('resize', function () {
        engine.resize();
    });
}
