/**
 * @author dadigua
 */

import PGL, { Sphere, render, Scene, h } from '../src/index';



var canvas = document.getElementById('root');



render(<Scene >
    <Sphere name='11' segments={16}  diameter={2}  ref={(x) => { console.log(x.inst) }}/>
</Scene>, canvas);