/**
 * @author dadigua
 */

const EMPTY_CHILDREN = [];
import { Node, Component, Key, Attributes } from './index'
import { ComponentClass } from './component';


export function h<P>(type: ComponentClass | string, props?: P, ...children: Node[]): Node<P> {
    if (arguments.length > 2) {
        const newChildren = [];
        const obj = { index: 0 };
        for (let i = 2; i < arguments.length; i++) {
            let item = arguments[i]
            if (typeof item === 'boolean') {
                newChildren.push(null);
            } else if (Array.isArray(item)) {
                addChild(newChildren, item);
            } else {
                newChildren.push(item);
            }

        }
        return new Node(type, props, newChildren);
    } else {
        return new Node(type, props, []);
    }
}


function addChild(newChildren, item) {
    let x;
    while (x = item.pop()) {
        if (Array.isArray(x)) {
            addChild(newChildren, x)
        } else {
            newChildren.push(x);
        }
    }
}