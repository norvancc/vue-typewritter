import { Callback } from './types';

export type CallbackOptions = {
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
  immediate?: boolean;
};
export class CallbackQueue {
  private queue: Callback[] = [];
  private isProcessing: boolean = false;
  private _immediate: boolean = true;
  private _paused: boolean = false;

  private _onComplete: Callback | null = null;
  private _onError: Callback | null = null;
  private _onPause: Callback | null = null;
  private _onResume: Callback | null = null;
  private _onStop: Callback | null = null;
  private _onStart: Callback | null = null;
  private _onClear: Callback | null = null;
  private _onStep: Callback | null = null;

  constructor(options?: CallbackOptions) {
    if (!options) {
      return;
    }
    this.setOptions(options);
  }

  setOptions(options: CallbackOptions): void {
    this._onComplete = options.onComplete || null;
    this._onError = options.onError || null;
    this._onPause = options.onPause || null;
    this._onResume = options.onResume || null;
    this._onStop = options.onStop || null;
    this._onStart = options.onStart || null;
    this._onClear = options.onClear || null;
    this._onStep = options.onStep || null;
    this._immediate = options.immediate || true;
  }

  enqueue(callback: Callback): void {
    this.queue.push(callback);
    if (this._immediate) {
      this.processQueue();
    }
  }

  private async processQueue(): Promise<void> {
    try {
      if (this.isProcessing) return;
      this.isProcessing = true;

      while (this.queue.length > 0) {
        if (this._paused) {
          break;
        }
        const callback = this.queue.shift();
        if (callback) {
          // Call the callback
          await callback();
        }

        if (this._onStep) {
          // Call the onStep callback
          await this._onStep();
        }
      }
      if (this._onComplete && !this._paused) {
        // Call the onComplete callback
        await this._onComplete();
      }

      this.isProcessing = false;
    } catch (error) {
      if (this._onError) {
        // Call the onError callback
        await this._onError();
      }
    }
  }

  clear(): void {
    this.queue = [];
    if (this._onClear) {
      this._onClear();
    }
  }

  stop(): void {
    this.clear();
    this.isProcessing = false;
    if (this._onStop) {
      this._onStop();
    }
  }

  pause(): void {
    this._paused = true;
    if (this._onPause) {
      this._onPause();
    }
  }

  resume(): void {
    this._paused = false;
    this.processQueue();
    if (this._onResume) {
      this._onResume();
    }
  }

  start(): void {
    this.isProcessing = true;
    this.processQueue();
    if (this._onStart) {
      this._onStart();
    }
  }

  get length(): number {
    return this.queue.length;
  }

  get isRunning(): boolean {
    return this.isProcessing;
  }

  get isEmpty(): boolean {
    return this.queue.length === 0;
  }
}
