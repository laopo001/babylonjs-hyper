
import { Scene, Node, Component, ComponentClass } from './index';

export function create(root: Node, engine) {
    if (root.type !== Scene) {
        console.log('必须包括在Scene中'); return;
    }
    let scene = new Scene(engine)
    runChildren(root.children, scene);
    return scene.inst;
}

export function run(node: Node, scene) {
    if (node instanceof Node) {
        let C = node.type;
        new C(node.props, scene)
        runChildren(node.children, scene);
    }
}

export function runChildren(nodes: Node[], scene) {
    nodes.forEach(x => {
        run(x, scene)
    });
}