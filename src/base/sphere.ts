import { Scene, Component } from '../index';
interface abc {

}

export class Sphere extends Component<abc> {
    inst: BABYLON.Mesh;
    constructor(name: string, segments: number, diameter: number, scene?: Scene, updatable?: boolean, sideOrientation?: number) {
        this.inst = BABYLON.Mesh.CreateSphere(name, segments, diameter, scene.inst, updatable, BABYLON.Mesh.FRONTSIDE);
    }
}