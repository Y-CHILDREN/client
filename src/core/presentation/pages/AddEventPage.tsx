import EventInput from '../components/eventInput/EventInput.tsx';
import AddEventHeader from '../components/addEventHeader/AddEventHeader.tsx';
import AddEventCalenderInput from '../components/addEventCalenderInput/AddEventCalenderInput.tsx';
import AddEventCostInput from '../components/addEventCostInput/AddEventCostInput.tsx';
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

  const handleAddressSearch = () => {
    console.log('검색할 주소:', location.current);
  };

  return (
    <>
      <AddEventHeader message="이벤트 추가하기" />
      <section className="flex flex-col w-[420px] items-stretch px-[20px] py-[20px] gap-[24px]">
        <EventInput
          id="event name"
          label="이벤트 이름"
          inputRef={eventName}
          onChange={onChange}
          inputText="이벤트 이름을 입력해 주세요."
        />
        <div className="flex justify-between w-full">
          <EventInput
            id="place"
            label="장소"
            inputRef={location}
            onChange={onChange}
            inputText="주소 입력"
          />
          <button
            className="mt-[35px] bg-gray-100 w-[120px] h-[50px] text-[15px]"
            onClick={handleAddressSearch}
          >
            주소 검색
          </button>
        </div>
        <AddEventCalenderInput />
        <AddEventCostInput />
      </section>
    </>
  );
};

export default AddEventPage;
