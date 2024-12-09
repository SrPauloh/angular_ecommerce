declare const M: {
  Sidenav: {
    init(elems: NodeListOf<Element> | Element[]): void;
    getInstance(elem: Element | null): {
      close(): void;
    };
  };
};
