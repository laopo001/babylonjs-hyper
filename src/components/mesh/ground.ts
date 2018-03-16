
import * as BABYLON from "babylonjs";
import { Scene, Mesh } from '../../index';

export interface GroundProps {
    name?: string;
    width: number;
    height: number;
    subdivisions: number;
    updatable?: boolean
}

export class Ground extends Mesh<GroundProps> {
    static defaultProps = Mesh.defaultProps;
    inst: BABYLON.Mesh;
    constructor(props, innerContext, context) {
        super(props, innerContext, context)
    }
    create() {
        let { props, innerContext } = this;
        this.inst = BABYLON.Mesh.CreateGround(props.name, props.width, props.height, props.subdivisions, innerContext.scene, props.updatable);
        super.create();
    }
}