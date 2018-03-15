/**
 * @author dadigua
 */

import PGL, { Sphere, render, Scene, Ground, h, Enity, HemisphericLight } from '../src/index';



var canvas = document.getElementById('root');

class Root extends Enity<any>{
    constructor(props, scene, context) {
        super(props, scene, context)
        this.next(() => {
            this.groud.inst.position.x = 2;
            window['node']=this;
            console.log(this)
        })
    }
    update() {
        // console.log(123);
    }
    groud: Ground;
    create() {
        return [
            <Sphere position={[1, 2, 3]} name='123' segments={16} diameter={2} />,
            <Ground position={[1, 0, 0]} name='1' width={10} height={10} subdivisions={1} ref={(x) => { this.groud = x; }} />
        ]
    }
}
render(<Scene>
    <HemisphericLight name='2' position={[0, 1, 0]} />
    <Root />
</Scene>, canvas);