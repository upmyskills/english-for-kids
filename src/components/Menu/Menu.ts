import { IMenuItemsResponse } from '../../core/models/IMenuItemsResponse';
import { AsideMenuView } from './AsideMenuView';
import { CardMenuView } from './CardMenuView';
import { appState } from '../../core/appState';
import { IMenuItem } from '../../core/models';
import { BaseComponent } from '../../shared/components/BaseComponent';
import { dropCards, followMenu, loadCards, switchMenu } from '../../core/services';
import { AsideMenuItem } from './AsideMenuItem';
import './mainmenu.scss';

class Menu {
  loading = false;
  menuItems: Array<IMenuItem> = [];
  asideMenu = new AsideMenuView();
  cardMenuContainer = new BaseComponent(undefined, ['menu']);

  constructor() {
    this.getMenuItems().then(() => {
      this.render();
    });
    appState.getStore().subscribe(this.update.bind(this));
    appState.getStore().subscribe(this.createAsideMenu.bind(this));
  }

  async getMenuItems(): Promise<void> {
    this.menuItems = [];
    const response: Response = await fetch('./pseudoserver/menu.json');
    const data: IMenuItemsResponse = await response.json();

    this.menuItems = data.menuItems.map((item) => {
      const firstCategoryImage = item.cards[0];
      const obj = {
        title: item.linkName,
        menu: new CardMenuView(item.linkName, firstCategoryImage).component,
        cards: item.cards
      };

      return obj;
    });
  }

  update(): void {
    const isPlayMode = appState.getAppMode();
    if (isPlayMode) this.menuItems.map((item) => item.menu.classList.add('train'));
    if (!isPlayMode) this.menuItems.map((item) => item.menu.classList.remove('train'));
  }

  async render(): Promise<void> {
    await this.getMenuItems();
    this.createAsideMenu();
    this.createMainMenu();
    this.update();
  }

  createMainMenu(): void {
    this.cardMenuContainer.clear();
    this.menuItems.forEach((item) => {
      this.cardMenuContainer.component.appendChild(item.menu);
      item.menu.addEventListener('click', () => {
        appState.getStore().dispatch(followMenu(item.title));
        appState.getMainContainerStore().dispatch(loadCards(item.cards));
      });
    });
  }

  createAsideMenu(): void {
    this.asideMenu.clear();
    const store = appState.getStore();
    const activeLink: string = appState.getActiveLink();
    let menuComponents: Array<BaseComponent> = [];

    this.asideMenu.insertComponent(this.asideMenu.closeButton);

    const linkToMain = new BaseComponent('a', ['aside__link']);
    linkToMain.component.append('main menu');
    linkToMain.component.setAttribute('href', '#');
    linkToMain.component.addEventListener('click', () => {
      appState.getMainContainerStore().dispatch(dropCards());
      appState.getStore().dispatch(followMenu(linkToMain.component.innerText.toLowerCase()));
      setTimeout(() => appState.getStore().dispatch(switchMenu()), 10);
    });
    // this.asideMenu.insertComponent(linkToMain);
    menuComponents = [...menuComponents, linkToMain];

    store.subscribe(this.menuSwircher.bind(this, this.asideMenu));

    this.menuItems.forEach((item) => {
      const asideItem = new AsideMenuItem(item);
      // this.asideMenu.insertComponent(asideItem);
      asideItem.component.addEventListener('click', () => {
        appState.getMainContainerStore().dispatch(loadCards(item.cards));
        setTimeout(() => appState.getStore().dispatch(switchMenu()), 0);
        appState.getStore().dispatch(followMenu(item.title));
      });
      menuComponents = [...menuComponents, asideItem];
    });

    menuComponents = [...menuComponents, this.createStatisticLink()];

    menuComponents.forEach((item) => {
      this.asideMenu.insertComponent(item);
      if (item.component.innerText.toLowerCase() === activeLink.toLowerCase()) {
        item.component.classList.add('active-point');
      }
    });

    this.asideMenu.component.addEventListener('mouseleave', () => {
      if (!this.asideMenu.component.classList.contains('hide')) store.dispatch(switchMenu());
    });
  }

  protected createStatisticLink(): BaseComponent {
    const link = new BaseComponent('a', ['aside__link']);
    link.component.append('statistic');
    link.component.setAttribute('href', '#statistic');

    link.component.addEventListener('click', () => {
      appState.getMainContainerStore().dispatch(dropCards());
      setTimeout(() => appState.getStore().dispatch(switchMenu()), 0);
      appState.getStore().dispatch(followMenu(link.component.innerText));
    });

    return link;
  }

  menuSwircher(menu: BaseComponent): void {
    const isMenuOpen = appState.getMenuState();
    if (isMenuOpen) menu.component.classList.remove('hide');
    else menu.component.classList.add('hide');
  }
}

export { Menu };
