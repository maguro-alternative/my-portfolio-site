import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SnowContainer from './SnowContainer';

const meta = {
  title: 'features/SnowContainer',
  component: SnowContainer,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SnowContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
