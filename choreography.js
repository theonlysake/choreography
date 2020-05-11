// --- GENERATE NEW DOCUMENTATION ---
// cmd: jsdoc README.md choreography.js -t node_modules/clean-jsdoc-theme

// --- HOW TO USE ---
// import { Bounce, Slide, Jiggle, Etc... } from 'choreography.js'
//              OR
// import * as {Whatever you want to name it} from 'choreography.js' 

/**
 * @typedef {Object} CConfig Choreography Configuration settings for general rules applied to the module (optional)
 * @property {boolean} saveHistory Tells the module whether of not it should save all animation history | Default: false
*/

/**
 * @type {CConfig}
 */
export const CConfig = {
    saveHistory: false
}

 /**
  * holds all animations, because Document.getAnimations() && Element.getAnimations() are not yet supported
  * @type {Animation[]}
  */
export const stage = [];

/**
  * holds all finished && idle animations, because Document.getAnimations() && Element.getAnimations() are not yet supported
  * @type {Animation[]}
  */
export const animationHistory = [];

/** Loops through the stage, clearing it of all idle or finished animations */
export function freeStage(){
    var { saveHistory } = CConfig;
    var deleteList = [];

    stage.forEach((animation, index) => {
        let { playState } = animation;

        if (playState === 'finished' || playState === 'idle'){
            deleteList.push(index);
        }
    });

    deleteList.reverse().forEach((stageIndex) => {
        let removedAnimation = stage.splice(stageIndex, 1);
        if (saveHistory){
            animationHistory.push(removedAnimation);
        }
    });
}

/**
 * Returns an array of all animations currently on the stage that belong to the specified element
 * @param {Element} element The element to retrieve animations for
 * @return {Animation[]} An array of all animations found for this element
 * @example
 * var element = document.querySelector('#id');
 * 
 * var animations = getAnimations(element);
 * // OR
 * getAnimations(element).forEach(animation => {
 *      //Do something here
 * });
 */
export function getAnimations(element){
    return stage.filter(animation => animation.effect.target === element);
}

/**
 * Checks if an element has an active animation on the stage
 * @param {Element} element The element being checked for active animations
 * @return {boolean} true if this element has an active animation otherwise false
 * @example
 * var element = document.querySelector('#id');
 * 
 * if (isAnimated(element)){
 *      //This element is currently being animated!!!
 * }
 */
export function isAnimated(element){
    var isAnimated = false;

    stage.forEach((animation) => {
        let { playState, effect } = animation;

        if (effect.target === element && (playState === 'running' || playState === 'paused')){
            isAnimated = true;
        }
    });

    return isAnimated;
}

/**
 * Find and return an animation by it's id and the element it belongs to
 * @param {Element} element The Element the animation belongs to
 * @param {string} animationId The id for that animation
 * @return {Animation} The animation that was found or undefined if nothing was found
 */
export function findAnimation(element, animationId){
    return stage.find(animation => animation.id === animationId && animation.effect.target === element);
}

/**
 * Will either finish() or cancel() all of the animations of an element
 * @param {Element} element Element to kill the animations of
 * @return {Promise<Element>} A Promise once the last animation has been killed
 */
export async function promiseKillAll(element){
    return new Promise((resolve, reject) => {
        let lastAnimation = null;

        getAnimations(element).forEach(animation => {
            lastAnimation = animation;

            try {
                animation.finish();
            }
            catch {
                if (animation.playState === 'running'){
                    animation.cancel();
                }
            }
        });

        if (!lastAnimation){
            reject("No animation found");
        }
        else {
            freeStage();
            resolve(element);
        }
    });
}

/**
 * Will either finish() or cancel() an animation by it's id and the element it belongs to
 * @param {Element} element Element to kill the animation of
 * @param {string} animationId The id for that animation
 * @return {Promise<Element>} A Promise once the animation has been killed
 */
