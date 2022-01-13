import { switchMenu } from '../../core/services';
import { appState } from '../../core/appState';
import { BaseComponent } from '../../shared/components/BaseComponent';

class AsideMenuView extends BaseComponent {
  closeButton = new BaseComponent('div', ['menu__close']);

  constructor() {
    super('aside', ['side-bar', 'hide']);
    this.insertComponent(this.closeButton);
    this.closeButton.component.append('X');

    this.closeButton.component.addEventListener('click', () => {
      appState.getStore().dispatch(switchMenu());
    });
  }
}

export { AsideMenuView };
