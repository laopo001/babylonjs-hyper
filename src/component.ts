import { Node,ValidationMap } from './index';

export class Component<P=any> {
    constructor(public props: P, public scene?, public context?) {

    }
    update() { }
    render(): Node {
        return null;
    }
}


export interface ComponentClass<P = {}> {
    new (props: P, context?: any): Component<P>;
    propTypes?: ValidationMap<P>;
    contextTypes?: ValidationMap<any>;
    childContextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
}

// export interface Component<P =any> { }

