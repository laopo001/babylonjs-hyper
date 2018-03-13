import * as BABYLON from "babylonjs";
import { Engine } from "babylonjs";
import { Scene, Component } from '../index';
export interface SphereProps {
    name: string,
    segments: number,
    diameter: number,
    updatable?: boolean,
    sideOrientation?: number
}

export class Sphere extends Component<SphereProps> {
    inst: BABYLON.Mesh;
    setState() { }
    constructor(props, scene, context) {
        super(props)
        this.inst = BABYLON.Mesh.CreateSphere(props.name, props.segments, props.diameter, scene.inst, props.updatable, BABYLON.Mesh.FRONTSIDE);
    }
}