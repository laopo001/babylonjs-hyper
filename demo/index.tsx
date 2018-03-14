/**
 * @author dadigua
 */

import PGL, { Sphere, render, Scene, Ground, h, Enity } from '../src/index';



var canvas = document.getElementById('root');

class Root extends Enity<any>{
    constructor(props, scene, context) {
        super(props, scene, context)
        this.next(() => {
            this.groud.inst.position.x = 2;
        })
    }
    update() {
        // console.log(123);
    }
    groud: Ground;
    create() {
        return <content>
            {this.props.children}
            <Ground name='1' width={10} height={10} subdivisions={1} ref={(x) => { this.groud = x; }} />
        </content>
    }
}


render(<Scene >
    <Root>
        <Sphere name='123' segments={16} diameter={2} />
    </Root>
</Scene>, canvas);