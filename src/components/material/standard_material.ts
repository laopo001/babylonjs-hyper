import { Material, ClassAttributes } from '../../index';
import * as BABYLON from "babylonjs";

export interface StandardMaterialProps {
    alpha?: number;
    backFaceCulling?: boolean;
    diffuseColor?: number[];
    pointsCloud?: boolean;
    pointSize?: number;
}


export class StandardMaterial extends Material<StandardMaterialProps> {
    static defaultProps = {
        backFaceCulling: false,
        diffuseColor: [1, 1, 1],
        pointsCloud: false,
        pointSize: 1
    };
    inst: BABYLON.StandardMaterial;
    constructor(props, innerContext, context) {
        super(props, innerContext, context)
    }
    create() {
        let { props, innerContext } = this;
        this.inst = new BABYLON.StandardMaterial(props.name || 'StandardMaterial', innerContext.scene);
        props.alpha != null && (this.inst.alpha = props.alpha);
        this.inst.backFaceCulling = props.backFaceCulling;
        this.inst.diffuseColor = this.util.Nums3ToColor3(props.diffuseColor)
        if (props.pointsCloud) {
            this.inst.pointsCloud = props.pointsCloud;
            this.inst.pointSize = props.pointSize;
        }
        this.parent.inst.material = this.inst;
    }
}