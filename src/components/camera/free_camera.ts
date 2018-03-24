import { Camera } from '../../index';
import * as BABYLON from "babylonjs";

export interface FreeCameraProps {
    position: number[];
    target: number[];
}


export class FreeCamera extends Camera<FreeCameraProps> {
    static defaultProps = Camera.defaultProps;
    inst: BABYLON.FreeCamera;
    constructor(props, innerContext, context) {
        super(props, innerContext, context)
    }
    create() {
        let { props, innerContext } = this;
        this.inst = new BABYLON.FreeCamera(props.name, this.util.Nums3ToVector3(props.position), innerContext.scene);
        super.setTarget(this.util.Nums3ToVector3(props.target));
        this.inst.attachControl(innerContext.canvas, true);
    }
}