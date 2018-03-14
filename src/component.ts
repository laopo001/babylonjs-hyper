import { PNode, Node, ValidationMap } from './index';
import { ClassAttributes } from './node';
import { next_queue } from './render';
import * as BABYLON from "babylonjs";
export abstract class Component<P =any> {
    constructor(public props: P, public scene?: BABYLON.Scene, public context?: any) {

    }
    // update() { }
    abstract create?(): PNode | void;
    static defaultProps = {

    }
}


export interface ComponentClass<P =any> {
    new(props: P, scene: BABYLON.Scene, context?: any): Component<P>;
    defaultProps?: Partial<P>;
}



export abstract class Mesh<P> extends Component<P> {
    constructor(props, scene, context) {
        super(props, scene, context)
    }
    abstract create(): void;
}

export abstract class Enity<P extends ClassAttributes<P>=any> extends Component<P> {
    constructor(props: P, scene, context) {
        super(props, scene, context)
    }
    next(cb: Function) {
        next_queue.push(cb);
    }
    update() { }
    abstract create(): Node;
}