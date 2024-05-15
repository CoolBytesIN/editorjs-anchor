# Anchor Block Tune for Editor.js

This [Editor.js](https://editorjs.io/) block tune lets you add/remove an anchor to any block tool. This can help target a specific HTML element within a webpage for navigation.

A few points to note:
* This block tune is accessible from the Block Settings menu.
* When selected, the first 50 (or user configured length) characters of the block text will be used as the anchor value.
  * While doing so, spaces are replaced with underscores. And all characters except for a-z, 0-9, _ (underscore), - (hyphen) will be ignored.
* If you click the settings button after selecting an anchor, it will reset/remove the anchor. So, the button acts like a toggle.

## Preview

![preview](https://api.coolbytes.in/media/handle/view/image/295/)

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
|anchorLength|number|Maximum length (no. of characters) of the anchor value|

```js
const editor = EditorJS({
  tools: {
    anchor: {
      class: Anchor,
      config: {
        anchorLength: 50
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

Example for [Paragraph Tool](https://github.com/editor-js/paragraph):

```json
{
  "type": "paragraph",
  "data": {
    "text": "Some paragraph text for testing"
  },
  "tunes": {
    "anchor": "Some_paragraph_text_for_testing"
  }
}
```