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
            name: 'Should pass when properties are in the correct order on the same line',
            code: `const ContentRow = styled(Row, { alignItems: 'flex-start', width: '100%' });`,
        },
    ],
    invalid: [
        {
            name: 'Should fail when properties are not in the correct order on the same line',
            code: `const ContentRow = styled(Row, { width: '100%', alignItems: 'flex-start' });`,
            output: `const ContentRow = styled(Row, { alignItems: 'flex-start', width: '100%' });`,
            errors: [{ messageId: 'stitchesOrder' }],
        },
    ],
});
ruleTester.run('stitches-order', stitches_order_1.default, {
    valid: [
        {
            name: 'Should pass when properties are in the correct order on multiple lines',
            code: `const InitialsAvatar = styled(ButtonText, {
        display: 'flex',
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
        },
      });`,
        },
    ],
    invalid: [
        {
            name: 'Should fail when properties are not in the correct order on multiple lines',
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
            output: `const InitialsAvatar = styled(ButtonText, {
        display: 'flex',
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
        },
      });`,
        },
    ],
});
ruleTester.run('stitches-order', stitches_order_1.default, {
    valid: [],
    invalid: [
        {
            name: 'Should sort first level properties first',
            code: `const ButtonElement = styled('button', {
        gap: '8px',
        display: 'flex',
        '&:hover': {
          backgroundColor: theme.colors.primaryDark,
        },
        variants: {
          mode: {
            one: {
              backgroundColor: theme.colors.primary,
              color: theme.colors.white,
            },
            two: {
              color: theme.colors.primary,
              padding: 'unset',
            },
          },
        },
      });`,
            errors: [{ messageId: 'stitchesOrder' }, { messageId: 'stitchesOrder' }, { messageId: 'stitchesOrder' }],
            output: `const ButtonElement = styled('button', {
        display: 'flex',
        gap: '8px',
        '&:hover': {
          backgroundColor: theme.colors.primaryDark,
        },
        variants: {
          mode: {
            one: {
              backgroundColor: theme.colors.primary,
              color: theme.colors.white,
            },
            two: {
              color: theme.colors.primary,
              padding: 'unset',
            },
          },
        },
      });`,
        },
        {
            name: 'Should sort second level properties next',
            code: `const ButtonElement = styled('button', {
        display: 'flex',
        gap: '8px',
        '&:hover': {
          backgroundColor: theme.colors.primaryDark,
        },
        variants: {
          mode: {
            one: {
              backgroundColor: theme.colors.primary,
              color: theme.colors.white,
            },
            two: {
              color: theme.colors.primary,
              padding: 'unset',
            },
          },
        },
      });`,
            errors: [{ messageId: 'stitchesOrder' }, { messageId: 'stitchesOrder' }],
            output: `const ButtonElement = styled('button', {
        display: 'flex',
        gap: '8px',
        '&:hover': {
          backgroundColor: theme.colors.primaryDark,
        },
        variants: {
          mode: {
            one: {
              color: theme.colors.white,
              backgroundColor: theme.colors.primary,
            },
            two: {
              padding: 'unset',
              color: theme.colors.primary,
            },
          },
        },
      });`,
        },
    ],
});
ruleTester.run('stitches-order', stitches_order_1.default, {
    valid: [],
    invalid: [
        {
            name: 'Should leave one-line objects alone',
            code: `const ButtonElement = styled('button', { gap: '8px', display: 'flex' });`,
            errors: [{ messageId: 'stitchesOrder' }],
            output: `const ButtonElement = styled('button', { display: 'flex', gap: '8px' });`,
        },
        {
            name: 'Should leave multi-line objects alone',
            code: `const ButtonElement = styled('button', {
        gap: '8px',
        display: 'flex',
      });`,
            errors: [{ messageId: 'stitchesOrder' }],
            output: `const ButtonElement = styled('button', {
        display: 'flex',
        gap: '8px',
      });`,
        },
        {
            name: 'Should leave comments alone',
            code: `const ButtonElement = styled('button', {
        // comment to leave alone
        gap: '8px',
        display: 'flex',
      });`,
            errors: [{ messageId: 'stitchesOrder' }],
            output: `const ButtonElement = styled('button', {
        // comment to leave alone
        display: 'flex',
        gap: '8px',
      });`,
        },
    ],
});
//# sourceMappingURL=stitches-order.spec.js.map