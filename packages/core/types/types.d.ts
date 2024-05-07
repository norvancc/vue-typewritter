import { Ref, RendererNode } from 'vue';
import { Callback, TPopTextOptions, TSetTextOptions, TTextOptions, TTypewriterOptions } from './types';

/**
 * @description The options for the text items
 * @property {string[]} class The class list
 * @property {string | CSSStyleSheet} style The style object
 */
export type TTextOptions = {
  class?: string[];
  style?: string | CSSStyleSheet;
};

/**
 * @description The options for the text setter
 * @property {string[]} speed The speed of the text coming in
 * @property {TTextOptions} textOptions The style object
 */
export type TSetTextOptions = {
  speed?: number;
  textOptions?: TTextOptions;
};

/**
 * @description The options for the pop text
 * @property {number} speed The speed of the pop text
 */
export type TPopTextOptions = {
  speed?: number;
};

export type Callback = (...args: any) => Promise<any> | void;

/**
 * @description The options for Typewriter
 * @property {number} speed The speed of the text coming in
 */
export type TTypewriterOptions = {
  /**
   * The speed of the text coming in
   */
  speed?: number;
  /**
   * The callback to be called when the queue is empty
   */
  onComplete?: Callback;
  /**
   * The callback to be called when an error occurs
   */
  onError?: Callback;
  /**
   * The callback to be called when the queue is paused
   */
  onPause?: Callback;
  /**
   * The callback to be called when the queue is resumed
   */
  onResume?: Callback;
  /**
   * The callback to be called when the queue is stopped
   */
  onStop?: Callback;
  /**
   * The callback to be called when the queue is started
   */
  onStart?: Callback;
  /**
   * The callback to be called when the queue is cleared
   */
  onClear?: Callback;
  /**
   * The callback to be called after each step
   */
  onStep?: Callback;
  /**
   * Whether to process the queue immediately
   */

  /**
   * The callback to be called when the text is appended
   */
  onTextAppend?: (text: string) => void;
  immediate?: boolean;
};

type TTypewriterReturnType = {
  wait: (ms: number) => TTypewriterReturnType;
  setText: (text: string | JSX.Element | RendererNode, options?: TSetTextOptions) => TTypewriterReturnType;
  popText: (length: number, options?: TPopTextOptions) => TTypewriterReturnType;
  setSpeed: (speed: number) => TTypewriterReturnType;
};

declare class Typewriter {
  private _text: Ref<string>;
  get text(): string;

  private _instance: Ref<HTMLElement>;
  private _speed: number;
  private _queue: CallbackQueue;
  private _onTextAppend: Callback | null;

  constructor(instance: Ref<HTMLElement>, options?: TTypewriterOptions);

  private _loadText(text: string, textOptions?: TTextOptions): HTMLSpanElement | string;
  private async _setAndParseText(text: string | ChildNode, element: HTMLElement, options?: TSetTextOptions): Promise<string>;
  private async _setText(text: string | ChildNode, options?: TSetTextOptions): Promise<Typewriter>;
  setText(text: string | JSX.Element | RendererNode, options?: TSetTextOptions): TTypewriterReturnType;

  private async _popAndParseText(length: number, element: HTMLElement, parent: HTMLElement, options?: TPopTextOptions): Promise<void>;
  private async _popText(length: number, options?: TPopTextOptions): Promise<Typewriter>;
  popText(length: number, options?: TPopTextOptions): TTypewriterReturnType;

  private async _wait(ms: number): Promise<Typewriter>;
  wait(ms: number): TTypewriterReturnType;

  setSpeed(speed: number): TTypewriterReturnType;

  stop(): void;
  start(): void;
  pause(): void;
  resume(): void;
  clear(): void;
}

export { Typewriter, TTypewriterReturnType };
