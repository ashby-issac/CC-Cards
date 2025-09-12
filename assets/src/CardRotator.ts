import { _decorator, Component, Node, math, Vec3, Quat, quat } from 'cc';
const { ccclass, property } = _decorator;

export const RAD_180 = 3.14159;

@ccclass('CardRotator')
export class CardRotator extends Component 
{
    public m_RotMaxTime: number = 0.5;
    public m_CanRotate: boolean = false;
    public m_RotSpeed: number = 2;
    
    private m_RotTimer: number = 0;
    private m_XScale: number = 0;

    @property(Node)
    front: Node;

    @property(Node)
    back: Node;

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
                this.m_RotTimer += deltaTime * this.m_RotSpeed;
                let t = this.m_RotTimer / this.m_RotMaxTime;
                
                if (t >= 0.5)
                {
                    this.displayCard(true);
                }

                let scale = math.lerp(this.m_XScale, -this.m_XScale, t);
                this.node.setScale(scale, this.node.getScale().y);
            }
            else 
            {
                this.node.setScale(Math.round(this.node.getScale().x), this.node.getScale().y);

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

    displayCard(showCard: boolean) 
    {
        this.front.active = showCard;
        this.back.active = !showCard;
    }
}

