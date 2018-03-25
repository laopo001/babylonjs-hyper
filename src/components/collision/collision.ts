
import { Component, ClassAttributes } from '../../index';
import * as BABYLON from 'babylonjs';

export interface CollisionProps {
    mass: number;
    restitution: number;
    type?: number;
    onCollide?: (self: BABYLON.PhysicsImpostor, collided: BABYLON.PhysicsImpostor) => void
}

export class Collision extends Component<CollisionProps> {
    static defaultProps = {

    }
    type = 'Collision';
    inst: BABYLON.PhysicsImpostor;
    props: Readonly<CollisionProps> & Readonly<ClassAttributes<CollisionProps>>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context)

    }
    create() {
        // this.props.registerOnPhysicsCollide
        let { props, innerContext } = this;
        let { mass, restitution, type, onCollide } = props;
        this.inst = new BABYLON.PhysicsImpostor(this.parent.inst, type || BABYLON.PhysicsImpostor.BoxImpostor, { mass, restitution }, innerContext.scene);

        this.parent.inst.physicsImpostor = this.inst;
        innerContext.collisions.push(this.inst)
        onCollide && this.next(() => {
            this.inst.registerOnPhysicsCollide(innerContext.collisions, onCollide);
        })
    }
}
