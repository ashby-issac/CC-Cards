import { _decorator, Component, Node, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CardRotator')
export class CardRotator extends Component 
{
    public m_RotMaxTime: number = 1;
    public m_CanRotate: boolean = false;
    public m_RotSpeed: number = 2;
    
    private m_RotTimer: number = 0;
    private m_XScale: number = 0;

    start()
    {
        this.m_XScale = this.node.getScale().x;
    }

    update(deltaTime: number) 
    {
        if (this.m_CanRotate)
        {
            if (this.m_RotTimer < this.m_RotMaxTime)
            {
                console.log("timer running");
                this.m_RotTimer += deltaTime * this.m_RotSpeed;

                let t = this.m_RotTimer / this.m_RotMaxTime;
                let scale = math.lerp(this.m_XScale, -this.m_XScale, t);
                
                this.node.setScale(scale, this.node.getScale().y);
            }
            else 
            {
                console.log("math.floor scale" + Math.floor(this.node.getScale().x));
                console.log("math.round scale" + Math.round(this.node.getScale().x));

                console.log("scale value: " + this.node.getScale());
                this.node.setScale(Math.round(this.node.getScale().x), this.node.getScale().y);
                console.log("after rounding scale: " + this.node.getScale());

                this.m_CanRotate = false;
                this.m_RotTimer = 0;
                this.m_XScale = this.node.getScale().x;
            }
        }
    }

    public m_TriggerRotation() 
    {
        console.log("Card flipped!");
        this.m_CanRotate = true;
    }
}
