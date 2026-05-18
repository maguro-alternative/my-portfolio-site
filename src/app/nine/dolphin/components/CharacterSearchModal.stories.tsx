import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CharacterSearchModal } from './CharacterSearchModal';
import { fn } from '@storybook/test';

const meta = {
  title: 'nine/dolphin/CharacterSearchModal',
  component: CharacterSearchModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onSelect: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof CharacterSearchModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    panelIndex: 0,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    panelIndex: 0,
  },
};
