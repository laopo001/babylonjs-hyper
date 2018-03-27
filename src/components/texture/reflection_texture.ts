/**
 * @author dadigua
 */
import { Texture, ClassAttributes, Mesh } from '../../index';
import * as BABYLON from 'babylonjs';

export interface ReflectionTextureProps {
    allRender?: boolean;
    level?: number;
}


export class ReflectionTexture extends Texture<ReflectionTextureProps> {
    static defaultProps = {
        allRender: true,
        level: 1
    };
    inst: BABYLON.MirrorTexture;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
    }
    setRenderList(renderList) {
        this.inst.renderList = renderList.map((x) => { return x.inst; });
    }
    refresh() {
        this.next(() => {
            this.inst.renderList = this.innerContext.meshs.filter(x => x.inst !== this.parent.parent.inst).map(x => x.inst);
        });
    }
    create() {
        let { props, innerContext } = this;
        let glass = this.parent.parent.inst;
        let mirrorMaterial = glass.material;

        glass.computeWorldMatrix(true);
        let glass_worldMatrix = glass.getWorldMatrix();
        let glass_vertexData = glass.getVerticesData('normal');
        let glassNormal = new BABYLON.Vector3(glass_vertexData[0], glass_vertexData[1], glass_vertexData[2]);
        glassNormal = BABYLON.Vector3.TransformNormal(glassNormal, glass_worldMatrix);
        let reflector = BABYLON.Plane.FromPositionAndNormal(glass.position, glassNormal.scale(-1));

        let reflectionTexture = new BABYLON.MirrorTexture(props.name || 'Mirror', 1024, innerContext.scene, true);
        this.inst = reflectionTexture;
        reflectionTexture.mirrorPlane = reflector;
        reflectionTexture.level = props.level;
        mirrorMaterial.reflectionTexture = reflectionTexture;
        if (props.allRender) {
            this.next(() => {
                reflectionTexture.renderList = innerContext.meshs.filter(x => x.inst !== glass).map(x => x.inst);
            });
        }



        // glass.material = mirrorMaterial;
    }
}