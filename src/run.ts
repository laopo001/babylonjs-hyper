
import { Scene, Node, Component, Enity } from './index';
import { update_queue } from './render';
import { ComponentClass } from './component';


export function create(root: Node, engine) {
    console.log('begin')
    if (root.type !== Scene) {
        console.log('必须包括在Scene中'); return;
    }
    let scene = new Scene(engine)
    runChildren(root.children, scene.inst, {});
    return scene.inst;
}

export function run(node: Node, scene, context) {
    if (node instanceof Node) {
        let Ctor = node.type;
        let props = Object.assign({}, (Ctor as ComponentClass).defaultProps, node.props)
        let c = new (Ctor as ComponentClass)(props, scene, context)
        if (props.ref) {
            props.ref(c)
        }

        if (c instanceof Enity) {
            renderEnity(c, scene, context)

        } else {
            c.create();
            runChildren(node.children, scene, context);
        }
        return c;
    }
}

export function runChildren(nodes: Node[], scene, context, parent?: Enity) {
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let c = run(node, scene, context)
        if (parent) {
            parent.children.push(c);
        }
    }

}

function renderEnity(enity: Enity, scene, context) {
    update_queue.push(enity)
    let temp = enity.create()
    if (Array.isArray(temp)) {
        runChildren(temp, scene, context, enity);
    } else {
        runChildren([temp], scene, context, enity);
    }
}