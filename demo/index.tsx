/**
 * @author dadigua
 */

import PGL, { Sphere, render, Scene, Ground, h, Enity, HemisphericLight, FreeCamera,util } from '../src/index';



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
    @util.setTimeout(200)
    update() {
        // console.log(123);
        this.inst.rotation.y += 0.01;
    }
    groud: Ground;
    create() {
        return [
            <Sphere position={[1, 0, 3]} scaling={[1, 2, 1]} segments={16} diameter={2} />,
            <Ground width={10} height={10} subdivisions={2} ref={(x) => { this.groud = x; }} />
        ]
    }
}
render(<Scene>
    <HemisphericLight position={[0, 1, 0]} />
    <FreeCamera position={[0, 5, -10]} target={[0, 0, 0]} />
    <Root />
    {/* <Enity>
        <Sphere position={[1, 0, 3]} scaling={[1, 2, 1]} segments={16} diameter={2} />
        <Ground width={10} height={10} subdivisions={2} ref={(x) => { this.groud = x; }} />
    </Enity> */}
</Scene>, canvas, { debugger: false });