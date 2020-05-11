import { squish, slide, isAnimated, CConfig, spin, promiseKillAll, loopSequence } from './choreography.js';

function addEventListeners(element, events, func){
    events.forEach((event) => {
        element.addEventListener(event, func);
    });
}

CConfig.saveHistory = true; //Default: false;

window.onload = () => {
    var tests = document.querySelectorAll('.test');

    tests.forEach((test, index) => {
        var loop = null;
        test.addEventListener('click', function(event){
            if (!isAnimated(test)){
                loop = loopSequence({
                    loop: (options) => {
                        return squish(test)
                            .then(() => {
                                if (!options.isKilled){
                                    return spin(test, { degrees: 90 * index });
                                }
                            });
                    },
                    onKilled: () => {
                        promiseKillAll(test)
                            .then(() => squish(test, { duration: 200, squishPercent: 25 }))
                    },
                    waitForKill: false
                });
            } else {
                loop?.kill();
            }
        });
    });
}