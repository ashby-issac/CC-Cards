import { _decorator, Component, Node, Prefab, instantiate, Color, math, sys, CachedArray, RecyclePool } from 'cc';
import { Card, CardType } from './Card';
const { ccclass, property } = _decorator;

@ccclass('CardData')
export class CardData 
{
    @property({type: CardType})
    public m_Type: CardType; // or use index according to the cardType

    @property({type: Color})
    public m_Color: Color;

    @property({type: Number})
    public m_Counter: number;
}

@ccclass('CardManager')
export class CardManager extends Component 
{
    @property({type: [CardData], serializable: true})
    public cardDatas: CardData[] = [];

    @property({type: Node})
    public m_CardPanel: Node;
    
    @property({type: Prefab})
    public m_CardPrefab: Prefab;
    
    private cards: Card[][];
    private cachedArray: CachedArray<CardData>;
    private cardsRecyclePool: RecyclePool<CardData>;

    private newArray: CardData[];

    private m_FirstSelectedCard: Card = null;
    private m_SecondSelectedCard: Card = null;
    
    private firstSpawnedCard: Node;

    private m_BlockInput: boolean;
    private cardDatasStr: string = 'cardDatas';

    fn_Init(m_Rows: number, m_Cols: number) 
    {
        this.newArray = new Array(this.cardDatas.length);
        // this.m_Rows = m_Rows;
        // this.m_Cols = m_Cols;

        // double check :: check to see if the saved data needs to be accessed again once the game is restarted
        sys.localStorage.setItem(this.cardDatasStr, JSON.stringify(this.cardDatas));

        this.cachedArray = new CachedArray(this.cardDatas.length);
        this.cardsRecyclePool = new RecyclePool(function () {
            return {
                m_Type: CardType.CT_BLACK,
                m_Color: Color.BLACK,
                m_Counter: 0
            };
          }, this.cardDatas.length);
          
        for (let index = 0; index < this.cardDatas.length; index++) 
        {
            this.cachedArray.array[index] = this.cardDatas[index];
            this.cardsRecyclePool.data[index] = this.cardDatas[index];
        }
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

        this.cards[selectedCard.m_PosX][selectedCard.m_PosY] = selectedCard; // just replacing, can be removed
        this.fn_CheckForMatch();
    }

    private fn_CheckForMatch() 
    {
        if (this.m_FirstSelectedCard.m_CardType === this.m_SecondSelectedCard.m_CardType)
        {
            // match found, remove/disable the cards
        }
        else 
        {
            // no match, flip the cards
        }
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
                    if (!this.firstSpawnedCard)
                        this.firstSpawnedCard = cardInst;

                    this.m_CardPanel.addChild(cardInst);
                    
                    let card = cardInst.getComponent(Card);
                    let cardData = this.fn_FindSpecificCardData();
                    card.fn_Init(cardData.m_Type, cardData.m_Color);

                    // double check position data after being set in start
                    // this.cards[card.m_PosX][card.m_PosY] = new Card();
                    this.cards[i][j] = card;
                }    
            }
        }
    }

    private fn_FindSpecificCardData()
    {
        let index = (Math.floor(Math.random() * this.cachedArray.array.length));
        let cardData = this.cachedArray.array[index];

        this.cachedArray.array[index].m_Counter++;
        console.log("cachedArray: counter: " + this.cachedArray.array[index].m_Counter);

        if (this.cachedArray.array[index].m_Counter === 2)
        {
            console.log("Remove element at index: " + index);
            // this.fn_RemoveAt(index);
            this.cachedArray.fastRemove(0);
            console.log("removed cachedArray.length: " + this.cachedArray.length);
            console.log("removed cachedArray.array.length: " + this.cachedArray.array.length);
        }

        return cardData;
    }
}

