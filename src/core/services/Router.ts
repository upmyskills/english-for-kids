import { Statistic } from '../../components/Statistic';
import { Header } from '../../components/Header';
import { MainContainer } from '../../components/MainContainer';
import { Footer } from '../../components/Footer/Footer';

class Router {
  headerContainer = new Header();
  mainContainer = new MainContainer();
  statistic = new Statistic();
  basePath = window.location.origin;
  footer = new Footer();
  routes = [
    {
      path: '',
      page: (element: HTMLElement): void => {
        element.appendChild(this.headerContainer.component);
        element.appendChild(this.mainContainer.component);
        element.after(this.footer.component);
      }
    },
    {
      path: 'statistic',
      page: (element: HTMLElement): void => {
        element.appendChild(this.headerContainer.component);
        element.appendChild(this.mainContainer.menuComponent.asideMenu.component);
        element.appendChild(this.statistic.statisticView.component);
        this.statistic.update();
        element.after(this.footer.component);
      }
    },
  ];

  constructor(private rootElement: HTMLElement) {
  }

  checkRoute(): void {
    while (this.rootElement.firstChild) this.rootElement.firstChild.remove();
    const path = window.location.hash.substr(1).replace(/\//ig, '/');
    for (let i = 0; i < this.routes.length; i++) {
      if (this.routes[i].path === path) this.routes[i].page.call(this, this.rootElement);
    }
  }

  pushState(pathname: string): void {
    window.history.pushState(
      this,
      pathname,
      [this.basePath, pathname].join('/')
    );
  }
}

export { Router };
