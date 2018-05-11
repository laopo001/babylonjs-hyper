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
    linearFactor?: number[];
    angularFactor?: number[];
    onCollide?: (self: BABYLON.PhysicsImpostor, collided: BABYLON.PhysicsImpostor) => void;
}

export class Collision extends Component<CollisionProps> {
    static defaultProps = {
        friction: 0.2,
        linearFactor: [1, 1, 1],
        angularFactor: [1, 1, 1]
    };
    type = 'Collision';
    inst: BABYLON.PhysicsImpostor;
    _clone: BABYLON.PhysicsImpostor;
    props: Readonly<CollisionProps> & Readonly<ClassAttributes<CollisionProps>>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
    }
    linearFactor = new BABYLON.Vector3(1, 1, 1);
    angularFactor = new BABYLON.Vector3(1, 1, 1);
    update() {
        this.inst.setAngularVelocity(this.inst.getAngularVelocity().multiply(this.angularFactor));
        this.inst.setLinearVelocity(this.inst.getLinearVelocity().multiply(this.linearFactor));
    }
    create() {
        // this.props.registerOnPhysicsCollide
        let { props, innerContext } = this;
        let { mass, restitution, type, onCollide, friction } = props;
        type = type != null ? type : BABYLON.PhysicsImpostor.BoxImpostor;
        this.inst = new BABYLON.PhysicsImpostor(this.parent.inst, type, { mass, restitution, friction }, innerContext.scene);
        this.parent.inst.physicsImpostor = this.inst;
        innerContext.collisions.push(this.inst);
        this.linearFactor = this.util.Nums3ToVector3(props.linearFactor);
        this.angularFactor = this.util.Nums3ToVector3(props.angularFactor);
        // this.inst.setDeltaPosition(new BABYLON.Vector3(.5, .5, .5));
        // this.inst.setDeltaRotation(new BABYLON.Vector3(0, 0, 0).toQuaternion());
        onCollide && this.next(() => {
            this.inst.registerOnPhysicsCollide(innerContext.collisions, onCollide);
        });
        // this.inst.onCollide = function (e) {
        //     console.log(e);
        // };
        // this.inst.afterStep = function () {
        //     console.log(99);
        // };
        // this.inst.registerBeforePhysicsStep(() => { console.log(123); });
    }
}
