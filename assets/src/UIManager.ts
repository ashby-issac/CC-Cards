import { _decorator, Component, Label, Node } from 'cc';
import { Manager } from './Manager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Manager
{
    @property({type: Node})
    public m_StartMenuPanel: Node;

    @property({type: Node})
    public m_GameOverPanel: Node;
    
    @property({type: Label})
    public m_MatchesLabel: Label;

    @property({type: Label})
    public m_TurnsLabel: Label;

    public fn_Init() 
    {
        this.fn_UpdateMatchesLabel(0);
        this.fn_UpdateTurnsLabel(0);

        this.fn_SetStartPanelState(false);
        this.fn_SetGameOverPanelState(false);
    }

    public fn_UpdateMatchesLabel(matchesCount: number)
    {
        this.m_MatchesLabel.string = "MATCHES: " + matchesCount;
    }

    public fn_UpdateTurnsLabel(turnsCount: number)
    {
        this.m_TurnsLabel.string = "TURNS: " + turnsCount;
    }

    public fn_SetStartPanelState(state: boolean)
    {
        this.m_StartMenuPanel.active = state;
    }

    public fn_SetGameOverPanelState(state: boolean)
    {
        this.m_GameOverPanel.active = state;
    }
}

