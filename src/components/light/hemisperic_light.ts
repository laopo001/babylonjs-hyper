import { Light } from '../../index';
import * as BABYLON from "babylonjs";

interface HemisphericLightProps {
    name?: string;
    position?: number[];
}


export class HemisphericLight extends Light<HemisphericLightProps> {
    static defaultProps = Light.defaultProps;
    inst: BABYLON.HemisphericLight;
    constructor(props, scene, context) {
        super(props, scene, context)
    }
    create() {
        let { props, scene } = this;
        this.inst = new BABYLON.HemisphericLight(props.name, new BABYLON.Vector3(
            props.position[0], props.position[1], props.position[2],
        ), scene);
    }
}