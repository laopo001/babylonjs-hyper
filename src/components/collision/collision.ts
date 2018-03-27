/**
 * @author dadigua
 */
import { Component, ClassAttributes } from '../../index';
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
        friction: 0
    };
    type = 'Collision';
    inst: BABYLON.PhysicsImpostor;
    _clone: BABYLON.PhysicsImpostor;
    props: Readonly<CollisionProps> & Readonly<ClassAttributes<CollisionProps>>;
    constructor(props, innerContext, context) {
        super(props, innerContext, context);
    }
    dispose() {
        this.inst.dispose();
    }
    rebuild() {
        this.create();
    }
    create() {
        // this.props.registerOnPhysicsCollide
        let { props, innerContext } = this;
        let { mass, restitution, type, onCollide, friction } = props;
        let physiceEngine = innerContext.scene.getPhysicsEngine();
        this.inst = new BABYLON.PhysicsImpostor(this.parent.inst, type || BABYLON.PhysicsImpostor.BoxImpostor, { mass, restitution, friction }, innerContext.scene);
        // this.inst.forceUpdate()
        this.parent.inst.physicsImpostor = this.inst;

        innerContext.collisions.push(this.inst);
        onCollide && this.next(() => {
            this.inst.registerOnPhysicsCollide(innerContext.collisions, onCollide);
        });
        // this.inst.onCollide = function (e) {
        //     console.log(e);
        // };
        // this.inst.afterStep = function () {
        //     console.log(99);
        // };
    }
}
