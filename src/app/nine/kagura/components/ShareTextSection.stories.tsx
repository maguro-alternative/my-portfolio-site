import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ShareTextSection } from './ShareTextSection';
import { fn } from '@storybook/test';

const meta = {
  title: 'nine/kagura/ShareTextSection',
  component: ShareTextSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onCopy: fn(),
  },
} satisfies Meta<typeof ShareTextSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    shareText: '私のシノビマスター推しキャラは、○○と○○と○○！',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    shareText: '',
    disabled: true,
  },
};
