const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  babel: async (options) => ({
    ...options,
    presets: [
      ...options.presets,
      [
	'@babel/preset-react', {
	  runtime: 'automatic',
	},
        'preset-react-jsx-transform' // Can name this anything, just an arbitrary alias to avoid duplicate presets'
      ],
    ],
  }),
};
