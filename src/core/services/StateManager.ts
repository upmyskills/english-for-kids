// eslint-disable-next-line import/no-extraneous-dependencies
import { createStore, AnyAction, Reducer, Store } from 'redux';
import { CardView } from '../../components/Card/CardView';
import { ICard } from '../models';
import * as actions from './ActionTypes';

interface IState {
  appMode: boolean,
  isMenuOpen: boolean,
  activeMenu: string
  currentCards?: Array<ICard>
}

interface IButtonState {
  isGameRunning: boolean,
}

interface IGameState {
  secretWord: ICard,
  secretWordSound: HTMLMediaElement,
  hiddenWords: Array<CardView>,
}

interface IGameResult {
  lastAnswer?: CardView,
  answers: Array<boolean>,
  guessedWords: Array<CardView>
}

interface IGameEndState {
  isGameEnded: boolean,
  wrong: number
}

let instance: StateManager;

class StateManager {
  private store: Store;
  private mainContainerStore: Store;
  private gameButtonStore: Store;
  private gameStore: Store;
  private gameResultStore: Store;
  private gameEndStore: Store;

  private state: IState = {
    appMode: true,
    isMenuOpen: false,
    activeMenu: 'main menu',
  };
  private mainContainerState = {
    currentCards: [],
  };
  private gameButtonState: IButtonState = {
    isGameRunning: false,
  };
  private gameState: IGameState = {
    secretWord: { word: '', translation: '', image: '', audioSrc: '' },
    secretWordSound: new Audio(),
    hiddenWords: []
  };
  private gameResultState: IGameResult = {
    guessedWords: [],
    answers: [],
  };
  private gameEndState: IGameEndState = {
    isGameEnded: false,
    wrong: 0
  };

  constructor() {
    if (!instance) instance = this;

    const applicationState: Reducer = (
      state = this.state,
      action: AnyAction
    ) => {
      switch (action.type) {
        case actions.SWITCH_MODE: {
          this.state = {
            ...this.state,
            appMode: !this.state.appMode,
          };
          return this.state;
        }
        case actions.SWITCH_MENU: {
          this.state = {
            ...this.state,
            isMenuOpen: !this.state.isMenuOpen
          };
          return this.state;
        }
        case actions.FOLLOW_MENU: {
          this.state = {
            ...this.state,
            activeMenu: action.menuItem
          };
          return this.state;
        }
        case actions.LOAD_DEFAULT: {
          this.loadDefaultState();
          return this.state;
        }
        default: {
          return state;
        }
      }
    };

    const mainContainerState: Reducer = (
      state = this.mainContainerState,
      action: AnyAction,
    ) => {
      switch (action.type) {
        case actions.LOAD_CARDS: {
          const currentCards = action.cardsItems;
          this.mainContainerState = {
            ...this.mainContainerState,
            currentCards
          };
          return this.mainContainerState;
        }
        case actions.DROP_CARDS: {
          this.mainContainerState = {
            ...this.mainContainerState,
            currentCards: []
          };
          return this.mainContainerState;
        }
        default: {
          return state;
        }
      }
    };

    const gameButtonState: Reducer = (
      state = this.gameButtonState,
      action: AnyAction,
    ) => {
      switch (action.type) {
        case actions.CHANGE_GAME_STATUS: {
          this.gameButtonState = {
            ...this.gameButtonState,
            isGameRunning: !this.getGameStatus()
          };
          return this.gameButtonState;
        }
        default: {
          return state;
        }
      }
    };

    const gameState: Reducer = (
      state = this.gameState,
      action: AnyAction,
    ) => {
      switch (action.type) {
        case actions.SET_SECRET_WORD: {
          this.gameState = {
            ...this.gameState,
            secretWord: action.secret,
            secretWordSound: new Audio(action.secret.audioSrc)
          };
          return this.gameState;
        }
        case actions.SET_HIDDEN_CARDS: {
          this.gameState = {
            ...this.gameState,
            hiddenWords: action.hiddenWords
          };
          return this.gameState;
        }
        default: {
          return state;
        }
      }
    };

    const gameResultState: Reducer = (
      state = this.gameResultState,
      action: AnyAction
    ) => {
      switch (action.type) {
        case actions.TAKE_ANSWER: {
          const userAnswer = (action.answer as CardView).shortCardInfo.word;
          const isCorrect = userAnswer.toLowerCase() === this.getSecretWord();
          this.gameResultState = {
            ...this.gameResultState,
            answers: [...this.gameResultState.answers, isCorrect],
            lastAnswer: action.answer,
            guessedWords: isCorrect ? [...this.gameResultState.guessedWords, action.answer]
              : [...this.gameResultState.guessedWords],
          };
          return this.gameResultState;
        }
        default: {
          return state;
        }
      }
    };

    const gameEndState: Reducer = (
      state = this.gameEndState,
      action: AnyAction,
    ) => {
      switch (action.type) {
        case actions.SET_END_GAME: {
          this.gameEndState = {
            ...this.gameEndState,
            isGameEnded: !this.gameEndState.isGameEnded,
            wrong: action.wrong
          };
          return this.gameEndState;
        }
        default: {
          return state;
        }
      }
    };

    this.store = createStore(applicationState);
    this.mainContainerStore = createStore(mainContainerState);
    this.gameButtonStore = createStore(gameButtonState);
    this.gameStore = createStore(gameState);
    this.gameResultStore = createStore(gameResultState);
    this.gameEndStore = createStore(gameEndState);
    return instance;
  }

