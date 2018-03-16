import * as BABYLON from "babylonjs";
// import { Engine } from "babylonjs";
import { Scene, Component, Mesh } from '../../index';

export interface SphereProps {
    name?: string,
    segments: number,
    diameter: number,
    updatable?: boolean,
    sideOrientation?: number
}

export class Sphere extends Mesh<SphereProps> {
    static defaultProps = Mesh.defaultProps;
    inst: BABYLON.Mesh;
    setState() { }
    constructor(props, innerContext, context) {
        super(props, innerContext, context)
    }
    create() {
        let { props, innerContext } = this;
        this.inst = BABYLON.Mesh.CreateSphere(props.name, props.segments, props.diameter, innerContext.scene, props.updatable, BABYLON.Mesh.FRONTSIDE);
        super.create();
    }
}

