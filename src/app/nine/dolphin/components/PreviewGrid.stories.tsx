import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PreviewGrid } from './PreviewGrid';
import { fn } from '@storybook/test';
import { createRef } from 'react';

const meta = {
  title: 'nine/dolphin/PreviewGrid',
  component: PreviewGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onDownload: fn(),
    cardRef: createRef<HTMLDivElement>(),
  },
} satisfies Meta<typeof PreviewGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    title: '推しキャラプレビュー',
    selectedItems: [
      { name: '' },
      { name: '' },
      { name: '' },
    ],
  },
};

export const WithSelections: Story = {
  args: {
    title: '推しキャラプレビュー',
    selectedItems: [
      { name: '天宮つむぎ', image: '/nine/dolphin/tsumugi.webp' },
      { name: '天宮しずく', image: '/nine/dolphin/shizuku.webp' },
      { name: '花園花鈴', image: '/nine/dolphin/karin.webp' },
    ],
  },
};
