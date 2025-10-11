import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SpotlightAndWave from './SpotLightAndWave';

const meta = {
  title: 'features/SpotLightAndWave',
  component: SpotlightAndWave,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SpotlightAndWave>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
