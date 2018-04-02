/**
 * @author dadigua
 */
import { Component, Enity, ComponentClass } from './component';
import { Node } from './node';
import { Scene, Mesh } from './components/';
import { update_queue } from './render';

export interface InternalContext {
    engine?: BABYLON.Engine;
    scene?: BABYLON.Scene;
    canvas?: HTMLElement;
    openPhysics?: boolean;
    debugger?: boolean;
    collisions?: BABYLON.PhysicsImpostor[];
    meshs: Mesh<any>[];
    shadowGeneratorRenderList: BABYLON.AbstractMesh[];
}

export function createScene(root: Node, innerContext: InternalContext) {
    let { engine } = innerContext;
    console.log('begin');
    if (root.type !== Scene) {
        console.log('必须包括在Scene中'); return;
    }
    let props = Object.assign({}, Scene.defaultProps, root.props);
    let scene = new Scene(engine, props, innerContext);
    scene.create();
    innerContext.scene = scene.inst;
    runChildren(root.children, innerContext, {}, scene);
    return scene.inst;
}

export function create(node: Node[], innerContext: InternalContext, context, parent) {

    runChildren(node, innerContext, context, parent);

}

export function run(node: Node, innerContext: InternalContext, context, parent) {
    let { scene } = innerContext;
    if (node instanceof Node) {
        let Ctor = node.type;
        let props = Object.assign({}, (Ctor as ComponentClass).defaultProps, node.props);
        let c = new (Ctor as ComponentClass)(props, innerContext, context);

        c.parent = parent;
        if (props.ref) {
            props.ref(c);
        }

        if (c instanceof Enity) {
            renderEnity(c, innerContext, context);

        } else {
            c.create();
            update_queue.push(c as any);
            runChildren(node.children, innerContext, context, c);
        }
        // let res = c.create();
        // if (Array.isArray(res)) {
        //     runChildren(res, innerContext, context, c);
        // } else if (res != null) {
        //     runChildren([res], innerContext, context, c);
        // }

        return c;
    } else {
        console.error('error');
    }
}

export function runChildren(nodes: Node[], innerContext: InternalContext, context, parent: any) {

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let c = run(node, innerContext, context, parent);
        if (parent) {
            parent.children.push(c);
        }
    }

}

function renderEnity(enity: Enity, innerContext: InternalContext, context) {
    update_queue.push(enity);
    let temp = enity.create();
    if (Array.isArray(temp)) {
        runChildren(temp, innerContext, context, enity);
    } else {
        console.error('error');
        runChildren([temp], innerContext, context, enity);
    }
}