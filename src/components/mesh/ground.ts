
import * as BABYLON from "babylonjs";
import { Scene, Mesh } from '../../index';

interface GroundProps {
    name: string;
    width: number;
    height: number;
    subdivisions: number;
    updatable?: boolean
}

export class Ground extends Mesh<GroundProps> {
    static defaultProps = Mesh.defaultProps;
    inst: BABYLON.Mesh;
    constructor(props, scene, context) {
        super(props, scene, context)
    }
    create() {
        let { props, scene } = this;
        this.inst = BABYLON.Mesh.CreateGround(props.name, props.width, props.height, props.subdivisions, scene, props.updatable);
        super.create();
    }
}