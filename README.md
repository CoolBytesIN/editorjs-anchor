# Anchor block tune for Editor.js

This [Editor.js](https://editorjs.io/) block tune enables users to add or remove an anchor to any block tool. Anchors provide the ability to target specific HTML elements within a webpage, aiding in seamless navigation.

A few points to note:
* This block tune can be accessed from the Block Settings menu (see [Preview](https://github.com/CoolBytesIN/editorjs-anchor?tab=readme-ov-file#preview)).
* This button functions as a toggle, allowing you to effortlessly add or remove an anchor with a click. When an anchor is added, the button color changes to indicate its selected state.
* No string input is required for the anchor. When this block tune is selected, it automatically picks the first 30 characters (or user-configured length) from the block text. And if the block text is empty, no anchor will be added.
* The anchor value does not automatically update with changes to the block text.
* To avoid unsafe URL chracters and to improve readability, only a few characters (from the block text) are retained for the anchor value.
  * All characters except these will be ignored: a-z, 0-9, _ (underscore), - (hyphen).
  * The anchor value will begin and end with a alpha-numeric character, other trailing and leading characters are ignored.
  * Whitespace between the words is replaced with an underscore.

## Preview

![preview](https://api.coolbytes.in/media/handle/view/image/733dd8b3-68a7-4cf1-bcf6-5888fb526656/)

## Installation

**Using `npm`**

```sh
npm install @coolbytes/editorjs-anchor
```

**Using `yarn`**

```sh
yarn add @coolbytes/editorjs-anchor
```

## Usage

To make it available to all block tools:

```js
const editor = new EditorJS({
  tools: {
    anchor: Anchor
  },
  tunes: ['anchor']
});
```

To make it available to a particular block tool:

```js
const editor = new EditorJS({
  tools: {
    anchor: Anchor,
    paragraph: {
      class: Paragraph,
      tunes: ['anchor']
    }
  }
});
```

## Config Params

|Field|Type|Description|
|---|---|---|
|maxWords|number|Maximum number of words for the anchor value|
|maxChars|number|Maximum number of characters for the anchor value|

&nbsp;

> [!NOTE]
> (Default behavior) If neither `maxWords` nor `maxChars` are specified, the entire inner text of the element is used (ideal for adding anchors to header elements).

> [!NOTE]
> When both `maxWords` and `maxChars` are provided, `maxWords` takes precedence.

&nbsp;

```js
const editor = EditorJS({
  tools: {
    anchor: {
      class: Anchor,
      config: {
        maxWords: 4
      }
    }
  },
  tunes: ['anchor']
});
```

## Output data

|Type|Description|
|---|---|
|string|Anchor value|

&nbsp;

Example for [Paragraph Tool](https://github.com/editor-js/paragraph):

```json
{
  "type": "paragraph",
  "data": {
    "text": "Some paragraph to test the anchor block tune"
  },
  "tunes": {
    "anchor": "Some paragraph to test"
  }
}
```
