/**
 * @author dadigua
 */

import PGL, { Sphere, render, Scene, Ground, h, Enity, HemisphericLight, FreeCamera } from '../src/index';



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
    update() {
        // console.log(123);
    }
    groud: Ground;
    create() {
        return [
            <Sphere position={[1, 0, 3]} scaling={[2, 1, 1]} segments={16} diameter={2} />,
            <Ground width={10} height={10} subdivisions={2} ref={(x) => { this.groud = x; }} />
        ]
    }
}
render(<Scene>
    <HemisphericLight  position={[0, 1, 0]} />
    <FreeCamera position={[0, 5, -10]}  target={[0,0,0]}/>
    <Root />
</Scene>, canvas, { debugger: false });