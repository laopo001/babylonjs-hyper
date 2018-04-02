/**
 * @author dadigua
 */
import * as BABYLON from 'babylonjs';
import { Component } from '../../component';

export interface SceneProps {
    physics?: boolean;
    gravity?: number[];
}

export class Scene extends Component<SceneProps>  {
    inst: BABYLON.Scene;
    static defaultProps = {
        gravity: [0, -9.82, 0],
        physics: false
    };
    constructor(private engine: BABYLON.Engine, props, innerContext) {
        super(props, innerContext);
    }
    create() {
        let { props, engine, innerContext } = this;
        this.inst = new BABYLON.Scene(engine);
        if (props.physics) {
            innerContext.openPhysics = true;
            this.inst.enablePhysics(this.util.Nums3ToVector3(props.gravity), new BABYLON.CannonJSPlugin());
        }
    }
}