import { _decorator, Component, Node, UITransform, Layout } from 'cc';
import { CardManager } from './CardManager';
import { Manager } from './Manager';
const { ccclass, property } = _decorator;

export const MILLI_SEC = 1000;

@ccclass('GridManager')
export class GridManager extends Manager 
{
    @property({type: CardManager})
    m_CardManager: CardManager = null;

    @property({type: Number})
    m_Rows: number = 4;
    @property({type: Number})
    m_Cols: number = 4;

    @property({type: Node})
    m_StartPoint: Node = null;

    @property({type: Number})
    m_displayDelay: number;

    public fn_Init()
    {
        this.m_CardManager.m_CardPanel.setPosition(this.m_StartPoint.getPosition());
    
        this.m_CardManager.fn_Init(this.m_Rows, this.m_Cols);
        this.fn_AdjustCardPanelsWidthHeight();
        this.m_CardManager.fn_CreateCardsAndSetData(this.m_Rows, this.m_Cols);
        setTimeout(() => {
            this.m_CardManager.fn_ShowAllCardsFirstTime();
        }, MILLI_SEC * this.m_displayDelay);
    }

    start() 
    {
    }
    
    private fn_AdjustCardPanelsWidthHeight() 
    {
        if (!this.m_CardManager.m_CardPrefab) return;
        
        let uiTrans = this.m_CardManager.m_CardPrefab.data.getComponent(UITransform);
        let cardPanelUILayout = this.m_CardManager.m_CardPanel.getComponent(Layout);
        let cardPanelUITrans = this.m_CardManager.m_CardPanel.getComponent(UITransform);
        
        if (uiTrans != null && cardPanelUILayout != null)
        {
            let panelXLength = (this.m_Cols * uiTrans.width) + (cardPanelUILayout.paddingLeft + cardPanelUILayout.paddingRight) 
                                    + ((this.m_Cols - 1) * cardPanelUILayout.spacingX);
            let panelYLength = (this.m_Rows * uiTrans.height) + (cardPanelUILayout.paddingTop + cardPanelUILayout.paddingBottom) 
                                    + ((this.m_Rows - 1) * cardPanelUILayout.spacingY);

            cardPanelUITrans.width = panelXLength;
            cardPanelUITrans.height = panelYLength;
        }
    }
}

