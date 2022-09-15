"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const stitches_order_1 = __importDefault(require("./stitches-order"));
const ruleTester = new utils_1.ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
});
ruleTester.run('stitches-order', stitches_order_1.default, {
    valid: [
        {
            code: `const ContentRow = styled(Row, { alignItems: 'flex-start',
width: '100%' });`,
        },
    ],
    invalid: [
        {
            code: `const ContentRow = styled(Row, { width: '100%',
alignItems: 'flex-start' });`,
            output: `const ContentRow = styled(Row, { alignItems: 'flex-start',
width: '100%' });`,
            errors: [{ messageId: 'stitchesOrder' }],
        },
    ],
});
ruleTester.run('stitches-order', stitches_order_1.default, {
    valid: [
        {
            code: `const InitialsAvatar = styled(ButtonText, { display: 'flex',
alignItems: 'center',
justifyContent: 'center',
minWidth: '40px',
maxWidth: '40px',
minHeight: '40px',
maxHeight: '40px',
borderRadius: '9999px',
color: theme.colors.white,
backgroundColor: theme.colors.primary,
unselectable: true,
variants: {
    isClickable: {
      true: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.colors.primaryDark,
        },
        '&:active': {
          backgroundColor: theme.colors.primary,
        },
      },
    },
  } });`,
        },
    ],
    invalid: [
        {
            code: `const InitialsAvatar = styled(ButtonText, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '40px',
  minHeight: '40px',
  maxWidth: '40px',
  maxHeight: '40px',
  borderRadius: '9999px',
  backgroundColor: theme.colors.primary,
  color: theme.colors.white,
  unselectable: true,
  variants: {
    isClickable: {
      true: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.colors.primaryDark,
        },
        '&:active': {
          backgroundColor: theme.colors.primary,
        },
      },
    },
  },
});`,
            errors: [{ messageId: 'stitchesOrder' }],
            output: `const InitialsAvatar = styled(ButtonText, { display: 'flex',
alignItems: 'center',
justifyContent: 'center',
minWidth: '40px',
maxWidth: '40px',
minHeight: '40px',
maxHeight: '40px',
borderRadius: '9999px',
color: theme.colors.white,
backgroundColor: theme.colors.primary,
unselectable: true,
variants: {
    isClickable: {
      true: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.colors.primaryDark,
        },
        '&:active': {
          backgroundColor: theme.colors.primary,
        },
      },
    },
  } });`,
        },
    ],
});
//# sourceMappingURL=stitches-order.spec.js.map