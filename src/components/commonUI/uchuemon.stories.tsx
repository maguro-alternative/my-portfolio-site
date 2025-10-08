import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Uchuemon from './uchuemon';

const meta = {
  title: 'commonUI/Uchuemon',
  component: Uchuemon,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Uchuemon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
