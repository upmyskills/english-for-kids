class BaseComponent {
  component: HTMLElement;

  constructor(
    private tag: keyof HTMLElementTagNameMap = 'div',
    private styles: Array<string> = [],
  ) {
    this.component = document.createElement(this.tag);
    this.component.classList.add(...styles);
  }

  getTemplate(): HTMLElement {
    return this.component;
  }

  insertComponent(component: BaseComponent): void {
    this.component.appendChild(component.component);
  }

  clear(): void {
    while (this.component.firstChild) this.component.firstChild.remove();
  }

  remove(): void {
    this.component.remove();
  }
}

export { BaseComponent };
