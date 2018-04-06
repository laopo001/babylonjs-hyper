/**
 * @author dadigua
 */

import PGL, {
    Sphere, render, Scene, Box, ArcRotateCamera, DirectionalLight, Ground,
    Enity, HemisphericLight, FreeCamera, Collision, StandardMaterial, Mesh,
    ReflectionTexture, Cylinder
} from '../src/index';
import { randomEnum, randomRange } from '../src/util';
import * as BABYLON from 'babylonjs';


const canvas = document.getElementById('root');

canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight - 5 + 'px';

class Root extends Enity<any> {
    constructor(props, scene, context) {
        super(props, scene, context);
        this.next(() => {
            console.log(this);
            window['node'] = this;
        });
    }
    direction = 'right';
    glass: ReflectionTexture;
    currBox: Mesh<any>;
    gamer: Mesh<any>;
    camera: ArcRotateCamera;
    boxCollideHander(self: any, collided: any) {
        if (PGL.getComponent(collided.object) instanceof Cylinder) {
            self.object.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
            let { x, y, z } = self.object.position;
            this.camera.setTarget([x, y, z]);
        }

    }
    add() {
        let r = randomEnum<number>(-1, 1);
        if (r > 0) {
            this.direction = 'right';
        } else {
            this.direction = 'left';
        }
        let { x, y, z } = this.currBox.inst.position;
        let len = randomRange(2, 8);
        x = x - len;
        z = z + r * len;
        this.append(
            <Box cast position={[x, y, z]} rotation={[0, Math.PI / 4, 0]} width={randomRange(2, 3.5)} height={1} depth={randomRange(2, 3.5)}>
                <Collision mass={10} restitution={0.3} onCollide={this.boxCollideHander.bind(this)} />
            </Box>
        );
        this.glass.refresh();
    }

    init() {
        console.log('game start');
        setTimeout(() => {
            // 动态添加Box组件
            this.append(
                <Box cast position={[-5, 5, 5]} rotation={[0, Math.PI / 4, 0]} width={2} height={1} depth={2}>
                    <Collision mass={10} restitution={0.3} onCollide={this.boxCollideHander.bind(this)} />
                </Box>,
                <Cylinder cast diameterTop={0.3} position={[0, 5, 0]} >
                    <Collision angularFactor={[0, 1, 0]} type={BABYLON.PhysicsImpostor.CylinderImpostor} mass={10} friction={0} restitution={0.1} onCollide={(self: any, collided: any) => {
                        if (this.currBox === PGL.getComponent(collided.object)) return;
                        self.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
                        this.gamer = PGL.getComponent(self.object);
                        this.gamer.collision.linearFactor = new BABYLON.Vector3(0, 1, 0);
                        if (PGL.getComponent(collided.object) instanceof Box) {
                            if (this.currBox != null) {
                                this.currBox = PGL.getComponent(collided.object);
                                this.add();
                            } else {
                                this.currBox = PGL.getComponent(collided.object);
                            }
                        }
                        if (PGL.getComponent(collided.object) instanceof Ground) {
                            console.log('game over');
                            collided.object.position.y = -10000;
                        }
                    }} />
                </Cylinder>
            );
            // 刷新地面镜面缓存
            this.glass.refresh();
        }, 1000);
        let level = 0;
        let timer;
        canvas.addEventListener('mousedown', () => {
            this.gamer.collision.linearFactor = new BABYLON.Vector3(1, 1, 1);
            console.log('down');
            timer = setInterval(() => {
                let y = this.currBox.inst.scaling.y - 0.05;
                if (y >= 0.5) {
                    this.currBox.inst.scaling = new BABYLON.Vector3(1, y, 1); level++;
                }

            }, 100);
        });
        canvas.addEventListener('mouseup', () => {
            console.log('up', level);
            if (timer) {
                clearInterval(timer);
                this.gamer.collision.inst.setLinearVelocity(new BABYLON.Vector3(-1 * level / 2, level, (this.direction === 'right' ? 1 : -1) * level / 2));
                this.currBox.inst.scaling = new BABYLON.Vector3(1, 1, 1);
                level = 0;
            }
            timer = null;
        });

    }
    update() {
        // this.inst.rotation.y += 0.01;
    }
    create() {
        return [
            <ArcRotateCamera ref={x => { this.camera = x; }} target={[0, 0, 0]} radius={20} />,
            <Box name='cs' cast rotation={[0, Math.PI / 4, 0]} position={[0, 5, 0]} scaling={[1, 1, 1]} width={2} height={1} depth={2}>
                <Collision mass={10} restitution={0.3} onCollide={this.boxCollideHander.bind(this)} />
            </Box>,
            <Ground receiveShadows width={100} height={100} subdivisions={2} >
                <Collision mass={0} friction={1000} restitution={0.1} />
                <StandardMaterial >
                    <ReflectionTexture level={0.9} ref={(glass) => { this.glass = glass; }} />
                </StandardMaterial>
            </Ground>
        ];
    }
}
render(<Scene physics>
    <DirectionalLight position={[20, 40, 20]} target={[-1, -2, -1]} shadow />
    <Root />
</Scene>, canvas, { debugger: true });