import { HGLNode, Node, ValidationMap } from './index';
import { ClassAttributes } from './node';
import { TransformProps } from './components/props';
import { next_queue } from './render';
import * as BABYLON from "babylonjs";
export abstract class Component<P =any> {
    props: Readonly<{ children?: HGLNode }> & Readonly<P>;
    type = 'Component';
    constructor(props, public innerContext?, public context?: any) {
        this.props = props;
    }
    util = {
        Nums3ToVector3(nums:number[]) {
            return new BABYLON.Vector3(nums[0],nums[1],nums[2]);
        }
    }
    // update() { }
    abstract create?(): any;
}



export interface ComponentClass<P extends ClassAttributes<P>={}> {
    new(props: P, innerContext, context?: any): Component<P>;
    defaultProps?: Partial<P>;
}


export abstract class TransformComponent<P> extends Component<P> {
    static defaultProps = {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scaling: [1, 1, 1]
    }
    readonly type = 'Mesh';
    inst: BABYLON.TransformNode;
    props: Readonly<P> & Readonly<TransformProps>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context)
    }
    create() {
        let { props } = this;
        this.inst.position = this.util.Nums3ToVector3(props.position);
        this.inst.rotation = this.util.Nums3ToVector3(props.rotation);
        this.inst.scaling =  this.util.Nums3ToVector3(props.scaling);
    }
}

export abstract class Mesh<P> extends TransformComponent<P> {
    static defaultProps = Object.assign({
        updatable: false,
    }, TransformComponent.defaultProps);
    readonly type = 'Mesh';
    inst: BABYLON.Mesh;
    props: Readonly<P> & Readonly<TransformProps>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context)
    }
    create() {
        super.create();
        // let { props, innerContext } = this;
        // this.inst.position = new BABYLON.Vector3(props.position[0], props.position[1], props.position[2])
    }
}

export abstract class Light<P> extends Component<P> {
    static defaultProps = {
        position: [0, 0, 0]
    }
    readonly type = 'Light';
    inst: any;
    props: Readonly<P>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context)
    }
    abstract create(): void;
}

export abstract class Camera<P> extends Component<P> {
    static defaultProps = {
        position: [0, 0, 0],
        target: [0, 0, 0]
    }
    type = 'TargetCamera';
    inst: BABYLON.TargetCamera;
    props: Readonly<P>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context)
    }
    abstract create(): void;
    setTarget(target: BABYLON.Vector3): void {
        this.inst.setTarget(target);
    }
}





export abstract class Enity<P extends ClassAttributes<P>=any> extends Component<P> {
    readonly type = 'Enity';
    children: Component[] = [];
    props: Readonly<P>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context)
    }
    next(cb: Function) {
        next_queue.push(cb);
    }
    update() { }
    // abstract create(): Node<any>[] | Node<any>;
    create(){return this.props.children}
}