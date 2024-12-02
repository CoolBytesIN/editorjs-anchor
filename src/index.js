const anchorIcon = require('./icons/anchor.js');

/**
 * Anchor Block Tune for Editor.js
 * Supported config:
 *     * maxWords {number}
 *     * maxChars {number}
 *
 * @class Anchor
 * @typedef {Anchor}
 */
export default class Anchor {
  /**
   * To notify Editor.js that this is a block tune
   *
   * @static
   * @readonly
   * @type {boolean}
   */
  static get isTune() {
    return true;
  }

  /**
   * Creates an instance of Anchor.
   *
   * @constructor
   * @param {{ data: string; config: {}; block: {}; }} props
   */
  constructor({ data, config, block }) {
    this._data = data || '';
    // this._config = config;
    this._block = block;
    if (config.maxChars) {
      this._maxChars = parseInt(config.maxChars, 10);
    }
    if (config.maxWords) {
      this._maxWords = parseInt(config.maxWords, 10);
    }
  }

  /**
   * Current anchor data
   *
   * @readonly
   * @type {string}
   */
  get currentAnchor() {
    if (this._data.length > 0) {
      if (this._maxWords) {
        // Apply word limit if maxChars is not set
        const words = this._data.split(/\s+/);
        return words.slice(0, this._maxWords).join(' ');
      }

      if (this._maxChars) {
        // Use character limit if maxChars is defined
        return this._data.slice(0, this._maxChars).replace(/[\s_-]+$/, '');
      }
  
      return this._data;
    }
    return undefined;
  }

  /**
   * Block Tunes Menu item
   *
   * @returns {*}
   */
  render() {
    return {
      icon: anchorIcon,
      label: 'Anchor',
      onActivate: () => {
        if (this.currentAnchor) {
          // Anchor already exists, so removing it
          this._data = '';
        } else {
          // Read block text to extract anchor
          this._data = this._block.holder.innerText;
        }
      },
      closeOnActivate: true,
      isActive: !!this.currentAnchor,
    };
  }

  /**
   * Tune state for the block save
   *
   * @returns {string}
   */
  save() {
    return this.currentAnchor;
  }
}
