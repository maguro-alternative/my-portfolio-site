import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PreviewGrid } from './PreviewGrid';
import { fn } from '@storybook/test';
import { createRef } from 'react';

const meta = {
  title: 'nine/kagura/PreviewGrid',
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
      { name: '飛鳥', image: '/nine/kagura/asuka.webp' },
      { name: '斑鳩', image: '/nine/kagura/ikaruga.webp' },
      { name: '葛城', image: '/nine/kagura/katsuragi.webp' },
    ],
  },
};
