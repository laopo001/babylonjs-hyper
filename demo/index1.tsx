/**
 * @author dadigua
 */

import PGL, {
    Sphere, render, Scene, Box, ArcRotateCamera, DirectionalLight, Ground,
    h, Enity, HemisphericLight, FreeCamera, util, Collision, StandardMaterial,
    ReflectionTexture, Cylinder, Mesh
} from '../src/index';
import * as BABYLON from 'babylonjs'


var canvas = document.getElementById('root');

canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight - 5 + 'px';

class Root extends Enity<any>{
    constructor(props, scene, context) {
        super(props, scene, context)
        this.next(() => {
            console.log(this)
            window['node'] = this;
        })
    }
    glass: ReflectionTexture;
    curr: Mesh<any>;
    gamer: Mesh<any>;
    boxCollideHander(self: any, collided: any) {
        if (PGL.getComponent(collided.object) instanceof Cylinder) {
            self.object.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        }
        // if (PGL.getComponent(collided.object) instanceof Ground) {
        //     self.mass = 10000;
        // }
    }
    init() {
        console.log('game start');
        setTimeout(() => {
            // 动态添加Box组件
            this.append(<Box cast position={[-5, 5, 0]} width={2} height={1} depth={2}>
                <Collision mass={10} restitution={0.3} onCollide={this.boxCollideHander} />
            </Box>,
                <Cylinder position={[0, 5, 0]} diameterTop={0.5}>
                    <Collision mass={10} restitution={0.01} onCollide={(self: any, collided: any) => {
                        self.mess = 0.1;
                        if (PGL.getComponent(collided.object) instanceof Box) {
                            this.curr = PGL.getComponent(collided.object);
                            this.gamer = PGL.getComponent(self.object);
                        }
                        if (PGL.getComponent(collided.object) instanceof Ground) {
                            console.log('game over');
                            collided.object.position.y=-10000
                        }
                    }} />
                </Cylinder>)
            // 刷新地面镜面缓存
            this.glass.refresh();

        }, 1000)
        let level = 0;
        let timer;
        canvas.addEventListener('mousedown', () => {
            console.log('down');
            timer = setInterval(() => {
                let y = this.curr.inst.scaling.y - 0.05;
                if (y >= 0.5) { this.curr.inst.scaling = new BABYLON.Vector3(1, y, 1); level++; }
            }, 100)
        });
        canvas.addEventListener('mouseup', () => {
            console.log('up', level);
            clearInterval(timer);

            this.gamer.children[0].inst.setLinearVelocity(new BABYLON.Vector3(-1 * level, 0, 0));
            this.curr.inst.scaling = new BABYLON.Vector3(1, 1, 1)
            level = 0

        });

    }
    update() {
        // this.inst.rotation.y += 0.01;
    }
    create() {
        return [
            <Box name='cs' cast position={[0, 5, 0]} scaling={[1, 1, 1]} width={2} height={1} depth={2}>
                <Collision mass={10} restitution={0.3} onCollide={this.boxCollideHander} />
            </Box>,
            <Ground receiveShadows width={100} height={100} subdivisions={2} >
                <Collision mass={0} restitution={0.1} />
                <StandardMaterial >
                    <ReflectionTexture level={0.9} ref={(glass) => { this.glass = glass; }} />
                </StandardMaterial>
            </Ground>
        ]
    }
}
render(<Scene physics>
    <DirectionalLight position={[20, 40, 20]} target={[-1, -2, -1]} shadow />
    <ArcRotateCamera target={[0, 0, 0]} radius={30} />
    <Root />
</Scene>, canvas, { debugger: false });