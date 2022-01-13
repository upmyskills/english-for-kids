import { appState } from '../../core/appState';
import { loadDefault, switchMode } from '../../core/services/Actions';
import { SwitchView } from './SwitchView';

class Switch {
  private switchView = new SwitchView();

  constructor() {
    appState.getStore().subscribe(this.update.bind(this));

    this.switchView.component.addEventListener('click', this.dispatch.bind(this));
  }

  dispatch(event: Event): void {
    if (event.target === this.switchView.checkbox.component) {
      appState.getStore().dispatch(switchMode());
    }
  }

  update(): void {
    const isTrainMode = appState.getAppMode();
    const isGameRunning = appState.getGameStatus();
    const mode = isTrainMode ? 'train' : 'play';

    if (isTrainMode) this.switchView.slider.component.classList.add('train');
    else this.switchView.slider.component.classList.remove('train');
    this.switchView.text.component.textContent = mode;

    if (isGameRunning) {
      appState.getStore().dispatch(loadDefault());
    }
  }

  render(rootComponent: HTMLElement): void {
    this.update();
    rootComponent.appendChild(this.switchView.getTemplate());
  }
}

export { Switch };
