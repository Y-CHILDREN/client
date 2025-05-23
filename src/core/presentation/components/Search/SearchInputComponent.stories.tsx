import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SearchInputComponent from './SearchInputComponent';
import User from '../../../domain/entities/user.ts';

const meta: Meta<typeof SearchInputComponent> = {
  title: 'SearchInput/SearchInputComponent',
  component: SearchInputComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onMembersSelected: { action: 'searched' },
  },
  args: {
    onMembersSelected: action('onSearchResult'),
  },
};

export default meta;

// 더미 사용자 데이터
const dummyUsers: User[] = [
  {
    id: '1',
    provider: 'google',
    email: 'alice@example.com',
    user_image: 'https://example.com/image1.jpg',
    nickname: 'Alice',
    user_memo: 'Loves traveling',
    access_token: 'access_token_1',
    refresh_token: 'refresh_token_1',
  },
  {
    id: '2',
    provider: 'facebook',
    email: 'bob@example.com',
    user_image: 'https://example.com/image2.jpg',
    nickname: 'Bob',
    user_memo: 'Frequent flyer',
    access_token: 'access_token_2',
    refresh_token: 'refresh_token_2',
  },
  {
    id: '3',
    provider: 'twitter',
    email: 'charlie@example.com',
    user_image: 'https://example.com/image3.jpg',
    nickname: 'Charlie',
    user_memo: 'Adventure seeker',
    access_token: 'access_token_3',
    refresh_token: 'refresh_token_3',
  },
];

// 더미 데이터를 활용한 검색 시뮬레이션
const searchMock = (users: User[], email: string): User[] => {
  action('search')(email); // Record search action
  return users.filter((user) => user.email === email);
};

export const Basic: StoryObj<typeof SearchInputComponent> = {
  render: (args) => (
    <SearchInputComponent
      {...args}
      onMembersSelected={(users) => {
        console.log(users);
        const email = 'alice@example.com';
        const results = searchMock(dummyUsers, email);
        action('onSearchResult')(results.map((user) => user.email)); // Log only email addresses or similar
      }}
    />
  ),
};

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
