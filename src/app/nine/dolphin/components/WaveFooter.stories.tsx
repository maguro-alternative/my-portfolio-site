import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WaveFooter } from './WaveFooter';

const meta = {
  title: 'nine/dolphin/WaveFooter',
  component: WaveFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WaveFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
