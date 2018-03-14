import { Engine } from "babylonjs";
import { Component } from '../index';

export class Scene extends Component<any>  {
    inst: BABYLON.Scene;
    constructor(engine) {
        super({})
        this.inst = new BABYLON.Scene(engine);
    }
    create(){
        return null;
    }
}