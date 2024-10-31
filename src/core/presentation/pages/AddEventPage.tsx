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
      <EventInput
        label="이벤트 이름"
        inputRef={eventName}
        onChange={onChange}
      />
      <EventInput label="장소" inputRef={location} onChange={onChange} />
      <AddEventHeader message="이벤트 추가하기" />
    </>
  );
};

export default AddEventPage;