export async function promiseKill(element, animationId){
    return new Promise((resolve, reject) => {
        let animation = findAnimation(element, animationId);
    
        if (!animation) {
            reject("No animation found");
        }
        else {
            try {
                animation.finish();
            }
            catch {
                animation.cancel();
            }
            finally {
                freeStage();
                resolve(element);
            }
        }
    });
}

/**
 * Will pause() all of the animations on an element
 * @param {Element} element Element to pause the animations of
 * @return {Promise<Element>} A Promise once the last animation has been paused
 */
export async function promisePauseAll(element){
    return new Promise((resolve, reject) => {
        var lastAnimation = null;

        getAnimations(element).forEach(animation => {
            animation.pause();
            lastAnimation = animation;
        });

        if (!lastAnimation){
            reject("No animations found");
        }
        else {
            resolve(element);
        }
    });
}

/**
 * Will pause() all of the animations on an element
 * @param {Element} element Element to pause the animations of
 * @return {Promise<Element>} A Promise once the element has been paused
 */
export async function promisePause(element, animationId){
    return new Promise((resolve, reject) => {
        let animation = findAnimation(element, animationId);

        if (!animation){
            reject("No animation found");
        }
        else {
            animation.pause();
            resolve(element);
        }
    });
}

/**
 * Will play() all of the paused animations on an element and return a Promise once the last animation has finished
 * @param {Element} element Element to play the animations for
 * @return {Promise<Element>} A Promise once the last animation has finished playing
 */
export async function promisePlayAll(element){
    return new Promise((resolve, reject) => {
        var lastAnimation = null;

        getAnimations(element).forEach(animation => {
            lastAnimation = animation;
            if (animation.playState === 'paused'){
                    lastAnimation.play();
            }
        });

        if (lastAnimation) {
            lastAnimation.onfinish = () => {
                freeStage();
                resolve(element);
            };
        }
        else {
            reject('No animations found!');
        }
    });
}

/**
 * Will play() a paused animation on an element and return a Promise once that animation has finished
 * @param {Element} element Element to play the animations for
 * @param {string} animationId The id of the animation to play
 * @return {Promise<Element>} A Promise once the played animation finishes
 */
export async function promisePlay(element, animationId){
    return new Promise((resolve, reject) => {
        let animation = findAnimation(element, animationId);

        if (!animation){
            reject("Animation not found");
        }
        else {
            animation.play();
    
            animation.onfinish = () => {
                freeStage();
                resolve(element);
            }
        }
    }); 
}

export async function emptyPromise(){
    return new Promise(resolve => resolve());
}

/**
 * Repeatedly executes the function specified in { loop: } until this loops options.kill() is called.
 * @param {Object} options An object that holds configuration info for the loop
 * @param {function(Object)} options.loop The function to repetedly execute upon completion of the previous function (MUST return a Promise, optional param options property isKilled is used for state checking when chaining promises)
 * @param {function} [options.onKilled] The function that will be called once the loop is killed
 * @param {boolean} [options.waitForKill=true] If false, this loops onKilled() function will be fired Immediately upon calling this loops kill() function, rather than waiting until the currently executing function is finished | Default: true
 * @return {Object} options object which contains kill(). options.kill() is used to terminate the loop.
 */
export function loopSequence(options){
    var { init = true, loop, kill, isKilled = false, onKilled, waitForKill = true } = options;

    if (!kill){
        options.kill = function() {
            this.isKilled = true;
            if (!waitForKill){
                this.onKilled?.();
            }
        }
    }

    if (!isKilled){
        loop(options)
            .then(() => {
                loopSequence(options);
            });
    }
    else {
        if (waitForKill){
            onKilled?.();
        }
    }

    if (init){
        options.init = false;
        return options;
    }
}

