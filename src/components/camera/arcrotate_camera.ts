/**
 * @author dadigua
 */
import { Camera } from '../../component';
import * as BABYLON from 'babylonjs';

export interface ArcRotateCameraProps {
    target: number[];
    radius?: number;
}


export class ArcRotateCamera extends Camera<ArcRotateCameraProps> {
    static defaultProps = Object.assign({
        radius: 10
    }, Camera.defaultProps);
    inst: BABYLON.ArcRotateCamera;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
    }
    setTarget(nums) {
        this.inst.setTarget(this.util.Nums3ToVector3(nums));
    }
    create() {
        let { props, innerContext } = this;
        let camera = new BABYLON.ArcRotateCamera(props.name, 0, 0.8, props.radius, this.util.Nums3ToVector3(props.target), innerContext.scene);
        camera.lowerBetaLimit = 0.1;
        camera.upperBetaLimit = (Math.PI / 2) * 0.9;
        camera.lowerRadiusLimit = 10;
        camera.upperRadiusLimit = 150;
        this.inst = camera;
        this.inst.attachControl(innerContext.canvas, true);
    }
}