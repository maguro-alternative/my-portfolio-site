import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CharacterSearchCard } from './CharacterSearchCard';
import { fn } from '@storybook/test';

const meta = {
  title: 'nine/kagura/CharacterSearchCard',
  component: CharacterSearchCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onSearch: fn(),
    onSelect: fn(),
    onClear: fn(),
    onFocus: fn(),
  },
} satisfies Meta<typeof CharacterSearchCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    index: 0,
    selectedName: '',
    searchTerm: '',
    showSuggestions: false,
  },
};

export const WithSearchTerm: Story = {
  args: {
    index: 0,
    selectedName: '',
    searchTerm: '飛鳥',
    showSuggestions: true,
  },
};

export const WithSelection: Story = {
  args: {
    index: 0,
    selectedName: '飛鳥',
    searchTerm: '',
    showSuggestions: false,
  },
};
