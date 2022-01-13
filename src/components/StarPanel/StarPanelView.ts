import { BaseComponent } from '../../shared/components/BaseComponent';
import './starpanel.scss';

class StarPanelView extends BaseComponent {
  area = new BaseComponent('div', ['star-panel__area']);

  constructor() {
    super('div', ['star-panel']);

    this.insertComponent(this.area);
  }
}

export { StarPanelView };
