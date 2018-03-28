/**
 * @author dadigua
 */
import { HGLNode, Node, ValidationMap, Collision } from './index';
import { ClassAttributes, Attributes } from './node';
import { TransformProps, MeshProps } from './components/props';
import { next_queue } from './render';
import { InternalContext, create } from './run';
import * as BABYLON from 'babylonjs';

function inspectArr(nums: number[]) {
    if (nums[0] == null || nums[1] == null || nums[2] == null) {
        throw new Error('nums length must be greater than or equal to 3');
    }
}

export abstract class Component<P= any> {
    props: Readonly<{ children?: HGLNode }> & Readonly<P>;
    type = 'Component';
    name: string;
    inst: any;
    parent: null | Component;
    children: Component[] = [];
    // parent: BABYLON.TransformNode;
    constructor(props, public innerContext?: InternalContext, public context?: any) {
        this.name = props.name;
        this.props = props;
    }

    util = {
        Nums3ToVector3(nums: number[]) {
            inspectArr(nums);
            return new BABYLON.Vector3(nums[0], nums[1], nums[2]);
        },
        Nums3ToColor3(nums: number[]) {
            inspectArr(nums);
            return new BABYLON.Color3(nums[0], nums[1], nums[2]);
        }
    };
    next(cb: Function) {
        next_queue.push(cb);
    }
    // update() { }
    create() {
        this.inst['__component__'] = this;
    }
}



export interface ComponentClass<P extends ClassAttributes<P>= {}> {
    new(props: P, innerContext, context?: any): Component<P>;
    defaultProps?: Partial<P>;
}


export abstract class TransformComponent<P= any> extends Component<P> {
    static defaultProps = {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scaling: [1, 1, 1]
    };
    type = 'TransformComponent';
    inst: BABYLON.TransformNode;
    props: Readonly<P> & Readonly<TransformProps>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
    }
    create() {
        let { props } = this;
        this.inst.position = this.util.Nums3ToVector3(props.position);
        this.inst.rotation = this.util.Nums3ToVector3(props.rotation);
        this.inst.scaling = this.util.Nums3ToVector3(props.scaling);
        super.create();
    }
}

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

export abstract class Light<P> extends Component<P> {
    static defaultProps = {
        position: [0, 0, 0]
    };
    readonly type = 'Light';
    inst: any;
    props: Readonly<P> & Readonly<ClassAttributes<P>>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
    }
    abstract create(): void;
}

export abstract class Camera<P> extends Component<P> {
    static defaultProps = {
        target: [0, 0, 0]
    };
    type = 'TargetCamera';
    inst: BABYLON.TargetCamera;
    props: Readonly<P> & Readonly<ClassAttributes<P>>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
    }
    create() { super.create(); }
    setTarget(target: BABYLON.Vector3): void {
        this.inst.setTarget(target);
    }
}
export abstract class Material<P> extends Component<P> {
    static defaultProps = {

    };
    type = 'Material';
    inst: BABYLON.Material;
    props: Readonly<P> & Readonly<ClassAttributes<P>>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
    }
    create() { super.create(); }
}

export abstract class Texture<P> extends Component<P> {
    static defaultProps = {

    };
    type = 'Texture';
    inst: BABYLON.Texture;
    props: Readonly<P> & Readonly<ClassAttributes<P>>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
    }
    create() { super.create(); }
}



export abstract class Enity<P extends ClassAttributes<P>= any> extends TransformComponent<P> {
    readonly type = 'Enity';
    inst: BABYLON.TransformNode;
    props: Readonly<P> & Readonly<ClassAttributes<P>>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
        this.inst = new BABYLON.TransformNode(props.name);
        this.next(() => {
            for (let i = 0; i < this.children.length; i++) {
                this.children[i].inst.parent = this.inst;
            }
        });
        this.next(this.init.bind(this));
        this.inst.position = this.util.Nums3ToVector3(props.position);
        this.inst.rotation = this.util.Nums3ToVector3(props.rotation);
        this.inst.scaling = this.util.Nums3ToVector3(props.scaling);
    }
    init() {

    }
    append(...node: Node[]) {
        create(node, this.innerContext, this.context, this);
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].inst.parent = this.inst;
        }
    }
    update() { }
    // abstract create(): Node<any>[] | Node<any>;
    create() {
        super.create();
        return this.props.children;
    }
}



