import { IMenuItem } from '../../core/models/IMenuItem';
import { BaseComponent } from '../../shared/components/BaseComponent';

class AsideMenuItem extends BaseComponent {
  constructor(item: IMenuItem) {
    super('a', ['aside__link']);
    const linkTo = item.href || '#';
    this.component.append(item.title);
    this.component.setAttribute('href', linkTo);
  }
}

export { AsideMenuItem };
