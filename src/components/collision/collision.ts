/**
 * @author dadigua
 */
import { Component } from '../../component';
import { ClassAttributes } from '../../node';
import * as BABYLON from 'babylonjs';

export interface CollisionProps {
    mass: number;
    restitution: number;
    type?: number;
    friction?: number;
    onCollide?: (self: BABYLON.PhysicsImpostor, collided: BABYLON.PhysicsImpostor) => void;
}

export class Collision extends Component<CollisionProps> {
    static defaultProps = {
        friction: 0.2
    };
    type = 'Collision';
    inst: BABYLON.PhysicsImpostor;
    _clone: BABYLON.PhysicsImpostor;
    props: Readonly<CollisionProps> & Readonly<ClassAttributes<CollisionProps>>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
    }
    create() {
        // this.props.registerOnPhysicsCollide
        let { props, innerContext } = this;
        let { mass, restitution, type, onCollide, friction } = props;
        type = type != null ? type : BABYLON.PhysicsImpostor.BoxImpostor;
        this.inst = new BABYLON.PhysicsImpostor(this.parent.inst, type, { mass, restitution, friction }, innerContext.scene);
        this.parent.inst.physicsImpostor = this.inst;
        innerContext.collisions.push(this.inst);
        onCollide && this.next(() => {
            this.inst.registerOnPhysicsCollide(innerContext.collisions.filter(x => x !== this.inst), onCollide);
        });
        // this.inst.onCollide = function (e) {
        //     console.log(e);
        // };
        // this.inst.afterStep = function () {
        //     console.log(99);
        // };
    }
}
