import { _decorator, ccenum, Component, Node, Color, Sprite, CCInteger, Enum, cclegacy } from 'cc';
import { CardRotator } from './CardRotator';
import { CardManager, CardTypes } from './CardManager';
import { MILLI_SEC } from './GridManager';
const { ccclass, property } = _decorator;


@ccclass('Card')
export class Card extends Component 
{    
    @property({type: Sprite})
    public sprite: Sprite;

    @property({type: Number})
    public cardFlipInterval: number;

    public m_CardRotator: CardRotator | null = null;
    private m_CardManager: CardManager = null;

    public m_PosX: number;
    public m_PosY: number;

    public m_CardType: CardTypes;
    public m_Color: Color;

    fn_Init(cardType: CardTypes, color: Color, cardManager: CardManager)
    {
        this.m_CardType = cardType;
        this.m_Color = color;

        this.sprite.color = color;

        // getcomp for cardrot
        let cardRotator = this.node.getComponent(CardRotator);
        cardRotator.fn_displayCard(false); // by default all cards should be hidden
        this.m_CardManager = cardManager;
    }

    start() 
    {
        if (!this.m_CardRotator)
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
        if (this.m_CardRotator.front.active)
            return;

        this.m_CardManager.fn_InitSelectedCard(this);
    }

    public fn_flipAllCards()
    {
        if (!this.m_CardRotator)
            this.m_CardRotator = this.getComponent(CardRotator);

        this.m_CardRotator.fn_TriggerRotation(true);
        setTimeout(() => {
            this.m_CardRotator.fn_TriggerRotation(false);
        }, MILLI_SEC * this.cardFlipInterval);
    }

    public fn_OnMatchFound()
    {
        this.sprite.enabled = false;
    }
}

