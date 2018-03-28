/**
 * @author dadigua
 */

import PGL, { Sphere, render, Scene, ArcRotateCamera, DirectionalLight, Ground, h, Enity, HemisphericLight, FreeCamera, util, Collision, StandardMaterial, ReflectionTexture } from '../src/index';
import * as BABYLON from 'babylonjs';


let canvas = document.getElementById('root');

canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight - 5 + 'px';

class Root extends Enity<any> {
    constructor(props, scene, context) {
        super(props, scene, context);
        this.next(() => {
            // this.groud.inst.position.x = 2;
            window['node'] = this;
            console.log(this);
        });
    }
    xxx;
    update() {
        // console.log(123);
        this.inst.rotation.y += 0.01;
    }
    groud: Ground;
    create() {
        return [
            <Sphere cast position={[1, 9, 3]} scaling={[1, 1, 1]} segments={16} diameter={2}>
                <Collision type={BABYLON.PhysicsImpostor.SphereImpostor} mass={1} restitution={0.3} onCollide={(self: any, collided) => {
                    // 监听碰撞
                    self.object.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());

                }} />
            </Sphere>,
            <Ground receiveShadows width={10} height={10} subdivisions={2} ref={(x) => { this.groud = x; }}>
                <Collision mass={0} restitution={0.3} />
                <StandardMaterial >
                    <ReflectionTexture level={1} />
                </StandardMaterial>
            </Ground>
        ];
    }
}

render(<Scene physics>
    {/* <HemisphericLight position={[0, 10, -5]} /> */}
    {/* <FreeCamera position={[0, 6, -5]} target={[0, 0, 0]} /> */}
    <DirectionalLight position={[20, 40, 20]} target={[-1, -2, -1]} shadow />
    <ArcRotateCamera target={[0, 0, 0]} radius={30}/>
    <Root />
</Scene>, canvas, { debugger: false });