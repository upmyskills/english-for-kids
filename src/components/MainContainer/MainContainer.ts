import { GameServices } from '../../core/services';
import { appState } from '../../core/appState';
import { BaseComponent } from '../../shared/components/BaseComponent';
import { Card } from '../Card';
import { GameButton } from '../GameButton';
import { Menu } from '../Menu';
import { StarPanel } from '../StarPanel';
import { MainContainerView } from './MainContainerView';
import { Smile } from '../Smile';

class MainContainer {
  private container = new MainContainerView();
  component = this.container.component;
  cardComponent = new Card();
  menuComponent = new Menu();
  gameButtons = new GameButton();
  starPanel = new StarPanel();
  game = new GameServices();
  smile = new Smile();

  constructor() {
    appState.getMainContainerStore().subscribe(this.update.bind(this));
    appState.getButtonStore().subscribe(this.updateGameButton.bind(this));
    appState.getStore().subscribe(this.updateGameButton.bind(this));
    appState.getEndStore().subscribe(this.update.bind(this));

    appState.getButtonStore().subscribe(() => {
      const isGameRunning = appState.getGameStatus();
      if (isGameRunning) this.game.init();
    });

    this.update();
  }

  update(): void {
    if (appState.checkEndGame()) {
      this.showSmile();
      return;
    }
    this.container.clear();

    if (!appState.getCurrentCards().length) {
      this.container.insertComponent(this.menuComponent.cardMenuContainer);
    }

    this.container.insertComponent(this.menuComponent.asideMenu);
    this.container.insertComponent(this.starPanel.starPanelView);

    this.cardComponent.render(this.container);
  }

  updateGameButton(): void {
    const isMainMenu = appState.getActiveLink() === 'main menu';
    this.gameButtons.buttonStart.remove();
    this.gameButtons.buttonRepeat.remove();
    const button = !appState.getGameStatus() ? this.gameButtons.buttonStart : this.gameButtons.buttonRepeat;
    if (!isMainMenu && !appState.getAppMode()) this.container.component.after(button.component);
  }

  render(component: BaseComponent): void {
    this.update();
    this.container.insertComponent(component);
  }

  showSmile(): void {
    this.container.component.after(this.smile.smileView.component);
  }
}

export { MainContainer };
