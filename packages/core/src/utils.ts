import { RendererNode, createApp } from 'vue';

/**
 *  Parse JSX to document
 * @param jsxElement
 * @param scopedId
 * @returns
 */
// @ts-ignore
export const parseJSXToDocument = (jsxElement: JSX.Element, scopedId?: string) => {
  const app = createApp({
    render() {
      return jsxElement;
    },
  });

  const div = document.createElement('div');

  div.firstElementChild?.childNodes.forEach((child) => {
    (child as HTMLElement)?.setAttribute(`${scopedId || ''}`, '');
    if (child.childNodes.length > 0) {
      // @ts-ignore
      parseJSXToDocument(child as unknown as JSX.Element, scopedId);
    }
  });
  app.mount(div);

  return div.firstChild;
};

/**
 * Parse renderer node to document
 * @param rendererNode
 * @returns
 */
export const parseRendererNodeToDocument = (rendererNode: RendererNode) => {
  if (!rendererNode) {
    return undefined;
  }
  const app = createApp(rendererNode);
  const div = document.createElement('div');
  app.mount(div);
  return div.firstChild;
};

/**
 * Sleep for a certain amount of time
 * @param ms The amount of time to sleep
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
