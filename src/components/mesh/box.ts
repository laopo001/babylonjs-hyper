/**
 * @author dadigua
 */
import * as BABYLON from 'babylonjs';
import { Scene, Mesh } from '../../index';

export interface BoxProps {
    width?: number;
    height?: number;
    depth?: number;
    updatable?: boolean;
}

export class Box extends Mesh<BoxProps> {
    static defaultProps = Mesh.defaultProps;
    inst: BABYLON.Mesh;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
    }
    create() {
        let { props, innerContext } = this;
        this.inst = BABYLON.MeshBuilder.CreateBox(props.name, props, innerContext.scene);
        super.create();
    }
}