import { Light } from '../../index';
import * as BABYLON from "babylonjs";

export interface DirectionalLightProps {
    position: number[];
    shadow?: boolean;
    target?: number[];
}


export class DirectionalLight extends Light<DirectionalLightProps> {
    static defaultProps = Light.defaultProps;
    inst: BABYLON.DirectionalLight;
    constructor(props, innerContext, context) {
        super(props, innerContext, context)
    }
    create() {
        let { props, innerContext } = this;
        this.inst = new BABYLON.DirectionalLight(props.name, this.util.Nums3ToVector3(props.target), innerContext.scene);
        this.inst.position = this.util.Nums3ToVector3(props.position)
        
        if (props.shadow) {
            this.next(() => {
                var shadowGenerator = new BABYLON.ShadowGenerator(1024, this.inst);
                innerContext.meshs.forEach((x)=>{
                    if(x.props.cast){
                        shadowGenerator.getShadowMap().renderList.push(x.inst)
                    }
                })
                shadowGenerator.useBlurExponentialShadowMap = true;
                shadowGenerator.useKernelBlur = true;
                shadowGenerator.blurKernel = 64;
            })

        }
    }
}