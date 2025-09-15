import { _decorator, Component, Node } from 'cc';
import { UIManager } from './UIManager';
import { GridManager, MILLI_SEC } from './GridManager';
import { Manager, MANAGER } from './Manager';
const { ccclass, property } = _decorator;

export enum GAME_STATE
{
    GS_INIT,
    GS_INGAME,
    GS_FINISH
}

@ccclass('GameManager')
export class GameManager extends Component 
{
    // []
    @property({type: [Manager]})
    public m_Managers: Manager[];

    public m_ManagersMap: Map<MANAGER, Manager> = new Map();

    @property({type: UIManager})
    public m_UIManager: UIManager;

    @property({type: GridManager})
    public m_GridManager: GridManager;

    @property({type: GAME_STATE})
    public m_GameState: GAME_STATE = GAME_STATE.GS_INIT;

    start(): void 
    {
        this.m_GameState = GAME_STATE.GS_INIT;
        this.m_Managers.forEach(element => {
            this.m_ManagersMap.set(element.m_ManagerID, element);
        });
    }

    public fn_OnGameStart()
    {
        this.OnGameStateChange(GAME_STATE.GS_INGAME);
    }

    public fn_OnGameFinished()
    {
        this.OnGameStateChange(GAME_STATE.GS_FINISH);
    }
    
    private OnGameStateChange(gameState: GAME_STATE)
    {
        this.m_GameState = gameState;
        switch (this.m_GameState)
        {
            case GAME_STATE.GS_INIT:
                break;
            case GAME_STATE.GS_INGAME:
                this.m_ManagersMap[MANAGER.M_UI].fn_Init();
                this.m_ManagersMap[MANAGER.M_GRID].fn_Init();
                break;
            case GAME_STATE.GS_FINISH:
                this.m_ManagersMap[MANAGER.M_UI].fn_SetGameOverPanelState(true);
                break;
        }
    }
}

