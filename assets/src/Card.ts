import { _decorator, Component, Node } from 'cc';
import { CardRotator } from './CardRotator';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    
    private cardRotator: CardRotator | null = null;

    start() 
    {
        this.cardRotator = this.getComponent(CardRotator);

        if (this.cardRotator)
            console.log("Found card rotator");
        else 
            console.log("Card rotator not found");
    }

    update(deltaTime: number) 
    {

    }

    public m_flipCard() 
    {
        console.log("Card flipped!");

        this.cardRotator.m_TriggerRotation();
        // onClick -> Flip the card (CardRotator.ts -> for flipping and unflipping the card)
    }
}

