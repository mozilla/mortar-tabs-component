# mortar-tabs-component

### _A basic tabs web component_ ###

This is a simple web component for building tabbed interfaces. Heavily inspired by [Brick](http://mozbrick.github.io/)'s [brick-tabbar](https://github.com/mozbrick/brick-tabbar) but doesn't get as complex. Not using Shadow DOM, and not using HTML imports, so it can be used by just including some `.js` and `.css` files in your code.

Its main goal is to be used in [Mortar](https://github.com/mozilla/mortar/)'s [TabView](https://github.com/mozilla/mortar-tab-view) template, but you can use it in your projects too if you don't need a full featured component.

Bear in mind this is still under development so there are gaps and very probably errors and bugs too O:-)

## Usage

If you're not using the [platform.js](https://github.com/polymer/platform) polyfill yet, include it before any other script tag in the head:

```html
<script src="libs/platform.js"></script>
```

`platform.js` is a polyfill to enable using Web Components in platforms where the support is not quite there yet--so you can develop Web Components assuming there *is* support even if there's not. If you're using Polymer you might already be including this polyfill already and won't need to include it again.

Now include the JS and CSS files that define the component: 

```html
<script src="component.js" defer></script>
<link rel="stylesheet" href="component-structure.css">
<link rel="stylesheet" href="component-appearance.css">
```

And you're ready to go!

Look at the `example` for a demonstration on how to control which tab is initially selected, and overriding the tabs' default style with your own.

### Methods

#### `select(index)`

Select tab at `index`. Example:

```html
<mortar-tabs>
	<mortar-tab>First</mortar-tab>
	<mortar-tab>Second</mortar-tab>
	<mortar-tab>Third</mortar-tab>
</mortar-tabs>
```

```javascript
var tabs = document.querySelector('mortar-tabs');
tabs.select(2); // select 'Third' tab (indices are 0-based)
```

### Events

#### `selected`

Dispatched when a tab is selected. The dispatched event contains:

- `index`: index of the tab
- `tab`: the `mortar-tab` element that was selected.

```html
<mortar-tabs>
	<mortar-tab>First</mortar-tab>
	<mortar-tab>Second</mortar-tab>
	<mortar-tab>Third</mortar-tab>
</mortar-tabs>
```

```javascript
var tabs = document.querySelector('mortar-tabs');
tabs.addEventListener('selected', function(ev) {
	console.log('The tab ' + ev.detail.index + ' was selected';
});
tabs.select(2); // select 'Third' tab (indices are 0-based)
```

Should print: `The tab 2 was selected` to the console.
