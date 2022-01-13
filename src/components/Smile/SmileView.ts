import { BaseComponent } from '../../shared/components/BaseComponent';

class SmileView extends BaseComponent {
  text = new BaseComponent('p', ['smile__text']);
  image = new BaseComponent('div', ['smile__image']);

  constructor() {
    super('div', ['smile']);

    this.insertComponent(this.image);
    this.insertComponent(this.text);
  }
}

export { SmileView };
