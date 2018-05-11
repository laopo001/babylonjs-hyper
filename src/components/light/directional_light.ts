/**
 * @author dadigua
 */
import { Light } from '../../component';
import * as BABYLON from 'babylonjs';

export interface DirectionalLightProps {
    position: number[];
    shadow?: boolean;
    target?: number[];
}


export class DirectionalLight extends Light<DirectionalLightProps> {
    static defaultProps = Light.defaultProps;
    inst: BABYLON.DirectionalLight;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
    }
    shadowGenerator: BABYLON.ShadowGenerator;
    create() {
        let { props, innerContext } = this;
        this.inst = new BABYLON.DirectionalLight(props.name, this.util.Nums3ToVector3(props.target), innerContext.scene);
        this.inst.position = this.util.Nums3ToVector3(props.position);

        if (props.shadow) {

            let shadowGenerator = new BABYLON.ShadowGenerator(1024, this.inst);
            let old = innerContext.shadowGeneratorRenderList;
            innerContext.shadowGeneratorRenderList = shadowGenerator.getShadowMap().renderList;
            old.forEach((x) => {
                innerContext.shadowGeneratorRenderList.push(x);
            });
            shadowGenerator.useBlurExponentialShadowMap = true;
            shadowGenerator.useKernelBlur = true;
            shadowGenerator.blurKernel = 64;
            this.shadowGenerator = shadowGenerator;

        }
    }
}