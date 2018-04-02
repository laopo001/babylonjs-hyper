/**
 * @author dadigua
 */
import { TransformComponent } from '../../component';
import { Collision } from '../collision/collision';
import { TransformProps, MeshProps } from '../props';
import { ClassAttributes } from '../../node';

export abstract class Mesh<P> extends TransformComponent<P> {
    static defaultProps = Object.assign({
        updatable: false,
        receiveShadows: false,
        cast: false
    }, TransformComponent.defaultProps);
    readonly type = 'Mesh';
    inst: BABYLON.Mesh;
    get collision(): Collision {
        return this.children.find(x => x instanceof Collision) as Collision;
    }
    props: Readonly<P> & Readonly<TransformProps> & Readonly<ClassAttributes<P>> & Readonly<MeshProps>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
    }
    create() {

        let { props, innerContext } = this;
        this.inst.receiveShadows = this.props.receiveShadows;
        this.inst.material = new BABYLON.StandardMaterial('material', innerContext.scene);
        this.innerContext.meshs.push(this);
        if (this.props.cast) {
            this.innerContext.shadowGeneratorRenderList.push(this.inst);
        }
        super.create();
    }
}