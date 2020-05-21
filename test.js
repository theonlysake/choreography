import { squish, slide, isAnimated, CConfig, spin, promiseKillAll, loopSequence, promisePlayAll, wait, shrink, grow, buildKeyframe, getComputedKeyframe, orbit } from './choreography.js';

function addEventListeners(element, events, func){
    events.forEach((event) => {
        element.addEventListener(event, func);
    });
}

CConfig.saveHistory = true; //Default: false;

window.onload = () => {
    var tests = document.querySelectorAll('.test');

    var testKeyframe = buildKeyframe({
        background: {
            color: 'color',
            position: "center bottom",
            size: "auto"
        },
        border: {
            all: {
                color: "color",
                spacing: "inherit",
                width: "inherit"
            },
            bottom: {
                color: "color",
                leftRadius: "%",
                rightRadius: "%",
                width: "inherit"
            },
            left: {
                color: "color",
                width: "inherit"
            },
            right: {
                color: "color",
                width:"inherit"
            },
            top: {
                color:"color",
                leftRadius:"%",
                rightRadius:"%",
                width:"inherit"
            }
        },
        bottom: "auto",
        top: "auto",
        right: "auto",
        left: "auto",
        opacity: 0.5,
        boxShadow: {
            blur: 3,
            color: 'rgb',
            hOffset: 1,
            vOffset: 1,
            spread: 1,
            inset: true
        },
        column: {
            count: "auto",
            gap: "inherit",
            width: "auto",
            rule: {
                style: "solid",
                color: "color",
                width: "inherit"
            }
        },
        filter: {
            blur: 5,
            brightness: 5,
            contrast: 5,
            grayscale: 4,
            hueRotate: 6,
            invert: 3,
            opacity: 0.5,
            saturate: 7,
            sepia: 4,
            dropShadow: {
                hShadow: 5,
                vShadow: 5,
                blur: 5,
                spread: 5
            }
        },
        font: {
            color: "color",
            decorationColor: "color",
            fontSize: "large",
            fontWeight: "100",
            shadow: {
                blurRadius: 5,
                color: 'color',
                hShadow: 3,
                vShadow: 8
            }
        },
        grid: {
            area: 'name',
            auto: {
                columns: "auto",
                flow: "column dense",
                rows: "auto"
            },
            column: {
                end: "auto",
                gap: "length",
                start: "auto"
            },
            row: {
                end: "auto",
                gap:"length",
                start: "auto"
            },
            template: {
                areas: "itemnames",
                columns: "auto",
                rows: "auto"
            }
        },
        outline: {
            color: "color",
            offset: "inherit",
            width: "medium"
        },
        transform: {
            matrix: [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            matrix3d: [1,1,1,1,1,1,1,1,1,1],
            rotate3d: {
                x: 90,
                y: 90,
                z: 90
            },
            rotate: 90,
            scale: {
                x: 2,
                y: 2,
                z: 2
            },
            skew: {
                x: 90,
                y: 90
            },
            translate: {
                x: 90,
                y: 90,
                z: 90
            }
        }
    });

    console.log(testKeyframe);
    console.log(getComputedKeyframe(tests[0], testKeyframe));

    tests.forEach((test, index) => {
        var loop = null;
        
        test.addEventListener('click', function(event){
            
            test.animate([
                { borderStyle: 'solid', borderWidth: '0px', borderColor: 'black' },
                { borderStyle: 'solid', borderWidth: '10px', borderColor: 'black' }
            ], { duration: 1000, iterations: Infinity, fill: 'forwards', easing: 'ease-in-out', direction: 'alternate' });
            //orbit(test, { duration: 1000, points: 3 + index, iterations: Infinity });
            var radius = 50;
            /* test.animate([
                { top: '0px' },
                { top: `-${radius * index}px` }
            ], { duration: 250, iterations: 1, fill: "forwards" });
            test.animate([
                { right: '0px' },
                { right: `-${radius * index}px` }
            ], { duration: 250, iterations: 1, fill: "forwards", delay: 250 });
            test.animate([
                { top: `-${radius * index}px` },
                { top: `${radius * index}px` }
            ], { duration: 500, iterations: 2, easing: 'ease-in-out', direction: 'alternate', fill: "forwards", delay: 250 });
            test.animate([
                { right: `-${radius * index}px` },
                { right: `${radius * index}px` }
            ], { duration: 500, iterations: 2, easing: 'ease-in-out', direction: 'alternate', delay: 500, fill: "forwards" }); */

            /* if (!isAnimated(test)){
                slide(test, { y: 100, easing: "ease-in-out", direction: "alternate", iterations: Infinity });
                wait(250).then(() => slide(test, { x: 100, easing: "ease-in-out", direction: "alternate", iterations: Infinity }));
            }
            else {
                promiseKillAll(test);
            } */
            /* slide(test, { direction: "alternate", iterations: 2, easing: 'ease-out' })
                .then(() => squish(test, { direction: "alternate", iterations: 2, easing: 'ease-out' }))
                .then(() => spin(test, { direction: "alternate", iterations: 2, easing: 'ease-out' }))
                .then(() => shrink(test, { direction: "alternate", iterations: 2, easing: "ease-out" }))
                .then(() => grow(test, { direction: "alternate", iterations: 2, easing: "ease-out" })) */

            /* if (!isAnimated(test)){
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
            } */
        });
    });
}