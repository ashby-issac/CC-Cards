import { _decorator, Component, Node, Prefab, instantiate, Color, sys, CachedArray, ccenum, CCInteger } from 'cc';
import { Card } from './Card';
import { MILLI_SEC } from './GridManager';
import { UIManager } from './UIManager';
import { GameManager } from './GameManager';
import { Manager } from './Manager';
const { ccclass, property } = _decorator;

export enum CardTypes
{
    CT_RED = 0, 
    CT_BLUE = 1, 
    CT_YELLOW = 2, 
    CT_GREEN = 3,
    CT_ORANGE = 4,
    CT_MAROON = 5,
    CT_LIGHTBLUE = 6,
    CT_VIOLET = 7
}
ccenum(CardTypes);

@ccclass('CardData')
export class CardData 
{
    @property({type: CardTypes})
    public m_Type: CardTypes;

    @property({type: Color})
    public m_Color: Color;
    
    @property({type: Number, serializable: false})
    m_Counter: number = 0;
}

@ccclass('CardManager')
export class CardManager extends Manager 
{
    // @property({type: GameManager})
    // public m_GameManager: GameManager;

    @property({type: UIManager})
    public  m_UIManager: UIManager;
    
    @property({type: [CardData]})
    public m_CardDatas: CardData[] = [];

    @property({type: Node})
    public m_CardPanel: Node;
    
    @property({type: Prefab})
    public m_CardPrefab: Prefab;

    @property({type: Number})
    public matchTimeInterval: number;
    
    private cards: Card[][];
    private cachedArray: CachedArray<CardData>;

    private m_FirstSelectedCard: Card = null;
    private m_SecondSelectedCard: Card = null;
    
    private m_BlockInput: boolean = true;
    private cardDatasStr: string = 'cardDatas';

    private m_Rows: number;
    private m_Cols: number;
    private m_PairsCounter: number;
    private m_TotalPairs: number;

    private m_MatchesCount: number = 0;
    private m_TurnsCount: number = 0;

    protected onEnable(): void {
        
    }

    fn_Init(m_Rows: number, m_Cols: number) 
    {
        this.m_Rows = m_Rows;
        this.m_Cols = m_Cols;

        this.m_TotalPairs = this.m_PairsCounter = (this.m_Rows * this.m_Cols) / 2;

        this.cachedArray = new CachedArray(this.m_PairsCounter);
        for (let index = 0; index < this.m_PairsCounter; index++)
            this.cachedArray.array[index] = this.m_CardDatas[index];
    }

    fn_InitSelectedCard(selectedCard: Card)
    {
        if (this.m_BlockInput)
        {       
            return;
        }

        if (!this.m_FirstSelectedCard)
        {
            this.m_FirstSelectedCard = selectedCard;
        }
        else if (!this.m_SecondSelectedCard)
        {
            this.m_SecondSelectedCard = selectedCard;
            this.m_BlockInput = true;
        }
            
        selectedCard.m_CardRotator.fn_TriggerRotation(true);
        this.cards[selectedCard.m_PosX][selectedCard.m_PosY] = selectedCard; // just replacing, can be removed
        if (this.m_FirstSelectedCard && this.m_SecondSelectedCard)
            this.fn_CheckForMatch();
    }

    private fn_CheckForMatch() 
    {
        this.m_TurnsCount++;
        if (this.m_FirstSelectedCard.m_CardType === this.m_SecondSelectedCard.m_CardType)
        {            
            setTimeout(() => {
                this.m_FirstSelectedCard.fn_OnMatchFound();
                this.m_SecondSelectedCard.fn_OnMatchFound();
                this.ResetInfo();
            }, MILLI_SEC * this.matchTimeInterval);
            
            this.m_MatchesCount++;
        }
        else 
        {
            setTimeout(() => {
                this.m_FirstSelectedCard.m_CardRotator.fn_TriggerRotation(false);
                this.m_SecondSelectedCard.m_CardRotator.fn_TriggerRotation(false);

                this.ResetInfo();
            }, MILLI_SEC * this.matchTimeInterval);
        }

        console.log("matchesCount: " + this.m_MatchesCount);
        if (this.m_MatchesCount == this.m_TotalPairs)
        {
            this.m_GameManager.fn_OnGameFinished();
        }

        this.fn_UpdateHUD();
    }

    private fn_UpdateHUD()
    {
        if (!this. m_UIManager) return;

        this. m_UIManager.fn_UpdateMatchesLabel(this.m_MatchesCount);
        this. m_UIManager.fn_UpdateTurnsLabel(this.m_TurnsCount);
    }

    private ResetInfo() {

        this.m_FirstSelectedCard = this.m_SecondSelectedCard = null;
        this.m_BlockInput = false;
    }

    public fn_CreateCardsAndSetData(rows: number, cols: number) 
    {
        this.m_CardPanel.removeAllChildren(); // removes all children from parent node
        this.cards = [];

        if (this.m_CardPrefab)
        {
            for (let i = 0; i < rows; i++)
            {
                this.cards[i] = [];
                for (let j = 0; j < cols; j++)
                {
                    let cardInst = instantiate(this.m_CardPrefab);
                    this.m_CardPanel.addChild(cardInst);
                    
                    let card = cardInst.getComponent(Card);
                    let cardData = this.fn_FindSpecificCardData();
                    card.fn_Init(cardData.m_Type, cardData.m_Color, this);

                    this.cards[i][j] = card;
                }    
            }
        }
    }

    public fn_ShowAllCardsFirstTime()
    {
        console.log("fn_ShowAllCardsFirstTime: " + this.m_Rows + " " + this.m_Cols);
        for (let i = 0; i < this.m_Rows; i++)
        {
            for (let j = 0; j < this.m_Cols; j++)
            {
                if (this.cards[i][j])
                {
                    this.cards[i][j].fn_flipAllCards();
                }
            }
        }

        setTimeout(() => {
            this.m_BlockInput = false;
        }, this.cards[0][0].cardFlipInterval * MILLI_SEC);
    }

    private fn_FindSpecificCardData()
    {
        let index = (Math.floor(Math.random() * this.m_PairsCounter));
        let cardData = this.cachedArray.array[index];

        this.cachedArray.array[index].m_Counter++;
        console.log("cachedArray counter: " + this.cachedArray.array[index].m_Counter);

        if (this.cachedArray.array[index].m_Counter === 2)
        {
            // this.fn_RemoveAt(index);
            this.cachedArray.array.splice(index, 1);
            this.m_PairsCounter--;
            console.log("spliced length: " + this.cachedArray.array.length);
        }

        return cardData;
    }
}

