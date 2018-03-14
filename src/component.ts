import { PNode, ValidationMap } from './index';

export abstract class Component<P=any> {
    constructor(public props: P, public scene?, public context?) {

    }
    update() { }
    abstract render?(): PNode;
}


export interface ComponentClass<P = {}> {
    new(props: P, context?: any): Component<P>;
    // propTypes?: ValidationMap<P>;
    // contextTypes?: ValidationMap<any>;
    // childContextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
}

