import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import EventInput from './EventInput.tsx';
import { MutableRefObject } from 'react';

// storybook meta 정보 설정
const meta = {
  // component는 컴포넌트 위치
  component: EventInput,
  // title은 컴포넌트 그룹화할 이름
  title: 'components/EventInput',
  // parameters는 에드온 추가할 때 사용하는 거임
  parameters: {
    // 기본값은 padded 약간의 패딩추가, fullscreen, centered등이 있다.
    layout: 'padded',
  },
  // decorator는 컴포넌트가 렌더링될 위치, 맥락 ex) div tag로 wrapping 된다. 등을 가정해서 테스팅할 수 있도록 해준다.
  /* 
      tags: autodocs는 docs를 자동생성하게 해주는 옵션
      deprecated: 스토리 더이상 안쓰기
      experimental는 실험적인 기능 테스팅이라고 명시해주는 것
    */
  tags: ['autodocs'],
  // argsType은 props들을 어떻게 제어할지 방법 정하기
  argTypes: {
    // controls 패널에서 label을 텍스트로 입력할 수 있는 UI를 제공한다.
    label: { control: 'text', description: '입력 필드 라벨 텍스트' },
    // action 패널에 changed 기록이 남게 한다.
  },
  // args는 story에서 사용할 동적으로 변하는 값(props, inputs, styles)들의 기본값을 설정해주는 것
  // fn()은 이벤트 핸들러를 추적해서 Actions 패널에서 확인할 수 있도록 해준다.
  args: { label: 'Event Label' },
} satisfies Meta<typeof EventInput>;

export default meta;

// 기본 스토리 설정
export const Basic: StoryObj = {
  args: {
    label: 'Event Label',
    // 스토리북에선 useRef를 직접쓸 수 없어서 (최상위가 아니라) 아래처럼 해야한다.
    inputRef: { current: '' } as MutableRefObject<string>,
  },
};

// 커스텀 라벨 스토리
export const CustomLabel: StoryObj = {
  args: {
    label: 'Custom Event Input',
    inputRef: { current: '' } as MutableRefObject<string>,
  },
};

// onChange 핸들러 시연 스토리
export const WithOnChangeHandler: StoryObj = {
  args: {
    label: 'Input with Change Handler',
    onChange: fn(),
    inputRef: { current: '' } as MutableRefObject<string>,
  },
};
