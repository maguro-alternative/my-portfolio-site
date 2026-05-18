import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WaveBackground } from './WaveBackground';

const meta = {
  title: 'nine/kagura/WaveBackground',
  component: WaveBackground,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WaveBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
