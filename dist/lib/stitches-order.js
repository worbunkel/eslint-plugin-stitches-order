"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const lodash_1 = __importDefault(require("lodash"));
const propertyOrder = [
    // All
    'all',
    // Positioning
    'position',
    'top',
    'right',
    'bottom',
    'left',
    'zIndex',
    // Box model
    'display',
    'flex',
    'flexBasis',
    'flexDirection',
    'flexFlow',
    'flexGrow',
    'flexShrink',
    'flexWrap',
    'grid',
    'gridArea',
    'gridAutoRows',
    'gridAutoColumns',
    'gridAutoFlow',
    'gridGap',
    'gridRow',
    'gridRowStart',
    'gridRowEnd',
    'gridRowGap',
    'gridColumn',
    'gridColumnStart',
    'gridColumnEnd',
    'gridColumnGap',
    'gridTemplate',
    'gridTemplateAreas',
    'gridTemplateRows',
    'gridTemplateColumns',
    'gap',
    'alignContent',
    'alignItems',
    'alignSelf',
    'justifyContent',
    'justifyItems',
    'justifySelf',
    'order',
    'float',
    'clear',
    'boxSizing',
    'width',
    'minWidth',
    'maxWidth',
    'height',
    'minHeight',
    'maxHeight',
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'border',
    'borderColor',
    'borderStyle',
    'borderWidth',
    'borderTop',
    'borderTopColor',
    'borderTopWidth',
    'borderTopStyle',
    'borderRight',
    'borderRightColor',
    'borderRightWidth',
    'borderRightStyle',
    'borderBottom',
    'borderBottomColor',
    'borderBottomWidth',
    'borderBottomStyle',
    'borderLeft',
    'borderLeftColor',
    'borderLeftWidth',
    'borderLeftStyle',
    'borderRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius',
    'borderImage',
    'borderImageSource',
    'borderImageSlice',
    'borderImageWidth',
    'borderImageOutset',
    'borderImageRepeat',
    'borderCollapse',
    'borderSpacing',
    'objectFit',
    'objectPosition',
    'overflow',
    'overflowX',
    'overflowY',
    // Typography
    'color',
    'font',
    'fontWeight',
    'fontSize',
    'fontFamily',
    'fontStyle',
    'fontVariant',
    'fontSizeAdjust',
    'fontStretch',
    'fontEffect',
    'fontEmphasize',
    'fontEmphasizePosition',
    'fontEmphasizeStyle',
    'fontSmooth',
    'lineHeight',
    'direction',
    'letterSpacing',
    'whiteSpace',
    'textAlign',
    'textAlignLast',
    'textTransform',
    'textDecoration',
    'textEmphasis',
    'textEmphasisColor',
    'textEmphasisStyle',
    'textEmphasisPosition',
    'textIndent',
    'textJustify',
    'textOutline',
    'textWrap',
    'textOverflow',
    'textOverflowEllipsis',
    'textOverflowMode',
    'textOrientation',
    'textShadow',
    'verticalAlign',
    'wordWrap',
    'wordBreak',
    'wordSpacing',
    'overflowWrap',
    'tabSize',
    'hyphens',
    'unicodeBidi',
    'columns',
    'columnCount',
    'columnFill',
    'columnGap',
    'columnRule',
    'columnRuleColor',
    'columnRuleStyle',
    'columnRuleWidth',
    'columnSpan',
    'columnWidth',
    'pageBreakAfter',
    'pageBreakBefore',
    'pageBreakInside',
    'src',
    // Visual
    'listStyle',
    'listStylePosition',
    'listStyleType',
    'listStyleImage',
    'tableLayout',
    'emptyCells',
    'captionSide',
    'background',
    'backgroundColor',
    'backgroundImage',
    'backgroundRepeat',
    'backgroundPosition',
    'backgroundPositionX',
    'backgroundPositionY',
    'backgroundSize',
    'backgroundClip',
    'backgroundOrigin',
    'backgroundAttachment',
    'backgroundBlendMode',
    'outline',
    'outlineWidth',
    'outlineStyle',
    'outlineColor',
    'outlineOffset',
    'boxShadow',
    'boxDecorationBreak',
    'transform',
    'transformOrigin',
    'transformStyle',
    'backfaceVisibility',
    'perspective',
    'perspectiveOrigin',
    'visibility',
    'cursor',
    'opacity',
    'filter',
    'isolation',
    'backdropFilter',
    'mixBlendMode',
    // Animation
    'transition',
    'transitionDelay',
    'transitionTimingFunction',
    'transitionDuration',
    'transitionProperty',
    'animation',
    'animationName',
    'animationDuration',
    'animationPlayState',
    'animationTimingFunction',
    'animationDelay',
    'animationIterationCount',
    'animationDirection',
    'animationFillMode',
    // Misc
    'appearance',
    'content',
    'clip',
    'clipPath',
    'counterReset',
    'counterIncrement',
    'resize',
    'userSelect',
    'navIndex',
    'navUp',
    'navRight',
    'navDown',
    'navLeft',
    'pointerEvents',
    'quotes',
    'touchAction',
    'willChange',
    'zoom',
    'fill',
    'fillRule',
    'clipRule',
    'stroke',
];
const alwaysEndingProperties = [
    // Stitches specific
    'variants',
    'compoundVariants',
    'defaultVariants',
];
const createRule = utils_1.ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);
exports.default = createRule({
    name: 'stitches-order',
    meta: {
        fixable: 'code',
        messages: {
            stitchesOrder: 'Incorrect order of stitches css properties',
        },
        docs: {
            description: 'Stitches declarations should be ordered rationally',
            recommended: 'warn',
        },
        type: 'suggestion',
        schema: [],
    },
    defaultOptions: [],
    create: context => {
        return {
            CallExpression(node) {
                if (node.callee.type === 'Identifier' && node.callee.name === 'styled') {
                    const argument2 = node.arguments[1];
                    if (argument2.type === 'ObjectExpression') {
                        const properties = argument2.properties;
                        const sourceCode = context.getSourceCode();
                        const propertiesWithSourceCode = properties.map((property, originalIndex) => (Object.assign(Object.assign({}, property), { originalIndex, sourceCode: sourceCode.text.substring(...property.range) })));
                        const sortedProperties = lodash_1.default.orderBy(propertiesWithSourceCode, property => {
                            const propertyName = property.type === 'Property' && property.key.type === 'Identifier' ? property.key.name : '';
                            const isSpread = property.type === 'SpreadElement';
                            const propertyOrderIndex = lodash_1.default.indexOf(propertyOrder, propertyName);
                            const alwaysEndingPropertyIndex = lodash_1.default.indexOf(alwaysEndingProperties, propertyName);
                            if (propertyOrderIndex !== -1) {
                                return propertyOrderIndex;
                            }
                            if (alwaysEndingPropertyIndex !== -1) {
                                return alwaysEndingPropertyIndex + propertyOrder.length + 2;
                            }
                            if (isSpread) {
                                return -1;
                            }
                            return propertyOrder.length + 1;
                        });
                        if (!lodash_1.default.isEqual(propertiesWithSourceCode, sortedProperties)) {
                            context.report({
                                node: argument2,
                                messageId: 'stitchesOrder',
                                fix: fixer => fixer.replaceText(argument2, `{ ${lodash_1.default.map(sortedProperties, sortedProperty => sortedProperty.sourceCode).join(',\n')} }`),
                            });
                        }
                    }
                }
            },
        };
    },
});
//# sourceMappingURL=stitches-order.js.map