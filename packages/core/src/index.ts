import { CallbackQueue } from './CallbackQueue';
import { Callback, TPopTextOptions, TSetTextOptions, TTextOptions, TTypewriterOptions, RendererNode } from '../types/types';
import { parseJSXToDocument, parseRendererNodeToDocument, sleep } from './utils';

type TTypewritterReturnType = {
  wait: (ms: number) => TTypewritterReturnType;
  // @ts-ignore
  setText: (text: string | JSX.Element | RendererNode, options?: TSetTextOptions) => TTypewritterReturnType;
  popText: (length: number, options?: TPopTextOptions) => TTypewritterReturnType;
  setSpeed: (speed: number) => TTypewritterReturnType;
};

const TMediaTags = ['IMG', 'VIDEO', 'AUDIO'];

/**
 * A typewriter effect library that supports chain calling
 * @param instance The selector or the element to be displayed
 * @returns A Typewriter instance
 */
export class Typewriter {
  /**
   * The ref object that contains the text to be displayed
   */
  private _instance?: HTMLElement;

  /**
   * The global typing speed
   */
  private _speed: number = 100;

  /**
   * The callback queue
   */
  private _queue: CallbackQueue = new CallbackQueue();

  private _onTextAppend: Callback | null = null;

  /**
   * Create a new Typewriter instance
   * @param instance The selector or the element to be displayed
   */
  constructor(instance?: string | HTMLElement | null, options?: TTypewriterOptions) {
    if (!instance) {
      console.warn('[Typewritter]:You must provide an element or a selector to create a Typewriter instance.');
      return;
    }

    if (typeof instance === 'string') {
      const dom = document.querySelector(instance);
      if (!dom) {
        console.warn('[Typewritter]:The element is not found');
        return;
      }
      this._instance = dom as HTMLElement;
    } else {
      this._instance = instance;
    }

    if (options) {
      this._speed = options.speed || 100;
      this._queue.setOptions(options);
      this._onTextAppend = options.onTextAppend ?? null;
    }
  }

  /** =============================== Load Text ================================ */
  /**
   * Load text node and apply the options to the text node
   * @param text The text to be loaded
   * @param textClass The effect to be loaded
   * @returns The Typewriter instance
   */
  private _loadText(text: string, textOptions?: TTextOptions): HTMLSpanElement | string {
    if (textOptions) {
      // create a span element for each character
      const span = document.createElement('span');
      span.textContent = text;
      span.classList.add('typewritterItem', ...(textOptions.class || []));
      if (typeof textOptions.style === 'string') {
        span.setAttribute('style', textOptions.style);
      }
      if (typeof textOptions.style === 'object') {
        span.setAttribute('style', textOptions.style?.cssRules?.[0]?.cssText);
      }
      return span;
    } else {
      return text;
    }
  }

  /**
   * Load node and apply the options to the media node
   * @param node The media to be loaded
   * @param textClass The effect to be loaded
   */
  private _loadNode(node: HTMLElement, textOptions?: TTextOptions): HTMLElement {
    if (!TMediaTags.includes(node.tagName)) {
      node.textContent = '';
      return node;
    }
    node.classList.add('typewritterItem', ...(textOptions?.class || []));
    if (typeof textOptions?.style === 'string') {
      node.setAttribute('style', textOptions.style);
    }
    if (typeof textOptions?.style === 'object') {
      node.setAttribute('style', textOptions.style?.cssRules?.[0]?.cssText);
    }
    return node;
  }

  /** =============================== Set Text ================================ */
  /**
   * Parse HTML text
   * @param text
   * @returns
   */
  private async _setAndParseText(text: string | ChildNode, element: HTMLElement, options?: TSetTextOptions) {
    const parser = new DOMParser();
    const doc: {
      body: {
        childNodes: NodeListOf<ChildNode> | ChildNode[];
        textContent: string | null;
      };
    } = { body: { childNodes: [], textContent: '' } };

    if (typeof text === 'string') {
      const docTemp = parser.parseFromString(text, 'text/html');
      doc.body.childNodes = [...doc.body.childNodes, ...docTemp.body.childNodes];
    } else {
      (doc.body.childNodes as ChildNode[]).push(text);
    }

    // walk through all the child nodes, and append them to the element
    for (let index = 0; index < doc.body.childNodes.length; index++) {
      const node = doc.body.childNodes[index];

      // if the node is a text node, append the text to the element one by one, then wait for a while
      if (node.nodeType === Node.TEXT_NODE) {
        const nodeText = node.textContent || '';
        for (let index = 0; index < nodeText.length; index++) {
          const text = nodeText[index];
          // create a span element for each character
          const span = this._loadText(text, options?.textOptions);
          element.append(span);
          // call the onTextAppend callback
          this._onTextAppend && this._onTextAppend(text);
          await sleep(options?.speed ?? this._speed);
        }
      } else {
        // remember current element's text content
        const nodeText = node.textContent || '';
        // deal with node and apply the options to the media node
        const nodeItem = this._loadNode(node as HTMLElement, options?.textOptions);
        element.append(nodeItem);
        await this._setAndParseText(nodeText || '', nodeItem, options);
      }
    }

    return doc.body.textContent || '';
  }

