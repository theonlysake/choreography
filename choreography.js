// --- GENERATE NEW DOCUMENTATION ---
// cmd: jsdoc README.md choreography.js -t node_modules/clean-jsdoc-theme
// cmd: jsdoc README.md choreography.js -t node_modules/jsdoc-one-page

/**
 * Set an array to a fixed length
 * @param {Array} arr the array to fix the length of
 * @param {number} length the length to assign to the array
 * @param {Object} fillValue the default value to insert if the array is too small
 */
export function fixArray(arr, length, fillValue){
    while (arr.length < length){
        arr.push(fillValue);
    }
    while (arr.length > length){
        arr.pop();
    }
    return arr;
}

/**
 * @typedef 
*/

/**
 * CConfig Choreography Configuration settings for general rules applied to the module (optional)
 * @property {boolean} saveHistory Tells the module whether of not it should save all animation history | Default: false
 * @property {KeyframeEffectOptions} keyframeEffectDefaults The default keyframe effect options for all animations
 * @example
 * import { CConfig } from 'choreography.js';
 * 
 * // Disable Saving Choreography Animation History
 * CConfig.saveHistory = false;
 */
export const CConfig = {
    saveHistory: true,
    keyframeEffectDefaults: {
        delay: 0,
        direction: 'normal',
        duration: 500,
        easing: 'linear',
        endDelay: 0,
        fill: 'forwards',
        iterationStart: 0.0,
        iterations: 1
    }
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
 * Builds a keyframe based on the options object provided
 * @param {Object} [options] An Object whose properties hold details for the keyframe
 * @param {Object} [options.grid] - CSS grid properties
 * @param {string} [options.grid.area] - Specify a grid area name for this item to be assigned to
 * @param {Object} [options.grid.auto] - rules for an auto-placed item grid
 * @param {('auto'|'max-content'|'min-content'|'length')} [options.grid.auto.columns] - Sets a size for the columns in a grid container.
 * @param {('row'|'column'|'dense'|'row dense'|'column dense')} [options.grid.auto.flow] - controls how auto-placed items get inserted in the grid.
 * @param {('auto'|'max-content'|'min-content'|'length')} [options.grid.auto.rows] - Sets a size for the rows in a grid container.
 * @param {Object} [options.grid.column] - Specifies a grid item's size and location in a grid layout
 * @param {('auto'|'span n'|'column-line')} [options.grid.column.end] - Specifies on which column-line to stop displaying the item, or how many columns to span.
 * @param {'length'} [options.grid.column.gap] - Defines the size of the gap between the columns in a grid layout.
 * @param {('auto'|'span n'|'column-line')} [options.grid.column.start] - Specifies on which column to start displaying the item.
 * @param {Object} [options.grid.row] - specifies a grid item's size and location in a grid layout,
 * @param {('auto'|'row-line'|'span n')} [options.grid.row.end] - Specifies on which row-line to stop displaying the item, or how many rows to span.
 * @param {'length'} [options.grid.row.gap] - defines the size of the gap between the rows in a grid layout.
 * @param {('auto'|'row-line')} [options.grid.row.start] - Specifies on which row to start displaying the item.
 * @param {Object} [options.grid.template] - rules for a CSS grid layout
 * @param {('none'|'itemnames')} [options.grid.template.areas] - specifies areas within the grid layout.
 * @param {('none'|'auto'|'max-content'|'min-content'|'length'|'initial'|'inherit')} [options.grid.template.columns] - specifies the number (and the widths) of columns in a grid layout.
 * @param {('none'|'auto'|'max-content'|'min-content'|'length'|'initial'|'inherit')} [options.grid.template.rows] - specifies the number (and the heights) of the rows in a grid layout.
 * @param {Object} [options.column] - CSS column properties
 * @param {('number'|'auto'|'initial'|'inherit')} [options.column.count] - The optimal number of columns into which the content of the element will be flowed. Default value is auto where the number of columns will be determined by other properties, like e.g. "column-width"
 * @param {('length'|'normal'|'initial'|'inherit')} [options.column.gap] - A specified length that will set the gap between the columns
 * @param {('auto'|'length'|'initial'|'inherit')} [options.column.width] - A length that specifies the width of the columns. The number of columns will be the minimum number of columns needed to show all the content across the element. Read about length units
 * @param {Object} [options.column.rule] - The column-rule property sets the width, style, and color of the rule between columns.
 * @param {('none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'initial'|'inherit')} [options.column.rule.style] - Sets the style of the rule between columns.
 * @param {('color'|'initial'|'inherit')} [options.column.rule.color] - Sets the color of the rule between columns.
 * @param {('medium'|'thin'|'thick'|'length'|'initial'|'inherit')} [options.column.rule.width] - Sets the width of the rule between columns.
 * @param {('auto'|'length'|'initial'|'inherit')} [options.top] - Sets the top edge position
 * @param {('auto'|'length'|'initial'|'inherit')} [options.bottom] - Sets the bottom edge position
 * @param {('auto'|'length'|'initial'|'inherit')} [options.left] - Sets the left edge position
 * @param {('auto'|'length'|'initial'|'inherit')} [options.right] - Sets the right edge position
 * @param {('auto'|'value'|'initial'|'inherit')} [options.width] - Specifies the width of the element
 * @param {('auto'|'value'|'initial'|'inherit')} [options.height] - Specifies the height of the element
 * @param {number} [options.zIndex] - Set the z-index
 * @param {Object} [options.background] - CSS background properties
 * @param {('color'|'transparent'|'initial'|'inherit')} [options.background.color] - A CSS valid color for the background
 * @param {('left top'|'left center'|'left bottom'|'right top'|'right center'|'right bottom'|'center top'|'center center'|'center bottom'|'x% y%'|'xpos ypos'|'initial'|'inherit')} [options.background.position] - sets the starting position of a background image.
 * @param {('auto'|'length'|'cover'|'contain'|'initial'|'inherit')} [options.background.size] - specifies the size of the background images.
 * @param {Object} [options.border] - CSS border properties
 * @param {Object} [options.border.all] - Affects all sides of the element
 * @param {('none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'initial'|'inherit')} [options.border.all.style] The style for the border
 * @param {('medium'|'thin'|'thick'|'length'|'initial'|'inherit')} [options.border.all.width] - The width of the border
 * @param {('color'|'transparent'|'initial'|'inherit')} [options.border.all.color] - The color for the border
 * @param {('length'|'initial'|'inherit')} [options.border.all.spacing] - The space in px between the element and the border
 * @param {Object} [options.border.top] - Affects the top sides of the element
 * @param {('none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'initial'|'inherit')} [options.border.top.style] The style for the border
 * @param {('medium'|'thin'|'thick'|'length'|'initial'|'inherit')} [options.border.top.width] - The width of the border
 * @param {('color'|'transparent'|'initial'|'inherit')} [options.border.top.color] - The color for the border
 * @param {('length'|'%')} [options.border.top.leftRadius] - Defines the shape of the top left corner
 * @param {('length'|'%')} [options.border.top.rightRadius] - Defines the shape of the top right corner
 * @param {Object} [options.border.bottom] - Affects the bottom of the element
 * @param {('none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'initial'|'inherit')} [options.border.bottom.style] The style for the border
 * @param {('medium'|'thin'|'thick'|'length'|'initial'|'inherit')} [options.border.bottom.width] - The width of the border
 * @param {('color'|'transparent'|'initial'|'inherit')} [options.border.bottom.color] - The color for the border
 * @param {('length'|'%')} [options.border.bottom.leftRadius] - Defines the shape of the top left corner
 * @param {('length'|'%')} [options.border.bottom.rightRadius] - Defines the shape of the top right corner
 * @param {Object} [options.border.left] - Affects the left of the element
 * @param {('none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'initial'|'inherit')} [options.border.left.style] The style for the border
 * @param {('medium'|'thin'|'thick'|'length'|'initial'|'inherit')} [options.border.left.width] - The width of the border
 * @param {('color'|'transparent'|'initial'|'inherit')} [options.border.left.color] - The color for the border
 * @param {Object} [options.border.right] - Affects the right of the element
 * @param {('none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'initial'|'inherit')} [options.border.right.style] The style for the border
 * @param {('medium'|'thin'|'thick'|'length'|'initial'|'inherit')} [options.border.right.width] - The width of the border
 * @param {('color'|'transparent'|'initial'|'inherit')} [options.border.right.color] - The color for the border
 * @param {Object[]} [options.boxShadows] - CSS box-shadow properties
 * @param {number} [options.boxShadows[].hOffset] - REQUIRED The horizontal offset of the shadow. A positive value puts the shadow on the right side of the box, a negative value puts the shadow on the left side of the box
 * @param {number} [options.boxShadows[].vOffset] - REQUIRED The vertical offset of the shadow. A positive value puts the shadow below the box, a negative value puts the shadow above the box
 * @param {number} [options.boxShadows[].blur] - The blur radius. The higher the number, the more blurred the shadow will be
 * @param {number} [options.boxShadows[].spread] - The spread radius. A positive value increases the size of the shadow, a negative value decreases the size of the shadow
 * @param {string} [options.boxShadows[].color] - The color of the shadow. The default value is the text color. Look at CSS Color Values for a complete list of possible color values. Note: In Safari (on PC) the color parameter is If you do not specify the color, the shadow is not displayed at all.
 * @param {boolean} [options.boxShadows[].inset] - Changes the shadow from an outer shadow (outset) to an inner shadow
 * @param {Object} [options.font] - CSS font & text properties
 * @param {('color'|'initial'|'inherit')} [options.font.color] - The color to style the font
 * @param {('medium'|'xx-small'|'x-small'|'small'|'large'|'x-large'|'xx-large'|'smaller'|'larger'|'length'|'initial'|'inherit')} [options.font.size] - sets the size of a font
 * @param {('normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900')} [options.font.weight] - The line thickness for the font
 * @param {('color'|'initial'|'inherit')} [options.font.decorationColor] - Specifies the color of the text-decoration
 * @param {Object[]} [options.font.shadows] - adds shadow to text.
 * @param {number} [options.font.shadows[].hShadow] - Specifies a pixel value for the horizontal shadow. Negative values place the shadow to the left of the text.
 * @param {number} [options.font.shadows[].vShadow] - Specifies a pixel value for the vertical shadow. Negative values place the shadow above the text.
 * @param {number} [options.font.shadows[].blurRadius] - This is the third value, and must be in pixels. Adds a blur effect to the shadow. A larger value will create more blur (the shadow becomes bigger and lighter). Negative values are not allowed. If no value is specified, 0 is used (the shadow's edge is sharp).
 * @param {string} [options.font.shadows[].color] - The color for the text shadow
 * @param {Object} [options.filter] - CSS filter properties
 * @param {number} [options.filter.blur] - Applies a blur effect to the image. A larger value will create more blur. If no value is specified, 0 is used.
 * @param {number} [options.filter.brightness] - Adjusts the brightness of the image. 0% will make the image completely black. 100% (1) is default and represents the original image. Values over 100% will provide brighter results.
 * @param {number} [options.filter.contrast] - Adjusts the contrast of the image. 0% will make the image completely black. 100% (1) is default, and represents the original image. Values over 100% will provide results with more contrast.
 * @param {Object} [options.filter.dropShadow] - Applies a Drop shadow Filter
 * @param {number} [options.filter.dropShadow.hShadow] - Specifies a pixel value for the horizontal shadow. Negative values place the shadow to the left of the image.
 * @param {number} [options.filter.dropShadow.vShadow] - Specifies a pixel value for the vertical shadow. Negative values place the shadow above the image.
 * @param {number} [options.filter.dropShadow.blur] - This is the third value, and must be in pixels. Adds a blur effect to the shadow. A larger value will create more blur (the shadow becomes bigger and lighter). Negative values are not allowed. If no value is specified, 0 is used (the shadow's edge is sharp).
 * @param {number} [options.filter.dropShadow.spread] - This is the fourth value, and must be in pixels. Positive values will cause the shadow to expand and grow bigger, and negative values will cause the shadow to shrink. If not specified, it will be 0 (the shadow will be the same size as the element). Note: Chrome, Safari and Opera, and maybe other browsers, do not support this 4th length; it will not render if added.
 * @param {string} [options.filter.dropShadow.color] - The color for the shadow
 * @param {number} [options.filter.grayscale] - Converts the image to grayscale. 0% (0) is default and represents the original image. 100% will make the image completely gray (used for black and white images). Note: Negative values are not allowed.
 * @param {number} [options.filter.hueRotate] - Applies a hue rotation on the image. The value defines the number of degrees around the color circle the image samples will be adjusted. 0deg is default, and represents the original image.Note: Maximum value is 360deg.    
 * @param {number} [options.filter.invert] - Inverts the samples in the image. 0% (0) is default and represents the original image. 100% will make the image completely inverted. Note: Negative values are not allowed.
 * @param {number} [options.filter.opacity] - Sets the opacity level for the image. The opacity-level describes the transparency-level, where: 0% is completely transparent. 100% (1) is default and represents the original image (no transparency). Note: Negative values are not allowed. Tip: This filter is similar to the opacity property.
 * @param {number} [options.filter.saturate] - Saturates the image. 0% (0) will make the image completely un-saturated. 100% is default and represents the original image. Values over 100% provides super-saturated results. Note: Negative values are not allowed.
 * @param {number} [options.filter.sepia] - Converts the image to sepia. 0% (0) is default and represents the original image. 100% will make the image completely sepia. Note: Negative values are not allowed.
 * @param {number} [options.opacity] - Specifies the opacity. From 0.0 (fully transparent) to 1.0 (fully opaque)
 * @param {Object} [options.outline] - CSS outline properties
 * @param {('none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'initial'|'inherit')} [options.outline.style] Sets the style of the outline
 * @param {('invert'|'color'|'initial'|'inherit')} [options.outline.color] - Sets the color of the outline
 * @param {('medium'|'thin'|'thick'|'length'|'initial'|'inherit')} [options.outline.width] - Sets the width of the outline
 * @param {('length'|'initial'|'inherit')} [options.outline.offset] - The distance the outline is outset from the border edge. Default value is 0
 * @param {Object} [options.transform] - CSS transform properties
 * @param {number[]} [options.transform.matrix] - Defines a 2D transformation, using a matrix of 6 values
 * @param {number[]} [options.transform.matrix3d] - Defines a 3D transformation, using a matrix of 16 values
 * @param {Object} [options.transform.translate] - Defines a 2D or 3D translation
 * @param {number} [options.transform.translate.x] - Defines a translation, using only the value for the x-axis
 * @param {number} [options.transform.translate.y] - Defines a translation, using only the value for the y-axis
 * @param {number} [options.transform.translate.z] - Defines a 3D translation, using only the value for the z-axis
 * @param {Object} [options.transform.scale] - Defines a 2D or 3D scale transform
 * @param {number} [options.transform.scale.x] - Defines a scale transformation by giving a value for the X-axis
 * @param {number} [options.transform.scale.y] - Defines a scale transformation by giving a value for the Y-axis
 * @param {number} [options.transform.scale.z] - Defines a 3D scale transformation by giving a value for the Z-axis
 * @param {number} [options.transform.rotate] - Defines a 2D rotation, the angle is specified in the value
 * @param {Object} [options.transform.rotate3d] - Defines a 3D rotation
 * @param {number} [options.transform.rotate3d.x] - Defines a 3D rotation along the x-axis
 * @param {number} [options.transform.rotate3d.y] - Defines a 3D rotation along the y-axis
 * @param {number} [options.transform.rotate3d.z] - Defines a 3D rotation along the z-axis
 * @param {Object} [options.transform.skew] - Defines a 2D skew transformation along the X- and the Y-axis
 * @param {number} [options.transform.skew.x] - Defines a 2D skew transformation along the x-axis
 * @param {number} [options.transform.skew.y] - Defines a 2D skew transformation along the y-axis
 */
export function buildKeyframe(options){
    var keyframe = {};
    const { background, border, bottom, boxShadows, column, opacity,
        filter, font, grid, left, outline, right, top, transform, zIndex,
        width, height } = options;

    if (zIndex) keyframe.zIndex = zIndex;
    if (opacity) keyframe.opacity = opacity;
    if (top) keyframe.top = top;
    if (bottom) keyframe.bottom = bottom;
    if (left) keyframe.left = left;
    if (right) keyframe.right = right;
    if (width) keyframe.width = width;
    if (height) keyframe.height = height;

    if (background) {
        const { color, position, size } = background;
        if (color) keyframe.backgroundColor = color;
        if (position) keyframe.backgroundPosition = position;
        if (size) keyframe.backgroundSize = size;
    }

    if (border) {
        const { all, top, bottom, left, right } = border;
        if (all) {
            const { width, color, spacing, style } = all;
            if (style) keyframe.borderStyle = style;
            if (width) keyframe.borderWidth = width;
            if (color) keyframe.borderColor = color;
            if (spacing) keyframe.borderSpacing = spacing;
        }
        if (top) {
            const { width, color, leftRadius, rightRadius, style } = top;
            if (style) keyframe.borderTopStyle = style;
            if (width) keyframe.borderTopWidth = width;
            if (color) keyframe.borderTopColor = color;
            if (leftRadius) keyframe.borderTopLeftRadius = leftRadius;
            if (rightRadius) keyframe.borderTopRightRadius = rightRadius;
        }
        if (bottom) {
            const { width, color, leftRadius, rightRadius, style } = bottom;
            if (style) keyframe.borderBottomStyle = style;
            if (width) keyframe.borderBottomWidth = width;
            if (color) keyframe.borderBottomColor = color;
            if (leftRadius) keyframe.borderBottomLeftRadius = leftRadius;
            if (rightRadius) keyframe.borderBottomRightRadius = rightRadius;
        }
        if (left) {
            const { width, color, style } = left;
            if (style) keyframe.borderLeftStyle = style;
            if (width) keyframe.borderLeftWidth = width;
            if (color) keyframe.borderLeftColor = color;
        }
        if (right) {
            const { width, color, style } = right;
            if (style) keyframe.borderRightStyle = style;
            if (width) keyframe.borderRightWidth = width;
            if (color) keyframe.borderRightColor = color;
        }
    }

    if (boxShadows) {
        keyframe.boxShadow = '';
        boxShadows.forEach((boxShadow, index) => {
            const { blur, color, hOffset, inset, spread, vOffset } = boxShadow;
            if (index != 0) keyframe.boxShadow +=  ',';
            keyframe.boxShadow += `${hOffset ?? 0}px ${vOffset ?? 0}px`;
            if (blur) keyframe.boxShadow += ` ${blur}px`;
            if (spread) keyframe.boxShadow += ` ${spread}px`;
            if (color) keyframe.boxShadow += ` ${color}`;
            if (inset) keyframe.boxShadow += ` inset`;
        });
    }

    if (column) {
        const { count, gap, rule, width } = column;
        if (count) keyframe.columnCount = count;
        if (gap) keyframe.columnGap = gap;
        if (width) keyframe.columnWidth = width;
        if (rule) {
            const { color, width, style } = rule;
            if (style) keyframe.columnRuleStyle = style;
            if (color) keyframe.columnRuleColor = color;
            if (width) keyframe.columnRuleWidth = width;
        }
    }

    if (filter) {
        const { blur, brightness, contrast, dropShadow, grayscale, hueRotate, invert, opacity, saturate, sepia} = filter;
        keyframe.filter = '';
        if (blur) keyframe.filter += ` blur(${blur}px)`;
        if (brightness) keyframe.filter += ` brightness(${brightness}%)`;
        if (contrast) keyframe.filter += ` contrast(${contrast}%)`;
        if (dropShadow) {
            const { blur, hShadow, spread, vShadow, color } = dropShadow;
            keyframe.filter += ` drop-shadow(${hShadow ?? 0}px ${vShadow ?? 0}px ${blur ?? 0}px ${spread ?? 0}px ${color ?? 'black'})`
        }
        if (grayscale) keyframe.filter += ` grayscale(${grayscale}%)`;
        if (hueRotate) keyframe.filter += ` hue-rotate(${hueRotate}deg)`;
        if (invert) keyframe.filter += ` invert(${invert}%)`;
        if (opacity) keyframe.filter += ` opacity(${opacity}%)`;
        if (saturate) keyframe.filter += ` saturate(${saturate}%)`;
        if (sepia) keyframe.filter += ` sepia(${sepia}%)`;
    }

    if (font) {
        const { color, size, weight, decorationColor, shadows } = font;
        if (color) keyframe.color = color;
        if (size) keyframe.fontSize = size;
        if (weight) keyframe.fontWeight = weight;
        if (decorationColor) keyframe.textDecorationColor = decorationColor;
        if (shadows) {
            shadows.forEach((shadow, index) => {
                const { blurRadius, color, hShadow, vShadow } = shadow;
                if (index != 0) keyframe.textShadow +=  ',';
                keyframe.textShadow += `${hShadow ?? 0}px ${vShadow ?? 0}px`;
                if (blurRadius) keyframe.textShadow += ` ${blurRadius}px`;
                if (color) keyframe.textShadow += ` ${color}`;
            });
        }
    }

    if (grid) {
        const { area, auto, column, row, template } = grid;
        if (area) keyframe.gridArea = area;
        if (auto) {
            const { columns, flow, rows } = auto;
            if (columns) keyframe.gridAutoColumns = columns;
            if (flow) keyframe.gridAutoFlow = flow;
            if (rows) keyframe.gridAutoRows = rows;
        }
        if (column) {
            const { end, gap, start } = column;
            if (end) keyframe.gridColumnEnd = end;
            if (gap) keyframe.gridColumnGap = gap;
            if (start) keyframe.gridColumnStart = start;
        }
        if (row) {
            const { end, gap, start } = row;
            if (end) keyframe.gridRowEnd = end;
            if (gap) keyframe.gridRowGap = gap;
            if (start) keyframe.gridRowStart = start;
        }
        if (template) {
            const { areas, columns, rows } = template;
            if (areas) keyframe.gridTemplateAreas = areas;
            if (columns) keyframe.gridTemplateColumns = columns;
            if (rows) keyframe.gridTemplateRows = rows;
        }
    }

    if (outline) {
        const { color, width, offset, style } = outline;
        if (style) keyframe.outlineStyle = style;
        if (color) keyframe.outlineColor = color;
        if (width) keyframe.outlineWidth = width;
        if (offset) keyframe.outlineOffset = offset;
    }

    if (transform) {
        const { matrix, matrix3d, translate, scale, rotate, rotate3d, skew } = transform;
        keyframe.transform = '';
        if (matrix) {
            keyframe.transform += ` matrix(${fixArray([...matrix], 6, 0).join(',')})`;
        }
        if (matrix3d) {
            keyframe.transform += ` matrix3d(${fixArray([...matrix3d], 16, 0).join(',')})`;
        }
        if (translate) {
            const { x, y, z } = translate;
            if (x) keyframe.transform += ` translateX(${x}px)`;
            if (y) keyframe.transform += ` translateY(${y}px)`;
            if (z) keyframe.transform += ` translateZ(${z}px)`;
        }
        if (scale) {
            const { x, y, z } = scale;
            if (x) keyframe.transform += ` scaleX(${x})`;
            if (y) keyframe.transform += ` scaleY(${y})`;
            if (z) keyframe.transform += ` scaleZ(${z})`;
        }
        if (rotate) keyframe.transform += ` rotate(${rotate}deg)`;
        if (rotate3d) {
            const { x, y, z } = rotate3d;
            if (x) keyframe.transform += ` rotateX(${x}deg)`;
            if (y) keyframe.transform += ` rotateY(${y}deg)`;
            if (z) keyframe.transform += ` rotateZ(${z}deg)`;
        }
        if (skew) {
            const { x, y } = skew;
            if (x) keyframe.transform += ` skewX(${x}deg)`;
            if (y) keyframe.transform += ` skewY(${y}deg)`;
        }
        keyframe.transform = keyframe.transform.trim();
    }

    return keyframe;
}

/**
 * Will compute a keyframe matching the one provided but with the provided elements current computed style
 * @param {Element} element the element to get the style from
 * @param {Keyframe} keyframe the keyframe to use as a template
 */
export function getComputedKeyframe(element, keyframe){
    var cssList = window.getComputedStyle(element);
    var computedKeyframe = {};

    Object.keys(keyframe).forEach(key => {
        if (!cssList[key]){
            console.log(`${key} - Not Found!`);
        }
        else {
            computedKeyframe[key] = cssList[key];
        }
    });

    return computedKeyframe;
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
 * @example
 * var element = document.querySelector('#id');
 * 
 * var animation = findAnimation(element, 'spin'); //Find an either playing or paused spin animation
 * spin?.pause(); //findAnimation() returns undefined if animation isn't fouund so we must null check
 */
export function findAnimation(element, animationId){
    return stage.find(animation => animation.id === animationId && animation.effect.target === element);
}

/**
 * Will either finish() or cancel() all of the animations of an element
 * @param {Element} element Element to kill the animations of
 * @return {Promise<Element>} A Promise once the last animation has been killed
 * @example
 * var element = document.querySelector('#id');
 * 
 * promiseKillAll(element)
 *      .then(() => {
 *          //Do something once the last animation has been killed
 *      });
 */
export async function promiseKillAll(element){
    return new Promise((resolve, reject) => {
        getAnimations(element).forEach(animation => {
            try {
                animation.finish();
            }
            catch {
                if (animation.playState === 'running'){
                    animation.cancel();
                }
            }
        });

        freeStage();
        resolve(element);
    });
}

/**
 * Will either finish() or cancel() an animation by it's id and the element it belongs to
 * @param {Element} element Element to kill the animation of
 * @param {string} animationId The id for that animation
 * @return {Promise<Element>} A Promise once the animation has been killed
 * @example
 * var element = document.querySelector('#id');
 * 
 * promiseKill(element, 'spin')
 *      .then(() => {
 *          //Do something once the spin animation has been killed
 *      });
 */
export async function promiseKill(element, animationId){
    return new Promise((resolve, reject) => {
        let animation = findAnimation(element, animationId);
    
        if (animation) {
            try {
                animation.finish();
            }
            catch {
                animation.cancel();
            }
        }

        freeStage();
        resolve(element);
    });
}

/**
 * Will pause() all of the animations on an element
 * @param {Element} element Element to pause the animations of
 * @return {Promise<Element>} A Promise once the last animation has been paused
 * @example
 * var element = document.querySelector('#id');
 * 
 * promisePauseAll(element)
 *      .then(() => {
 *          //Do something once the last animation has been paused
 *      });
 */
export async function promisePauseAll(element){
    return new Promise((resolve, reject) => {
        getAnimations(element).forEach(animation => {
            animation.pause();
        });

        resolve(element);
    });
}

/**
 * Will pause() all of the animations on an element
 * @param {Element} element Element to pause the animations of
 * @return {Promise<Element>} A Promise once the element has been paused
 * @example
 * var element = document.querySelector('#id');
 * 
 * promisePause(element, 'spin')
 *      .then(() => {
 *          //Do something once the spin animation has been paused
 *      });
 */
export async function promisePause(element, animationId){
    return new Promise((resolve, reject) => {
        let animation = findAnimation(element, animationId);

        if (animation) {
            animation.pause();
        }

        resolve(element);
    });
}

/**
 * Will play() all of the paused animations on an element and return a Promise once the last animation has finished
 * @param {Element} element Element to play the animations for
 * @return {Promise<Element>} A Promise once the last animation has finished playing
 * @example
 * var element = document.querySelector('#id');
 * 
 * promisePlayAll(element)
 *      .then(() => {
 *          //Do something once the last paused animation has finished playing
 *      });
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
            resolve(element);
        }
    });
}

/**
 * Will play() a paused animation on an element and return a Promise once that animation has finished
 * @param {Element} element Element to play the animations for
 * @param {string} animationId The id of the animation to play
 * @return {Promise<Element>} A Promise once the played animation finishes
 * @example
 * var element = document.querySelector('#id');
 * 
 * promisePlay(element, 'spin')
 *      .then(() => {
 *          //Do something once a paused spin animation has finished playing
 *      });
 */
export async function promisePlay(element, animationId){
    return new Promise((resolve, reject) => {
        let animation = findAnimation(element, animationId);

        if (animation) {
            animation.play();
    
            animation.onfinish = () => {
                freeStage();
                resolve(element);
            }
        }
        else {
            resolve(element);
        }
    }); 
}

/**
 * A function that will wait a specific amount of time before returning a Promise
 * @param {number} time The duration in milliseconds that should pass before returning the Promise
 * @example
 * //wait 1 second then slide element
 * var element = document.querySelector('#id');
 * 
 * wait(1000)
 *      .then(() => slide(element));
 */
export async function wait(time){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

/**
 * Repeatedly executes the function specified in { loop: } until this loops options.kill() is called.
 * @param {Object} options An object that holds configuration info for the loop
 * @param {function(Object)} options.loop The function to repetedly execute upon completion of the previous function (MUST return a Promise, optional param options property isKilled is used for state checking when chaining promises)
 * @param {function} [options.onKilled] The function that will be called once the loop is killed
 * @param {boolean} [options.waitForKill=true] If false, this loops onKilled() function will be fired Immediately upon calling this loops kill() function, rather than waiting until the currently executing function is finished | Default: true
 * @param {number} [options.iterations] The number of times to repeat the loop - Default: Inifnity
 * @return {Object} options object which contains kill(). options.kill() is used to terminate the loop.
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Initialize and run the loop
 * var loop = loopSequence({
 *      loop: (options) => {
 *          return slide(element)
 *              .then(() => { 
 *                  if (!options.isKilled) {
 *                      spin(element);
 *                  }
 *              });
 *      },
 *      onKilled: () => {
 *          promiseKillAll(element);
 *      },
 *      waitForKill: false // Default: true
 * });
 * 
 * // To Kill the loop
 * loop.kill();
 */
export function loopSequence(options){
    var {
        init = true,
        loop,
        kill,
        isKilled = false,
        onKilled,
        waitForKill = true,
        counter = 0,
        iterations = Infinity
    } = options;

    if (!kill){
        options.kill = function() {
            this.isKilled = true;
            if (!waitForKill){
                this.onKilled?.();
            }
        }
    }

    if (!isKilled && counter < iterations){
        loop(options)
            .then(() => {
                options.counter++;
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
 * Animates an element with additional control options and returns a Promise once the animation is complete
 * @param {Object} init An object that holds initialization info
 * @param {Element} init.element The Element to animate
 * @param {Keyframe[]} init.keyframes The Keyframes for the animation
 * @param {KeyframeEffectOptions} init.effectOptions The KeyframeEffectOptions for this animation
 * @param {string} init.animationId The id to apply to this animation
 */
export async function choreograph(init){
    var { element, keyframes, effectOptions, animationId } = init;
    const defaults = CConfig.keyframeEffectDefaults;

    const {
        delay = defaults.delay,
        direction = defaults.direction,
        duration = defaults.duration,
        easing = defaults.easing,
        endDelay = defaults.endDelay,
        fill = defaults.fill,
        iterationStart = defaults.iterationStart,
        iterations = defaults.iterations
    } = effectOptions;

    return new Promise((resolve, reject) => {
        let animation = element.animate(keyframes, {duration, easing, delay, iterations, direction, fill, endDelay, iterationStart});
        animation.id = animationId;
        stage.push(animation);

        animation.onfinish = () => {
            freeStage();
            resolve(element);
        }
    });
}

/**
 * Translate an Element in px relative to it's current position
 * @param {Element} element The Element to translate
 * @param {Object} [options] The options object to apply to the translation
 * @param {number} [options.x] The length in px the Element should translate along the x-axis
 * @param {number} [options.y] The length in px the Element should translate along the y-axis
 * @param {number} [options.z] The length in px the Element should translate along the y-axis
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Translate Element
 * translate(element, {
 *      x: 100,
 *      y: 100,
 *      z: 100,
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function translate(element, options = {}){
    const { x, y, z, effectOptions } = options;

    var endFrame = buildKeyframe({
        transform: {
            translate: { x, y, z }
        }
    });
    var startFrame = getComputedKeyframe(element, endFrame);
    var keyframes = [ startFrame, endFrame ];

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'translate'
    });
}

/**
 * Scale an Element based on a percentage of it's original size
 * @param {Element} element The Element to scale
 * @param {Object} [options] The options object to apply to the scale
 * @param {number} [options.x] The % the Element should scale along the x-axis
 * @param {number} [options.y] The % the Element should scale along the y-axis
 * @param {number} [options.z] The % the Element should scale along the z-axis
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Scale Element
 * scale(element, {
 *      x: 100,
 *      y: 100,
 *      z: 100,
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function scale(element, options){
    const { x, y, z, effectOptions } = options;

    var endFrame = buildKeyframe({
        transform: {
            scale: { 
                x: x ? x / 100 : null,
                y: y ? y / 100 : null,
                z: z ? z / 100 : null
            }
        }
    });
    var startFrame = getComputedKeyframe(element, endFrame);
    var keyframes = [ startFrame, endFrame ];

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'scale'
    });
}

/**
 * Rotate an Element
 * @param {Element} element The Element to rotate
 * @param {Object} [options] The options object to apply to the rotate
 * @param {number} [options.x] The amount in degrees the Element should rotate along the x-axis
 * @param {number} [options.y] The amount in degrees the Element should rotate along the y-axis
 * @param {number} [options.z] The amount in degrees the Element should sotate along the z-axis
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Rotate Element
 * rotate(element, {
 *      x: 100,
 *      y: 100,
 *      z: 100,
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function rotate(element, options){
    const { x, y, z, effectOptions } = options;

    var endFrame = buildKeyframe({
        transform: {
            rotate3d: { x, y, z }
        }
    });
    var startFrame = getComputedKeyframe(element, endFrame);
    var keyframes = [ startFrame, endFrame ];

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'rotate'
    });
}

/**
 * Position an Element using left, right, top, bottom, and z-index
 * @param {Element} element The Element to position
 * @param {Object} [options] The options object to apply to the position animaiton
 * @param {('auto'|'length'|'initial'|'inherit')} [options.top] - Sets the top edge position
 * @param {('auto'|'length'|'initial'|'inherit')} [options.bottom] - Sets the bottom edge position
 * @param {('auto'|'length'|'initial'|'inherit')} [options.left] - Sets the left edge position
 * @param {('auto'|'length'|'initial'|'inherit')} [options.right] - Sets the right edge position
 * @param {number} [options.zIndex] - Set the z-index
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Position an Element
 * position(element, {
 *      top: '50px',
 *      bottom: '50px',
 *      left: '50px',
 *      right: '50px',
 *      zIndex: 50,
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function position(element, options){
    const { top, bottom, left, right, zIndex } = options;

    var endFrame = buildKeyframe({ top, bottom, left, right, zIndex });
    var startFrame = getComputedKeyframe(element, endFrame);
    var keyframes = [ startFrame, endFrame ];

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'position'
    });
}

/**
 * Adjust an Elements opacity
 * @param {Element} element The Element to fade
 * @param {Object} [options] The options object to apply to the fade
 * @param {number} [options.opacity] - Specifies the opacity. From 0.0 (fully transparent) to 1.0 (fully opaque)
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Fade an Element
 * fade(element, {
 *      opacity: 0.5,
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function fade(element, options){
    const { opacity, effectOptions } = options;

    var endFrame = buildKeyframe({ opacity });
    var startFrame = getComputedKeyframe(element, endFrame);
    var keyframes = [ startFrame, endFrame ];

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'fade'
    });
}

/**
 * Animates the columns of an Element
 * @param {Element} element The Element to animate the columns of
 * @param {Object} [options] The options object to apply to the animation
 * @param {('number'|'auto'|'initial'|'inherit')} [options.count] - The optimal number of columns into which the content of the element will be flowed. Default value is auto where the number of columns will be determined by other properties, like e.g. "column-width"
 * @param {('length'|'normal'|'initial'|'inherit')} [options.gap] - A specified length that will set the gap between the columns
 * @param {('auto'|'length'|'initial'|'inherit')} [options.width] - A length that specifies the width of the columns. The number of columns will be the minimum number of columns needed to show all the content across the element. Read about length units
 * @param {Object} [options.rule] - The column-rule property sets the width, style, and color of the rule between columns.
 * @param {('none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'initial'|'inherit')} [options.rule.style] - Sets the style of the rule between columns.
 * @param {('color'|'initial'|'inherit')} [options.rule.color] - Sets the color of the rule between columns.
 * @param {('medium'|'thin'|'thick'|'length'|'initial'|'inherit')} [options.rule.width] - Sets the width of the rule between columns.
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Animate the columns of an Element
 * column(element, {
 *      count: "3",
        gap: "5px",
        width: "auto",
        rule: {
            style: "solid",
            color: "black",
            width: "2px"
        },
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function column(element, options){
    const { count, gap, rule, width, effectOptions } = options;

    var endFrame = buildKeyframe({
        column: { count, gap, rule, width }
    });
    var startFrame = getComputedKeyframe(element, endFrame);
    var keyframes = [ startFrame, endFrame ];

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'column'
    });
}

/**
 * Adjust an Elements grid template or behavior inside of a grid element
 * @param {Element} element The Element to edit the grid styling of
 * @param {Object} [options] The options object to apply to the grid animation
 * @param {string} [options.area] - Specify a grid area name for this item to be assigned to
 * @param {Object} [options.auto] - rules for an auto-placed item grid
 * @param {('auto'|'max-content'|'min-content'|'length')} [options.auto.columns] - Sets a size for the columns in a grid container.
 * @param {('row'|'column'|'dense'|'row dense'|'column dense')} [options.auto.flow] - controls how auto-placed items get inserted in the grid.
 * @param {('auto'|'max-content'|'min-content'|'length')} [options.auto.rows] - Sets a size for the rows in a grid container.
 * @param {Object} [options.column] - Specifies a grid item's size and location in a grid layout
 * @param {('auto'|'span n'|'column-line')} [options.column.end] - Specifies on which column-line to stop displaying the item, or how many columns to span.
 * @param {'length'} [options.column.gap] - Defines the size of the gap between the columns in a grid layout.
 * @param {('auto'|'span n'|'column-line')} [options.column.start] - Specifies on which column to start displaying the item.
 * @param {Object} [options.row] - specifies a grid item's size and location in a grid layout,
 * @param {('auto'|'row-line'|'span n')} [options.row.end] - Specifies on which row-line to stop displaying the item, or how many rows to span.
 * @param {'length'} [options.row.gap] - defines the size of the gap between the rows in a grid layout.
 * @param {('auto'|'row-line')} [options.row.start] - Specifies on which row to start displaying the item.
 * @param {Object} [options.template] - rules for a CSS grid layout
 * @param {('none'|'itemnames')} [options.template.areas] - specifies areas within the grid layout.
 * @param {('none'|'auto'|'max-content'|'min-content'|'length'|'initial'|'inherit')} [options.template.columns] - specifies the number (and the widths) of columns in a grid layout.
 * @param {('none'|'auto'|'max-content'|'min-content'|'length'|'initial'|'inherit')} [options.template.rows] - specifies the number (and the heights) of the rows in a grid layout.
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Animate the grid of an Element
 * grid(element, {
 *      area: 'name',
 *      auto: {
 *          columns: "auto",
 *          flow: "column dense",
 *          rows: "auto"
 *      },
 *      column: {
 *          end: "auto",
 *          gap: "length",
 *          start: "auto"
 *      },
 *      row: {
 *          end: "auto",
 *          gap:"length",
 *          start: "auto"
 *      },
 *      template: {
 *          areas: "itemnames",
 *          columns: "auto",
 *          rows: "auto"
 *      },
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function grid(element, options){
    const { area, auto, column, row, template, effectOptions } = options;

    var endFrame = buildKeyframe({
        grid: { area, auto, column, row, template }
    });
    var startFrame = getComputedKeyframe(element, endFrame);
    var keyframes = [ startFrame, endFrame ];

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'grid'
    });
}

/**
 * Adjust an Elements width and/or height
 * @param {Element} element The Element to resize
 * @param {Object} [options] The options object to apply to the resize
 * @param {('auto'|'value'|'initial'|'inherit')} [options.width] - Specifies the width of the element
 * @param {('auto'|'value'|'initial'|'inherit')} [options.height] - Specifies the height of the element
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Resize an Element
 * resize(element, {
 *      width: '200px',
 *      height: '50%',
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function resize(element, options){
    const { width, height, effectOptions } = options;

    var endFrame = buildKeyframe({ width, height });
    var startFrame = getComputedKeyframe(element, endFrame);
    var keyframes = [ startFrame, endFrame ];

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'resize'
    });
}

/**
 * Animates a filter on an image Element
 * @param {Element} element The Element to filter
 * @param {Object} [options] The options object to apply to the filter
 * @param {number} [options.blur] - Applies a blur effect to the image. A larger value will create more blur. If no value is specified, 0 is used.
 * @param {number} [options.brightness] - Adjusts the brightness of the image. 0% will make the image completely black. 100% (1) is default and represents the original image. Values over 100% will provide brighter results.
 * @param {number} [options.contrast] - Adjusts the contrast of the image. 0% will make the image completely black. 100% (1) is default, and represents the original image. Values over 100% will provide results with more contrast.
 * @param {Object} [options.dropShadow] - Applies a Drop shadow Filter
 * @param {number} [options.dropShadow.hShadow] - Specifies a pixel value for the horizontal shadow. Negative values place the shadow to the left of the image.
 * @param {number} [options.dropShadow.vShadow] - Specifies a pixel value for the vertical shadow. Negative values place the shadow above the image.
 * @param {number} [options.dropShadow.blur] - This is the third value, and must be in pixels. Adds a blur effect to the shadow. A larger value will create more blur (the shadow becomes bigger and lighter). Negative values are not allowed. If no value is specified, 0 is used (the shadow's edge is sharp).
 * @param {number} [options.dropShadow.spread] - This is the fourth value, and must be in pixels. Positive values will cause the shadow to expand and grow bigger, and negative values will cause the shadow to shrink. If not specified, it will be 0 (the shadow will be the same size as the element). Note: Chrome, Safari and Opera, and maybe other browsers, do not support this 4th length; it will not render if added.
 * @param {string} [options.dropShadow.color] - The color for the shadow
 * @param {number} [options.grayscale] - Converts the image to grayscale. 0% (0) is default and represents the original image. 100% will make the image completely gray (used for black and white images). Note: Negative values are not allowed.
 * @param {number} [options.hueRotate] - Applies a hue rotation on the image. The value defines the number of degrees around the color circle the image samples will be adjusted. 0deg is default, and represents the original image.Note: Maximum value is 360deg.    
 * @param {number} [options.invert] - Inverts the samples in the image. 0% (0) is default and represents the original image. 100% will make the image completely inverted. Note: Negative values are not allowed.
 * @param {number} [options.opacity] - Sets the opacity level for the image. The opacity-level describes the transparency-level, where: 0% is completely transparent. 100% (1) is default and represents the original image (no transparency). Note: Negative values are not allowed. Tip: This filter is similar to the opacity property.
 * @param {number} [options.saturate] - Saturates the image. 0% (0) will make the image completely un-saturated. 100% is default and represents the original image. Values over 100% provides super-saturated results. Note: Negative values are not allowed.
 * @param {number} [options.sepia] - Converts the image to sepia. 0% (0) is default and represents the original image. 100% will make the image completely sepia. Note: Negative values are not allowed.
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Filter an image Element
 * filter(element, {
 *      blur: 5,
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
            color: 'black',
            spread: 5
        }
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function filter(element, options){
    const { blur, brightness, contrast, dropShadow, effectOptions, grayscale, hueRotate, invert, opacity, saturate, sepia } = options;

    var endFrame = buildKeyframe({
        filter: { blur, brightness, contrast, dropShadow, grayscale, hueRotate, invert, opacity, saturate, sepia }
    });
    var startFrame = getComputedKeyframe(element, endFrame);
    var keyframes = [ startFrame, endFrame ];

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'filter'
    });
}

/**
 * Adjust an Elements outline
 * @param {Element} element The Element to animate the outline of
 * @param {Object} [options] The options object to apply to the outline
 * @param {('none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'initial'|'inherit')} [options.style] Sets the style of the outline
 * @param {('invert'|'color'|'initial'|'inherit')} [options.color] - Sets the color of the outline
 * @param {('medium'|'thin'|'thick'|'length'|'initial'|'inherit')} [options.width] - Sets the width of the outline
 * @param {('length'|'initial'|'inherit')} [options.offset] - The distance the outline is outset from the border edge. Default value is 0
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Outline an Element
 * outline(element, {
 *      style: 'solid'
 *      color: "color",
 *      offset: "0px",
 *      width: "medium",
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function outline(element, options){
    const { style, color, offset, width, effectOptions } = options;

    var endFrame = buildKeyframe({
        outline: { color, offset, style, width }
    });
    var startFrame = getComputedKeyframe(element, endFrame);
    var keyframes = [ startFrame, endFrame ];

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'outline'
    });
}

/**
 * Adjust an Elements background
 * @param {Element} element The Element to animate the background of
 * @param {Object} [options] The options object to apply to the background
 * @param {('color'|'transparent'|'initial'|'inherit')} [options.color] - A CSS valid color for the background
 * @param {('left top'|'left center'|'left bottom'|'right top'|'right center'|'right bottom'|'center top'|'center center'|'center bottom'|'x% y%'|'xpos ypos'|'initial'|'inherit')} [options.position] - sets the starting position of a background image.
 * @param {('auto'|'length'|'cover'|'contain'|'initial'|'inherit')} [options.size] - specifies the size of the background images.
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Animate the background of an Element
 * background(element, {
 *      color: 'black',
 *      position: 'left top',
 *      size: 'cover',
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function background(element, options){
    const { color, position, size, effectOptions } = options;

    var endFrame = buildKeyframe({
        background: { color, position, size }
    });
    var startFrame = getComputedKeyframe(element, endFrame);
    var keyframes = [ startFrame, endFrame ];

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'background'
    });
}

/**
 * Animate the font within an Element
 * @param {Element} element The Element to animate the font of
 * @param {Object} [options] The options object to apply to the animation
 * @param {('color'|'initial'|'inherit')} [options.color] - The color to style the font
 * @param {('medium'|'xx-small'|'x-small'|'small'|'large'|'x-large'|'xx-large'|'smaller'|'larger'|'length'|'initial'|'inherit')} [options.size] - sets the size of a font
 * @param {('normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900')} [options.weight] - The line thickness for the font
 * @param {('color'|'initial'|'inherit')} [options.decorationColor] - Specifies the color of the text-decoration
 * @param {Object[]} [options.shadows] - adds shadow to text.
 * @param {number} [options.shadows[].hShadow] - Specifies a pixel value for the horizontal shadow. Negative values place the shadow to the left of the text.
 * @param {number} [options.shadows[].vShadow] - Specifies a pixel value for the vertical shadow. Negative values place the shadow above the text.
 * @param {number} [options.shadows[].blurRadius] - This is the third value, and must be in pixels. Adds a blur effect to the shadow. A larger value will create more blur (the shadow becomes bigger and lighter). Negative values are not allowed. If no value is specified, 0 is used (the shadow's edge is sharp).
 * @param {string} [options.shadows[].color] - The color for the text shadow
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Animate the font in the Element
 * font(element, {
 *      
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function font(element, options){
    const { color, decorationColor, effectOptions, shadows, size, weight } = options;

    var endFrame = buildKeyframe({
        font: { color, decorationColor, shadows, size, weight }
    });
    var startFrame = getComputedKeyframe(element, endFrame);
    var keyframes = [ startFrame, endFrame ];

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'font'
    });
}

/**
 * Animate the font within an Element
 * @param {Element} element The Element to animate the font of
 * @param {Object} [options] The options object to apply to the animation
 * @param {Object[]} [options.boxShadows] - CSS box-shadow properties
 * @param {number} [options.boxShadows[].hOffset] - REQUIRED The horizontal offset of the shadow. A positive value puts the shadow on the right side of the box, a negative value puts the shadow on the left side of the box
 * @param {number} [options.boxShadows[].vOffset] - REQUIRED The vertical offset of the shadow. A positive value puts the shadow below the box, a negative value puts the shadow above the box
 * @param {number} [options.boxShadows[].blur] - The blur radius. The higher the number, the more blurred the shadow will be
 * @param {number} [options.boxShadows[].spread] - The spread radius. A positive value increases the size of the shadow, a negative value decreases the size of the shadow
 * @param {string} [options.boxShadows[].color] - The color of the shadow. The default value is the text color. Look at CSS Color Values for a complete list of possible color values. Note: In Safari (on PC) the color parameter is If you do not specify the color, the shadow is not displayed at all.
 * @param {boolean} [options.boxShadows[].inset] - Changes the shadow from an outer shadow (outset) to an inner shadow
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Animate the shadow of an Element
 * shadow(element, {
 *      boxShadows: [
 *          {
 *              blur: 3,
 *              color: 'rgb(0,0,0)',
 *              hOffset: 1,
 *              vOffset: 1,
 *              spread: 1,
 *              inset: true
 *          }
 *      ]
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function shadow(element, options){
    const { boxShadows, effectOptions } = options;

    var endFrame = buildKeyframe({ boxShadows });
    var startFrame = getComputedKeyframe(element, endFrame);
    var keyframes = [ startFrame, endFrame ];

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'boxShadow'
    });
}

/**
 * Adjust an Elements border
 * @param {Element} element The Element to adjust the border of
 * @param {Object} [options] The options object to apply to the animation
 * @param {Object} [options.all] - Affects all sides of the element
 * @param {('none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'initial'|'inherit')} [options.all.style] The style for the border
 * @param {('medium'|'thin'|'thick'|'length'|'initial'|'inherit')} [options.all.width] - The width of the border
 * @param {('color'|'transparent'|'initial'|'inherit')} [options.all.color] - The color for the border
 * @param {('length'|'initial'|'inherit')} [options.all.spacing] - The space in px between the element and the border
 * @param {Object} [options.top] - Affects the top sides of the element
 * @param {('none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'initial'|'inherit')} [options.top.style] The style for the border
 * @param {('medium'|'thin'|'thick'|'length'|'initial'|'inherit')} [options.top.width] - The width of the border
 * @param {('color'|'transparent'|'initial'|'inherit')} [options.top.color] - The color for the border
 * @param {('length'|'%')} [options.top.leftRadius] - Defines the shape of the top left corner
 * @param {('length'|'%')} [options.top.rightRadius] - Defines the shape of the top right corner
 * @param {Object} [options.bottom] - Affects the bottom of the element
 * @param {('none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'initial'|'inherit')} [options.bottom.style] The style for the border
 * @param {('medium'|'thin'|'thick'|'length'|'initial'|'inherit')} [options.bottom.width] - The width of the border
 * @param {('color'|'transparent'|'initial'|'inherit')} [options.bottom.color] - The color for the border
 * @param {('length'|'%')} [options.bottom.leftRadius] - Defines the shape of the top left corner
 * @param {('length'|'%')} [options.bottom.rightRadius] - Defines the shape of the top right corner
 * @param {Object} [options.left] - Affects the left of the element
 * @param {('none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'initial'|'inherit')} [options.left.style] The style for the border
 * @param {('medium'|'thin'|'thick'|'length'|'initial'|'inherit')} [options.left.width] - The width of the border
 * @param {('color'|'transparent'|'initial'|'inherit')} [options.left.color] - The color for the border
 * @param {Object} [options.right] - Affects the right of the element
 * @param {('none'|'hidden'|'dotted'|'dashed'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'initial'|'inherit')} [options.right.style] The style for the border
 * @param {('medium'|'thin'|'thick'|'length'|'initial'|'inherit')} [options.right.width] - The width of the border
 * @param {('color'|'transparent'|'initial'|'inherit')} [options.right.color] - The color for the border
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Animate the border of an Element
 * border(element, {
 *      all: {
            color: "black",
            spacing: "2px",
            width: "2px"
        },
        bottom: {
            color: "black",
            leftRadius: "50%",
            rightRadius: "50%",
            width: "2px"
        },
        left: {
            color: "black",
            width: "2px"
        },
        right: {
            color: "black",
            width: "2px"
        },
        top: {
            color: "black",
            leftRadius: "50%",
            rightRadius: "50%",
            width: "2px"
        },
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function border(element, options){
    const { all, top, bottom, left, right } = options;

    var endFrame = buildKeyframe({
        border: { all, top, bottom, left, right }
    });
    var startFrame = getComputedKeyframe(element, endFrame);
    var keyframes = [ startFrame, endFrame ];

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'border'
    });
}



/**
 * Squish an Element by reducing it's height and expanding it's width simultaneously
 * @param {Element} element The Element to apply the squish animation to
 * @param {Object} [options] An object of options to add to the squish
 * @param {number} [options.squishPercent] the percent amount the Element will squish down to
 * @param {boolean} [options.offsetHeight] Determines if the element should offset the height to keep the bottom of the element in place
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the animation has finished
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Squish element (Normally you would not need these properties since these are the default values, these are just to display all of the possible values)
 * squish(element, {
 *      squishPercent = 75, // default
 *      offsetHeight = true, // default
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function squish(element, options = {}){
    const {
        squishPercent = 75,
        offsetHeight = true,
        effectOptions = {}
    } = options;

    var elementHeight = element.getBoundingClientRect().height / 2;
    var squishValue = squishPercent / 100;
    var heightOffset = elementHeight - (elementHeight * (1.0 - squishValue));

    var endFrame = buildKeyframe({
        transform: {
            scale: {
                x: 1.0 + squishValue,
                y: 1.0 - squishValue
            }
        }
    });
    var startFrame = getComputedKeyframe(element, endFrame);

    var keyframes = [
        startFrame,
        endFrame
    ];

    if (offsetHeight) {
        keyframes[0].top = 0;
        keyframes[1].top = `${heightOffset}px`;
    }

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'squish'
    });
}

/**
 * Spins an element clockwise (or counter-clockwise depending on the value for degrees)
 * @param {Element} element The element to be spun
 * @param {Object} [options] An object of options to add to the spin
 * @param {number} [options.degrees] The degree of rotation (use a negative value for counter-clockwise rotation)
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the animation has finished
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Spin element (Normally you would not need these properties since these are the default values, these are just to display all of the possible values)
 * spin(element, {
 *      degrees = 360, // default
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the animation finishes
 *      });
 */
export async function spin(element, options = {}){
    const {
        degrees = 360,
        effectOptions
    } = options;

    var endFrame = buildKeyframe({
        transform: {
            rotate: degrees
        }
    });
    var startFrame = getComputedKeyframe(element, endFrame);
    var keyframes = [ startFrame, endFrame ];

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'spin'
    });
}

/**
 * Make an element orbit around it's current position
 * @param {Element} element The Element to apply the orbit animation to
 * @param {Object} [options] The options object to apply to the orbit
 * @param {number} [options.radius] The length the Element will be from the center of the orbit | Default: 100
 * @param {number} [options.points] The number of time the element will change direction during the orbit (Affects the shape of the orbit)
 * @param {KeyframeEffectOptions} [options.effectOptions] The keyframe effect options to apply to this animation
 * @return {Promise<Element>} A Promise once the element has reached the end of it's animation
 * @example
 * var element = document.querySelector('#id');
 * 
 * // Orbit element (Normally you would not need these properties since these are the default values, these are just to display all of the possible values)
 * orbit(element, {
 *      radius: 100, // default
 *      points: 4, // default
 *      effectOptions: {
 *          duration: 500
 *          // etc...
 *      }
 * })
 *      .then(() => {
 *          //Do somthing here once the orbit starts
 *      });
 */
export async function orbit(element, options = {}){
    const { 
        radius = 100,
        points = 4,
        effectOptions = {}
    } = options;

    // calling unitRegExp.exec('100px') returns '100'
    // calling '100px'.replace(unitRegExp) returns 'px'
    // This works for all other unit types as well
    const unitRegExp = /[0-9]+\.?[0-9]*/g;

    /** center x */
    var cx = 0;
    /** center y */
    var cy = 0;
    /** center angle */
    var centerAng = 2 * Math.PI / points;
    /** radius from center to point */
    var r =  radius;
    /** starting angle: 90 = 12 O'Clock */
    var startAng = Math.PI * 90 / 180
    
    // add vertexes to keyframes
    var keyframes = [];
    for(var i = 0 ; i < points ; i++){
        let ang = startAng + (i * centerAng);
        let vx = Math.round(cx + r * Math.cos(ang));
        let vy = Math.round(cy - r * Math.sin(ang));

        let newKeyframe = buildKeyframe({
            transform: {
                translate: {
                    x: vx,
                    y: vy
                }
            }
        });

        keyframes.push(newKeyframe);
    }
    keyframes.push(keyframes[0]);

    return choreograph({
        element,
        keyframes,
        effectOptions,
        animationId: 'orbit'
    });
}

/**
 * Choreograph with a capital 'C' is a React component for crudely wrapping Elements in an empty Animatable container that does not affect the layout of the page.
 * @param {Object} props The props object to pass to the container element
 */
export default function Choreograph(props){
    import('react')
        .then(react => {
            const { children, ...otherProps } = props;
            var element = react.createElement('div', { ...otherProps, style: { display: 'contents' } }, children);
            return element; /*(
                <div style={{...otherProps, display: 'contents'}}>
                    {children}
                </div>
            );*/
        });
}