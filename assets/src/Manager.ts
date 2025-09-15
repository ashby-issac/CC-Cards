import { _decorator, ccenum, Component, game, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

export enum MANAGER
{
    M_UI,
    M_GRID,
    M_CARD
}
ccenum(MANAGER);

@ccclass('Manager')
export class Manager extends Component 
{
    @property({type: MANAGER})
    public m_ManagerID: MANAGER;

    protected m_GameManager: GameManager;

    public fn_InitManager(gameManager: GameManager)
    {
        this.m_GameManager = gameManager;
    }
}


