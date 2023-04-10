const tailwindConfig = {
  // prefix: 'tw-',
  content: [
    // './plugins/oeyoews/**/*.{html,tid,md,js}',
    // './tiddlers/**/*!(StoryList).{js,tid,md}',
    // './tiddlers/**/*!(($%2FStoryList)).tid',
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // a: {
            //   textDecoration: `none`,
            // },
            'blockquote p:first-of-type::before': null,
            'blockquote p:last-of-type::after': null,
            code: {
              backgroundColor: theme('colors.slate.100'),
              borderRadius: theme('borderRadius.sm'),
              padding: `${theme('padding.1')} ${theme('padding.1.5')}`,
              border: `none`,
            },
            'code::before': {
              content: 'normal',
            },
            'code::after': {
              content: 'normal',
            },
          },
        },
      }),
    },
  },
  darkMode: 'class',
  // darkMode: ['class', '[data-mode="dark"]'],
  variants: {
    extend: {
      appearance: ['hover', 'focus'],
    },
  },
  // plugins: [require('@tailwindcss/typography')],
  important: true,
  corePlugins: {
    preflight: false,
  },
};

module.exports = tailwindConfig;
