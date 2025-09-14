import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Manager')
export class Manager extends Component 
{
    @property({type: [Node], serializable: true})
    public nodes: Node[] = [];

    start() 
    {

    }

    update(deltaTime: number) 
    {
        
    }
}


