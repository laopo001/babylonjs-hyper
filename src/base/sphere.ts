import * as BABYLON from "babylonjs";
import { Engine } from "babylonjs";
import { Scene, Component } from '../index';
import { BaseProps } from '../config/props';


export interface SphereProps extends BaseProps {
    name: string,
    segments: number,
    diameter: number,
    updatable?: boolean,
    sideOrientation?: number
}

export class Sphere extends Component<SphereProps> {
    static defaultprops = {
        updatable: false
    }
    inst: BABYLON.Mesh;
    setState() { }
    constructor(props, scene, context) {
        super(props, scene, context)
        // this.inst = BABYLON.Mesh.CreateSphere(props.name, props.segments, props.diameter, scene.inst, props.updatable, BABYLON.Mesh.FRONTSIDE);
    }
    render() {
        let { props, scene } = this;
        this.inst = BABYLON.Mesh.CreateSphere(props.name, props.segments, props.diameter, scene.inst, props.updatable, BABYLON.Mesh.FRONTSIDE);
        return null;
    }
}

