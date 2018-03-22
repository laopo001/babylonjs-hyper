
import { Scene, Node, Component, Enity } from './index';
import { update_queue } from './render';
import { ComponentClass } from './component';



export interface InternalContext {
    engine?: BABYLON.Engine;
    scene?: BABYLON.Scene;
    canvas?: HTMLElement;
    openPhysics?: boolean;
    collisions?:BABYLON.PhysicsImpostor[]
}

export function create(root: Node, innerContext: InternalContext) {
    let { engine } = innerContext;
    console.log('begin')
    if (root.type !== Scene) {
        console.log('必须包括在Scene中'); return;
    }
    let props = Object.assign({}, Scene.defaultProps, root.props)
    let scene = new Scene(engine, props, innerContext)
    scene.create();
    innerContext.scene = scene.inst;
    runChildren(root.children, innerContext, {});
    return scene.inst;
}

export function run(node: Node, innerContext: InternalContext, context) {
    let { scene } = innerContext;
    if (node instanceof Node) {
        let Ctor = node.type;
        let props = Object.assign({}, (Ctor as ComponentClass).defaultProps, node.props)
        let c = new (Ctor as ComponentClass)(props, innerContext, context)
        if (props.ref) {
            props.ref(c)
        }

        if (c instanceof Enity) {
            renderEnity(c, innerContext, context)

        } else {
            c.create();
            runChildren(node.children, innerContext, context);
        }
        return c;
    }
}

export function runChildren(nodes: Node[], innerContext: InternalContext, context, parent?: Enity) {

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let c = run(node, innerContext, context)
        if (parent) {
            parent.children.push(c);
        }
    }

}

function renderEnity(enity: Enity, innerContext: InternalContext, context) {
    update_queue.push(enity)
    let temp = enity.create()
    if (Array.isArray(temp)) {
        runChildren(temp, innerContext, context, enity);
    } else {
        runChildren([temp], innerContext, context, enity);
    }
}