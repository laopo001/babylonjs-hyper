import { HGLNode, Node, ValidationMap } from './index';
import { ClassAttributes } from './node';
import { BaseMeshProps } from './components/props';
import { next_queue } from './render';
import * as BABYLON from "babylonjs";
export abstract class Component<P =any> {
    props: Readonly<{ children?: HGLNode }> & Readonly<P>;
    type = 'Component';
    constructor(props, public scene?, public context?: any) {
        this.props = props;
    }

    // update() { }
    abstract create?(): any;
}


export interface ComponentClass<P extends ClassAttributes<P>={}> {
    new(props: P, scene, context?: any): Component<P>;
    defaultProps?: Partial<P>;
}



export abstract class Mesh<P> extends Component<P> {
    static defaultProps = {
        updatable: false,
        position: [0, 0, 0],
    }
    readonly type = 'Mesh';
    inst: BABYLON.Mesh;
    props: Readonly<P> & Readonly<BaseMeshProps>;
    constructor(props, scene, context) {
        super(props, scene, context)
    }
    create() {
        let { props, scene } = this;
        this.inst.position = new BABYLON.Vector3(props.position[0], props.position[1], props.position[2])
    }
}

export abstract class Light<P> extends Component<P> {
    static defaultProps = {
        position: [0, 0, 0]
    }
    readonly type = 'Light';
    inst: any;
    props: Readonly<P>;
    constructor(props, scene, context) {
        super(props, scene, context)
    }
    abstract create(): void;
}


export abstract class Enity<P extends ClassAttributes<P>=any> extends Component<P> {
    readonly type = 'Enity';
    children: Component[] = [];
    props: Readonly<P>;
    constructor(props, scene, context) {
        super(props, scene, context)
    }
    next(cb: Function) {
        next_queue.push(cb);
    }
    update() { }
    abstract create(): Node<any>[] | Node<any>;
}