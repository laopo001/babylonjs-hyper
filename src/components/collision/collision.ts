
import { Component } from '../../index';
import * as BABYLON from "babylonjs";

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
    props: Readonly<CollisionProps>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context)

    }
    create() {
        // this.props.registerOnPhysicsCollide
    }
}
