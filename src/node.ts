import { Component, ComponentClass } from './index';

export class Node<P extends Attributes =any> {
    key: Key | null;
    constructor(public type: ComponentClass | string, public props: P, public children?: Node[]) {
        this.props = this.props == null ? {} as P : this.props;
        this.key = this.props.key;
        this.props.children = children;
    }
}

export type HGLNode = Node | Node[] | string | number | boolean | null | undefined;

export type Key = string | number;

export interface Attributes {
    key?: Key;
    children?: Node[] | Node | null;
}

// export interface IntrinsicAttributes extends Attributes { }

export type Ref<T> = { bivarianceHack(instance: T | null): any }["bivarianceHack"];

export interface ClassAttributes<T> extends Attributes {
    ref?: Ref<T>;
}

export type Validator<T> = { bivarianceHack(object: T, key: string, componentName: string, ...rest: any[]): Error | null }["bivarianceHack"];

export type ValidationMap<T> = {[K in keyof T]?: Validator<T> };

/* interface Requireable<T> extends Validator<T> {
    isRequired: Validator<T>;
}

interface ReactPropTypes {
    any: Requireable<any>;
    array: Requireable<any>;
    bool: Requireable<any>;
    func: Requireable<any>;
    number: Requireable<any>;
    object: Requireable<any>;
    string: Requireable<any>;
    node: Requireable<any>;
    element: Requireable<any>;
    instanceOf(expectedClass: {}): Requireable<any>;
    oneOf(types: any[]): Requireable<any>;
    oneOfType(types: Array<Validator<any>>): Requireable<any>;
    arrayOf(type: Validator<any>): Requireable<any>;
    objectOf(type: Validator<any>): Requireable<any>;
    shape(type: ValidationMap<any>): Requireable<any>;
}
interface Component<P = {}> {
    new(props: P, context?: any): Component<P>;
    propTypes?: ValidationMap<P>;
    contextTypes?: ValidationMap<any>;
    childContextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
} */

declare global {
    namespace JSX {

        // interface Element extends Node { }
        // interface ElementClass extends Component<any> {
        //     render(): Node;
        // }
        interface ElementAttributesProperty { props: {} }
        // interface ElementChildrenAttribute { children: {}; }
        // interface IntrinsicAttributes extends Attributes { }
        interface IntrinsicClassAttributes<T> extends ClassAttributes<T> { }
    }
}