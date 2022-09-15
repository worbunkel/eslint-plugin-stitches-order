import { ESLintUtils } from '@typescript-eslint/utils';
import rule from './stitches-order';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
});

ruleTester.run('stitches-order', rule, {
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

ruleTester.run('stitches-order', rule, {
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
