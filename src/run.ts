
import { Scene, Node } from './index';

export function create(root: Node, engine) {
    if (root.type !== Scene) {
        console.log('必须包括在Scene中'); return;
    }
    let scene = new Scene(engine)
    runChildren(root.children, scene);
}


export function run(node: Node, scene) {
    let c = node.type;
    new c(node.props, scene)
    runChildren(node.children, scene);
}

export function runChildren(nodes: Node[], scene) {
    nodes.forEach(x => {
        run(x, scene)
    });
}