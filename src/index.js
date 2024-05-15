const anchorIcon = require('./icon.js');

/**
 * Anchor Block Tune for Editor.js
 * Supported config:
 *     * anchorLength {number} (Default: 50)
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
   * Default Anchor Length
   *
   * @static
   * @readonly
   * @type {number}
   */
  static get DEFAULT_ANCHOR_LENGTH() {
    return 50;
  }

  /**
   * Creates an instance of Anchor.
   *
   * @constructor
   * @param {{ data: string; config: {}; block: {}; }} props
   */
  constructor({ data, config, block }) {
    this._data = data || '';
    this._config = config;
    this._block = block;
  }

  /**
   * User's anchor length if provided (falls back to Default)
   *
   * @readonly
   * @type {number}
   */
  get userAnchorLength() {
    const userLength = parseInt(this._config.anchorLength, 10);
    if (userLength) {
      return userLength;
    }
    return Anchor.DEFAULT_ANCHOR_LENGTH;
  }

  /**
   * Current anchor data
   *
   * @readonly
   * @type {string}
   */
  get currentAnchor() {
    // Avoids these charaters at the beginning or ending - (_, -, whitespace)
    // Replaces whitespace with underscore
    // Allows only certain characters - alphabets, numbers, underscore and hyphen
    // Truncates to defined length
    // Removes trailing underscores or hyphens after truncation
    const anchor = this._data
      .replace(/^[ _-]+|[ _-]+$/g, '')
      .replace(/ /g, '_')
      .replace(/[^a-z0-9_-]/gi, '')
      .slice(0, this.userAnchorLength)
      .replace(/[_-]+$/, '');
    if (anchor && anchor.length > 0) {
      return anchor;
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
