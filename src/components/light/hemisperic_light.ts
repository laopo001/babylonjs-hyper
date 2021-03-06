/**
 * @author dadigua
 */
import { Light } from '../../component';
import * as BABYLON from 'babylonjs';

export interface HemisphericLightProps {
    position: number[];
}


export class HemisphericLight extends Light<HemisphericLightProps> {
    static defaultProps = Light.defaultProps;
    inst: BABYLON.HemisphericLight;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
    }
    create() {
        let { props, innerContext } = this;
        this.inst = new BABYLON.HemisphericLight(props.name, this.util.Nums3ToVector3(props.position), innerContext.scene);
    }
}