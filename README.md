# choreographyjs

*The best and only animation tool you'll ever need!*

---

choreographyjs is a *Promise-based* javascript module for animating elements in **PURE JAVASCRIPT!!!**.

We combined Promises, the Web-Animations API, and our animation helper functions, to make it easier than ever to make elegant, customizable animations for use on your website.

---

## Animating is as simple as:

### Step 1: Import

First import the animation from choreography.js

```
import { slide } from 'choreography.js';

```

### Step 2: Animate!

All of our animations are functions so, for our simplest animations, all you have to do is grab the Element in javascript and send it on through!

```
var element = document.querySelector('#id');

element.addEventListener('click', () => {
    slide(element);
});

```

### Step 3 (Optional): Customize The Animations!

We know not everyone like a basic cookie cutter animation, so all of our animations have an optional options parameter for extra special customization!

```
slide(element, { duration: 1000, direction: 'left', slideBack: false });
```

### Step 4 (Optional): Chain Animations Together!

All of our animations return a Promise with the parameter being the Element that was animated, making our animations super easy to chain!

```
import { slide, spin } from 'choreography.js';

var element = document.querySelector('#id');

element.addEventListener('click', () => {
    slide(element)
        .then(spin)
        .then(() => slide(element, { duration: 1000 }));
});
```