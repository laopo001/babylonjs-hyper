import { Engine } from "babylonjs";

export class Scene {
    inst: BABYLON.Scene;
    constructor(engine: BABYLON.Engine) {
        this.inst = new BABYLON.Scene(engine);
    }
}