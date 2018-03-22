/**
 * @author dadigua
 */

import PGL, { Sphere, render, Scene, Ground, h, Enity, HemisphericLight, FreeCamera, util, Collision } from '../src/index';
import * as BABYLON from 'babylonjs'


var canvas = document.getElementById('root');

class Root extends Enity<any>{
    constructor(props, scene, context) {
        super(props, scene, context)
        this.next(() => {
            // this.groud.inst.position.x = 2;
            window['node'] = this;
            console.log(this)
        })
    }
    @util.setTimeout(30)
    update() {
        // console.log(123);
        this.inst.rotation.y += 0.01;
    }
    groud: Ground;
    create() {
        return [
            <Sphere position={[1, 9, 3]} scaling={[1, 1, 1]} segments={16} diameter={2}>
                <Collision type={BABYLON.PhysicsImpostor.SphereImpostor} mass={1} restitution={0.5} onCollide={(self:any, collided) => {
                    // 监听碰撞
                    self.object.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
                }}></Collision>
            </Sphere>,
            <Ground width={10} height={10} subdivisions={2} ref={(x) => { this.groud = x; }}>
                <Collision mass={0} restitution={0.9}></Collision>
            </Ground>
        ]
    }
}
render(<Scene physics>
    <HemisphericLight position={[0, 1, 0]} />
    <FreeCamera position={[0, 5, -10]} target={[0, 0, 0]} />
    <Root />
    {/* <Enity>
        <Sphere position={[1, 0, 3]} scaling={[1, 2, 1]} segments={16} diameter={2} />
        <Ground width={10} height={10} subdivisions={2} ref={(x) => { this.groud = x; }} />
    </Enity> */}
</Scene>, canvas, { debugger: true });