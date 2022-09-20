import { ESLintUtils } from '@typescript-eslint/utils';
import _ from 'lodash';

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

const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

export default createRule({
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
      ObjectExpression(node) {
        const ancestors = context.getAncestors();
        const hasStyledAncestor = _.some(
          ancestors,
          ancestor =>
            ancestor.type === 'CallExpression' &&
            ancestor.callee.type === 'Identifier' &&
            ancestor.callee.name === 'styled',
        );
        if (hasStyledAncestor) {
          const properties = node.properties;
          const sourceCode = context.getSourceCode();
          const nodeSource = sourceCode.text.substring(...node.range);
          const propertiesWithSourceCode = properties.map((property, originalIndex) => ({
            ...property,
            originalIndex,
            rangeInNodeSource: property.range.map(rangeIndex => rangeIndex - node.range[0]),
            sourceCode: sourceCode.text.substring(...property.range),
          }));
          const sortedProperties = _.orderBy(propertiesWithSourceCode, property => {
            const propertyName =
              property.type === 'Property' && property.key.type === 'Identifier' ? property.key.name : '';
            const isSpread = property.type === 'SpreadElement';
            const propertyOrderIndex = _.indexOf(propertyOrder, propertyName);
            const alwaysEndingPropertyIndex = _.indexOf(alwaysEndingProperties, propertyName);
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
          if (!_.isEqual(propertiesWithSourceCode, sortedProperties)) {
            const propertiesByOriginalIndex = _.keyBy(sortedProperties, 'originalIndex');
            const sortedPropertiesWithNewIndex = _.map(sortedProperties, (property, newIndex) => ({
              ...property,
              newIndex,
            }));
            let fixedCode = nodeSource;
            _.forEach(_.reverse(sortedPropertiesWithNewIndex), property => {
              const oldProperty = propertiesByOriginalIndex[property.newIndex];
              fixedCode =
                fixedCode.substring(0, oldProperty.rangeInNodeSource[0]) +
                property.sourceCode +
                fixedCode.substring(oldProperty.rangeInNodeSource[1]);
            });
            context.report({
              node: node,
              messageId: 'stitchesOrder',
              fix: fixer => fixer.replaceText(node, fixedCode),
            });
          }
        }
      },
    };
  },
});