  loadDefaultState(): void {
    this.state = {
      ...this.state,
      isMenuOpen: false,
      currentCards: undefined
    };

    this.gameButtonState = {
      isGameRunning: false,
    };

    this.gameState = {
      ...this.gameState,
      secretWord: { word: '', translation: '', audioSrc: '', image: '' },
      secretWordSound: new Audio(),
    };

    this.gameResultState = {
      lastAnswer: undefined,
      answers: [],
      guessedWords: []
    };

    this.gameEndState = {
      isGameEnded: false,
      wrong: 0
    };
  }

  getCurrentCards(): Array<ICard> {
    return this.mainContainerState.currentCards;
  }

  getEndStore(): Store {
    return this.gameEndStore;
  }

  getStore(): Store {
    return this.store;
  }

  getMainContainerStore(): Store {
    return this.mainContainerStore;
  }

  getButtonStore(): Store {
    return this.gameButtonStore;
  }

  getGameStore(): Store {
    return this.gameStore;
  }

  getGameResultStore(): Store {
    return this.gameResultStore;
  }

  getAppMode(): boolean {
    return this.state.appMode;
  }

  getMenuState(): boolean {
    return this.state.isMenuOpen;
  }

  getActiveLink(): string {
    return this.state.activeMenu;
  }

  // ////////////
  // GAME STORE
  getGameStatus(): boolean {
    return this.gameButtonState.isGameRunning;
  }

  getSecretWord(): string {
    return this.gameState.secretWord.word.toLowerCase();
  }

  getGuessedWords(): Array<CardView> {
    return this.gameResultState.guessedWords;
  }

  getSecretWordSound(): HTMLMediaElement {
    return this.gameState.secretWordSound;
  }

  getHiddenWords(): Array<CardView> {
    return this.gameState.hiddenWords;
  }

  // ////   GAME RESULT STORE
  getAnswers(): Array<boolean> {
    return this.gameResultState.answers;
  }

  getLastAnswer(): CardView {
    return this.gameResultState.lastAnswer as CardView;
  }

  getWrongAnswers(): number {
    return this.gameEndState.wrong;
  }

  checkEndGame(): boolean {
    return this.gameEndState.isGameEnded;
  }
}

export { StateManager };
