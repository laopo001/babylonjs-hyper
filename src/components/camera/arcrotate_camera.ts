import { Camera } from '../../index';
import * as BABYLON from "babylonjs";

export interface ArcRotateCameraProps {
    target: number[];
}


export class ArcRotateCamera extends Camera<ArcRotateCameraProps> {
    static defaultProps = Camera.defaultProps;
    inst: BABYLON.ArcRotateCamera;
    constructor(props, innerContext, context) {
        super(props, innerContext, context)
    }
    create() {
        let { props, innerContext } = this;
        let camera = new BABYLON.ArcRotateCamera(props.name, 0, 0.8, 10, this.util.Nums3ToVector3(props.target), innerContext.scene);
        camera.lowerBetaLimit = 0.1;
        camera.upperBetaLimit = (Math.PI / 2) * 0.9;
        camera.lowerRadiusLimit = 10;
        camera.upperRadiusLimit = 150;
        this.inst = camera;
        this.inst.attachControl(innerContext.canvas, true);
    }
}