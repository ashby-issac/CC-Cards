import { _decorator, Component, Node, UITransform, Layout } from 'cc';
import { CardManager } from './CardManager';
const { ccclass, property } = _decorator;

@ccclass('GridManager')
export class GridManager extends Component 
{
    @property({type: Number})
    m_Rows: number = 4;
    @property({type: Number})
    m_Cols: number = 4;

    @property({type: Node})
    m_StartPoint: Node = null;

    @property({type: CardManager})
    m_CardManager: CardManager = null;

    start() 
    {
        console.log("finding card prefab root");
        
        this.m_CardManager.m_CardPanel.setPosition(this.m_StartPoint.getPosition());
        console.log("startPoint position: " + this.m_StartPoint.getPosition());
        console.log("cardPanel position: " + this.m_CardManager.m_CardPanel.getPosition());

        this.m_CardManager.fn_Init(this.m_Rows, this.m_Cols);
        this.fn_AdjustCardPanelsWidthHeight();
        this.m_CardManager.fn_CreateCardsAndSetData(this.m_Rows, this.m_Cols);
    }
    
    private fn_AdjustCardPanelsWidthHeight() 
    {
        if (!this.m_CardManager.m_CardPrefab) return;
        
        let uiTrans = this.m_CardManager.m_CardPrefab.data.getComponent(UITransform);
        let cardPanelUILayout = this.m_CardManager.m_CardPanel.getComponent(Layout);
        let cardPanelUITrans = this.m_CardManager.m_CardPanel.getComponent(UITransform);
        
        console.log("Adjust card panels width height: uiTrans");
        console.log("uiTrans " + uiTrans != null);
        console.log("uiLayout" + cardPanelUILayout != null);

        if (uiTrans != null && cardPanelUILayout != null)
        {
            let panelXLength = (this.m_Rows * uiTrans.width) + (cardPanelUILayout.paddingLeft + cardPanelUILayout.paddingRight) 
                                    + ((this.m_Rows - 1) * cardPanelUILayout.spacingX);
            let panelYLength = (this.m_Cols * uiTrans.height) + (cardPanelUILayout.paddingTop + cardPanelUILayout.paddingBottom) 
                                    + ((this.m_Cols - 1) * cardPanelUILayout.spacingY);

            cardPanelUITrans.width = panelXLength;
            cardPanelUITrans.height = panelYLength;

            console.log("panelXLength: " + panelXLength);
            console.log("panelYLength: " + panelYLength);
        }
    }
}

