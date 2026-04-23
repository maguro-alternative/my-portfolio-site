import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SelectionGrid } from './SelectionGrid';
import { fn } from '@storybook/test';

const meta = {
  title: 'nine/kagura/SelectionGrid',
  component: SelectionGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onPanelClick: fn(),
    onClearPanel: fn(),
  },
} satisfies Meta<typeof SelectionGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    selectedItems: [
      { name: '' },
      { name: '' },
      { name: '' },
    ],
  },
};

export const WithSelections: Story = {
  args: {
    selectedItems: [
      { name: '飛鳥', image: '/nine/kagura/asuka.webp' },
      { name: '斑鳩', image: '/nine/kagura/ikaruga.webp' },
      { name: '' },
    ],
  },
};