/**
 * Make an element slide a direction, then slide back 
 * @param {Element} element The Element to apply the slide animation to
 * @param {Object} [options] The options object to apply to the slide
 * @param {number} [options.height] the distance in px the Element will slide | Default: 100
 * @param {number} [options.duration] the duration, in milliseconds, of the slide from start to finish | Default: 500
 * @param {number} [options.iterations] the number of times the element will slide | Default: 1
 * @param {('up'|'down'|'left'|'right')} [options.direction] The direction you want the element to slide | Default: 'up'
 * @param {boolean} [options.slideBack] If gravity is false, element will pause() at the peak of the slide | Default: true
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 */
export async function slide(element, options = {}){
    const { height = 100, duration = 500, iterations = 1, direction = 'up', slideBack = true } = options;
    var currentPosition = 0;
    var keyframes = [];
    var x = Math.sqrt(height) * -1;
    var xEnd = Math.sqrt(height);
    var slideDirection =
        direction === 'up'
        ? 'bottom'
        : direction === 'down'
        ? 'top'
        : direction === 'right'
        ? 'left'
        : 'right'

    while (x <= xEnd){
        currentPosition = (Math.pow(x, 2) * -1) + height;

        keyframes.push({ [slideDirection]: `${currentPosition}px`});
        
        x += 1;
    }

    return new Promise((resolve, reject) => {
        let animation = element.animate(keyframes, { duration, iterations });
        animation.id = 'slide';
        stage.push(animation);

        if (!slideBack){
            setTimeout(() => {
                animation.pause();
                resolve(element);
            }, duration / 2);
        }
        else{
            animation.onfinish = () => {
                freeStage();
                resolve(element);
            }
        }
    });
}

/**
 * Squish an Element by reducing it's height and expanding it's width simultaneously
 * @param {Element} element The Element to apply the squish animation to
 * @param {Object} [options] An object of options to add to the squish
 * @param {number} [options.squishPercent] the percent amount the Element will squish down to
 * @param {number} [options.duration] the duration, in milliseconds, of the squish from start to finish 
 * @param {number} [options.iterations] the number of times the element will squish 
 * @param {boolean} [options.bounceBack] If bounceBack is false the animation will pause() at maximum squish
 * @return {Promise<Element>} A Promise once the animation has finished
 */
export async function squish(element, options = {}){
    const { squishPercent = 75, duration = 500, iterations = 1, bounceBack = true } = options;
    var currentSquish = 0;
    var keyframes = [];
    var x = Math.sqrt(squishPercent) * -1;
    var xEnd = Math.sqrt(squishPercent);
    var elementHeight = element.getBoundingClientRect().height / 2;

    while (x <= xEnd){
        currentSquish = ((Math.pow(x, 2) * -1.0) + parseFloat(squishPercent)) / 100;

        let heightOffset = elementHeight - (elementHeight * (1.0 - currentSquish));

        keyframes.push({ transform: `scale(${1.0 + currentSquish},${1.0 - currentSquish})`, top: `${heightOffset}px` });
        
        x += 1;
    }

    return new Promise((resolve, reject) => {
        let animation = element.animate(keyframes, { duration, iterations });
        animation.id = 'squish';
        stage.push(animation);

        if (!bounceBack){
            setTimeout(() => {
                animation.pause();
                resolve(element);
            }, duration / 2);
        }
        else {
            animation.onfinish = () => {
                freeStage();
                resolve(element);
            }
        }
    });
}

/**
 * Spins an element clockwise (or counter-clockwise depending on the value for degrees)
 * @param {Element} element The element to be spun
 * @param {Object} [options] An object of options to add to the squish
 * @param {number} [options.degrees] The degree of rotation (use a negative value for counter-clockwise rotation)
 * @param {number} [options.duration] The number of milliseconds it takes to complete the spin
 * @param {number} [options.iterations] The number of times the element will spin
 * @return {Promise<Element>} A Promise once the animation has finished
 */
export async function spin(element, options = {}){
    const { degrees = 360, duration = 500, iterations = 1 } = options;

    var keyframes = { transform: [ 'rotate(0deg)', `rotate(${degrees}deg)` ] }

    return new Promise((resolve, reject) => {
        let animation = element.animate(keyframes, { duration, iterations });
        animation.id = 'spin';
        stage.push(animation);

        animation.onfinish = () => {
            freeStage();
            resolve(element);
        }
    });
}