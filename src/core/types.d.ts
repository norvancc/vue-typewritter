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
