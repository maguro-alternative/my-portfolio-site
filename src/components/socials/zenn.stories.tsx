import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Zenn from './zenn';

const meta = {
  title: 'commonUI/Zenn',
  component: Zenn,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Zenn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'maguro_alterna',
  },
};
