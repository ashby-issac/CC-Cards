import { _decorator, ccenum, Component, Node, Color, Sprite } from 'cc';
import { CardRotator } from './CardRotator';
import { CardManager } from './CardManager';
const { ccclass, property } = _decorator;

export enum CardType
{
    CT_RED = 0, 
    CT_BLUE = 1, 
    CT_YELLOW = 2, 
    CT_GREEN = 3,
    CT_ORANGE = 4,
    CT_MAROON = 5,
    CT_LIGHTBLUE = 6,
    CT_BLACK = 7
}
ccenum(CardType);

@ccclass('Card')
export class Card extends Component 
{    
    @property({type: Sprite})
    public sprite: Sprite;

    private m_CardRotator: CardRotator | null = null;
    private m_CardManager: CardManager = null;

    public m_PosX: number;
    public m_PosY: number;

    public m_CardType: CardType;
    public m_Color: Color;

    fn_Init(cardType: CardType, color: Color)
    {
        this.m_CardType = cardType;
        this.m_Color = color;

        this.sprite.color = color;
    }

    start() 
    {
        this.m_CardRotator = this.getComponent(CardRotator);

        this.m_PosX = this.node.getPosition().x;
        this.m_PosY = this.node.getPosition().y;

        if (this.m_CardRotator)
            console.log("Found card rotator");
        else 
            console.log("Card rotator not found");
    }

    fn_flipCardOnSelection() 
    {
        console.log("Card flipped!");

        this.m_CardRotator.fn_TriggerRotation();
        this.m_CardManager.fn_InitSelectedCard(this);
        // onClick -> Flip the card (CardRotator.ts -> for flipping and unflipping the card)
    }
}

