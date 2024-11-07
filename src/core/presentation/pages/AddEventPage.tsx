import EventInput from '../components/eventInput/EventInput.tsx';
import AddEventHeader from '../components/addEventHeader/AddEventHeader.tsx';
import { useRef } from 'react';
const AddEventPage: React.FC = () => {
  const eventName = useRef('');
  const location = useRef('');
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ref: React.MutableRefObject<string>,
  ) => {
    ref.current = e.target.value;
  };
  return (
    <>
      <AddEventHeader message="이벤트 추가하기" />
      <EventInput
        id="event name"
        label="이벤트 이름"
        inputRef={eventName}
        onChange={onChange}
        inputText="이벤트 이름을 입력해 주세요."
      />
      <EventInput
        id="place"
        label="장소"
        inputRef={location}
        onChange={onChange}
        inputText="주소 입력"
      />
    </>
  );
};

export default AddEventPage;
