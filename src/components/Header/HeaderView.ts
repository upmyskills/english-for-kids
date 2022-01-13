import { appState } from '../../core/appState';
import { switchMenu } from '../../core/services';
import { BaseComponent } from '../../shared/components/BaseComponent';
import { Switch } from '../Switch/Switch';
import './header.scss';

class Header extends BaseComponent {
  menuButton = new BaseComponent('label', ['menu__btn']);

  constructor() {
    super('div', ['header-container']);
    const switchButton = new Switch();
    const lines = new BaseComponent('div', ['menu__line']);
    const menuClassList = this.menuButton.component.classList;

    const menuAppearence = () => {
      if (appState.getMenuState()) menuClassList.add('checked');
      else menuClassList.remove('checked');
    };

    this.insertComponent(this.menuButton);
    this.menuButton.insertComponent(lines);
    switchButton.render(this.component);

    this.menuButton.component.addEventListener('click', () => {
      appState.getStore().dispatch(switchMenu());
    });

    appState.getStore().subscribe(menuAppearence.bind(this));
  }
}

export { Header };
