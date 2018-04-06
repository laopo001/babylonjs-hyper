/**
 * @author dadigua
 */
import * as BABYLON from 'babylonjs';
import { Mesh } from './index';

export interface CylinderProps {
    height?: number;
    diameterTop?: number;
    diameterBottom?: number;
    diameter?: number;
    tessellation?: number;
    subdivisions?: number;
    arc?: number;
    updatable?: boolean;
}

export class Cylinder extends Mesh<CylinderProps> {
    static defaultProps = Mesh.defaultProps;
    inst: BABYLON.Mesh;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
    }
    create() {
        let { props, innerContext } = this;
        this.inst = BABYLON.MeshBuilder.CreateCylinder(props.name, props, innerContext.scene);
        // this.inst.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_NONE;
        super.create();
    }
}