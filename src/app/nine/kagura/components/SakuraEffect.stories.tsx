import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SakuraEffect } from './SakuraEffect';

const meta = {
  title: 'nine/kagura/SakuraEffect',
  component: SakuraEffect,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SakuraEffect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
