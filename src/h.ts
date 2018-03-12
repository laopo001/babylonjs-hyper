/**
 * @author dadigua
 */

const EMPTY_CHILDREN = [];
import { Node } from './node'

export function h(nodeName: string | Function, props, children?) {
    if (arguments.length > 2) {
        const children = [];
        const obj = { index: 0 };
        for (let i = 2; i < arguments.length; i++) {
            let item = arguments[i]
            if (typeof item === 'boolean') {
                children.push(null);
            } else if (Array.isArray(item)) {
                let x;
                while (x = item.pop()) {
                    item.push(x);
                }
            } else {
                children.push(item);
            }

        }
        return new Node(nodeName, props, children);
    } else {
        return new Node(nodeName, props);
    }
}