  private async _setText(text: string | ChildNode, options?: TSetTextOptions): Promise<Typewriter> {
    return new Promise(async (resolve) => {
      if (!this._instance) {
        console.warn('[Typewriter]:The element is not found');
        return;
      }
      await this._setAndParseText(text, this._instance, options);

      await sleep(options?.speed ?? this._speed);
      resolve(this);
    });
  }
  /**
   * Set the text to be displayed
   * @param text The text to be displayed
   * @returns The Typewriter instance
   */
  // @ts-ignore
  setText(text: string | JSX.Element | RendererNode, options?: TSetTextOptions): TTypewritterReturnType {
    if ((text as RendererNode).render) {
      const element = parseRendererNodeToDocument(text as RendererNode);
      if (element) {
        this._queue.enqueue(this._setText.bind(this, element, options));
      }
      // @ts-ignore
    } else if ((text as JSX.Element).children) {
      // @ts-ignore
      const element = parseJSXToDocument(text as JSX.Element);
      if (element) {
        this._queue.enqueue(this._setText.bind(this, element, options));
      }
    } else {
      this._queue.enqueue(this._setText.bind(this, text as string, options));
    }

    return {
      wait: this.wait.bind(this),
      setText: this.setText.bind(this),
      popText: this.popText.bind(this),
      setSpeed: this.setSpeed.bind(this),
    };
  }

  /** =============================== PopText ================================ */
  private async _popAndParseText(length: number, element: HTMLElement, parent: HTMLElement, options?: TPopTextOptions) {
    for (let j = length; j > 0; j--) {
      const child = element.childNodes[element.childNodes.length - 1];

      if (!child) {
        if (parent.childNodes.length) {
          await this._popAndParseText(j, parent, parent, options);
        } else {
          continue;
        }
      }

      if (!child?.textContent) {
        child?.remove();
        continue;
      }

      if (child?.nodeType === Node.TEXT_NODE) {
        child.remove();
        await sleep(options?.speed ?? this._speed);
      } else if (child?.childNodes?.length > 0) {
        await this._popAndParseText(j, child as HTMLElement, element, options);
        if (!child?.childNodes?.length) {
          child.remove();
        }
        break;
      } else {
        await this._popAndParseText(j, parent, parent, options);
      }
    }
  }
  private async _popText(length: number, options?: TPopTextOptions): Promise<Typewriter> {
    return new Promise(async (resolve) => {
      if (!this._instance) {
        console.warn('[Typewriter]:The element is not found');
        return;
      }
      await this._popAndParseText(length, this._instance, this._instance, options);
      resolve(this);
    });
  }
  /**
   * Pop the last character of the text
   * @param length The length of the text to be popped
   * @returns The Typewriter instance
   */
  popText(length: number, options?: TPopTextOptions): TTypewritterReturnType {
    this._queue.enqueue(this._popText.bind(this, length, options));
    return {
      wait: this.wait.bind(this),
      setText: this.setText.bind(this),
      popText: this.popText.bind(this),
      setSpeed: this.setSpeed.bind(this),
    };
  }

  /** =============================== Wait for a while ================================ */
  private async _wait(ms: number): Promise<Typewriter> {
    return new Promise(async (resolve) => {
      await sleep(ms);
      resolve(this);
    });
  }
  /**
   * Wait for a while
   * @param ms The time to wait
   * @returns The Typewriter instance
   */
  wait(ms: number): TTypewritterReturnType {
    this._queue.enqueue(this._wait.bind(this, ms));
    return {
      wait: this.wait.bind(this),
      setText: this.setText.bind(this),
      popText: this.popText.bind(this),
      setSpeed: this.setSpeed.bind(this),
    };
  }

  /** =============================== Set Speed ================================ */
  /**
   * Set the global typing speed
   * @param speed The typing speed
   * @returns The Typewriter instance
   * @returns The Typewriter instance
   */
  setSpeed(speed: number): TTypewritterReturnType {
    this._speed = speed;
    return {
      wait: this.wait.bind(this),
      setText: this.setText.bind(this),
      popText: this.popText.bind(this),
      setSpeed: this.setSpeed.bind(this),
    };
  }

  /** =============================== Life Action ================================ */
  /**
   * Stop the typewriter effect
   */
  stop(): void {
    this._queue?.stop();
  }

  /**
   * Start the typewriter effect
   */
  start(): void {
    this._queue.start();
  }

  /**
   * Pause the typewriter effect
   */
  pause(): void {
    this._queue.pause();
  }

  /**
   * Resume the typewriter effect
   */
  resume(): void {
    this._queue.resume();
  }

  /**
   * Clear the text
   */
  clear(): void {
    this._queue.clear();
  }
}
