import { _decorator, Component, Node, Prefab, instantiate, UITransform, Layout } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GridManager')
export class GridManager extends Component 
{
    @property({type: Number})
    rows: number = 4;
    @property({type: Number})
    cols: number = 4;

    @property({type: Node})
    cardPanel: Node; // create and set the panel

    @property({type: Prefab})
    cardPrefab: Prefab;

    @property({type: Node})
    startPoint: Node = null;

    start() 
    {
        console.log("finding card prefab root");
        
        this.cardPanel.setPosition(this.startPoint.getPosition());
        console.log("startPoint position: " + this.startPoint.getPosition());
        console.log("cardPanel position: " + this.cardPanel.getPosition());

        this.AdjustCardPanelsWidthHeight();
        this.m_CreateGrid(this.rows, this.cols);
    }
    
    private AdjustCardPanelsWidthHeight() 
    {
        let uiTrans = this.cardPrefab.data.getComponent(UITransform);
        let cardPanelUILayout = this.cardPanel.getComponent(Layout);
        let cardPanelUITrans = this.cardPanel.getComponent(UITransform);
        
        console.log("Adjust card panels width height: uiTrans");
        console.log("uiTrans " + uiTrans != null);
        console.log("uiLayout" + cardPanelUILayout != null);

        // if (uiTrans != null && uiLayout != null)
        // {
            let panelXLength = (this.rows * uiTrans.width) + (cardPanelUILayout.paddingLeft + cardPanelUILayout.paddingRight) + ((this.rows - 1) * cardPanelUILayout.spacingX);
            let panelYLength = (this.cols * uiTrans.height) + (cardPanelUILayout.paddingTop + cardPanelUILayout.paddingBottom) + ((this.cols - 1) * cardPanelUILayout.spacingY);
            
            // cardPanelUITrans.width(panelXLength);
            // cardPanelUITrans.height(panelYLength);

            console.log("panelXLength: " + panelXLength);
            console.log("panelYLength: " + panelYLength);
        // }
    }

    m_CreateGrid(rows: number, cols: number) 
    {
        this.cardPanel.removeAllChildren(); // removes all children from parent node
        // add disable logic if required

        for (let i = 0; i < rows; i++) 
        {
            for (let j = 0; j < cols; j++)
            {
                let card = instantiate(this.cardPrefab);
                this.cardPanel.addChild(card);
            }    
        }
    }
}

