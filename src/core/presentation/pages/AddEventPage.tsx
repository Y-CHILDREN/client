import EventInput from '../components/eventInput/EventInput.tsx';
import AddEventHeader from '../components/addEventHeader/AddEventHeader.tsx';
import AddEventCalenderInput from '../components/addEventCalenderInput/AddEventCalenderInput.tsx';
import AddEventCostInput from '../components/addEventCostInput/AddEventCostInput.tsx';
import { useRef } from 'react';
import AddEventPostButton from '../components/addEventPostButton/AddEventPostButton.tsx';
import { useForm } from 'react-hook-form';

interface FormValues {
  eventName: string;
  location: string;
  schedule: Date;
  costCategory: string;
  costValue: number;
}
const AddEventPage: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const location = useRef<string>('');

  const handleAddressSearch = () => {
    console.log('검색할 주소:', location.current);
  };
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <>
      <AddEventHeader message="이벤트 추가하기" />
      <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col w-full h-full px-[20px] py-[20px] gap-[24px]">
          <EventInput
            register={register}
            id="eventName"
            label="이벤트 이름"
            inputText="이벤트 이름을 입력해 주세요."
          />
          <div className="flex justify-between w-full">
            <EventInput
              register={register}
              id="location"
              label="장소"
              inputText="주소 입력"
            />
            <button
              className="mt-[35px] bg-gray-100 w-[120px] h-[50px] text-[15px]"
              onClick={handleAddressSearch}
              type="button"
            >
              주소 검색
            </button>
          </div>
          <AddEventCalenderInput />
          <AddEventCostInput />
          <div className="mt-auto">
            <AddEventPostButton text={'추가 완료'} />
          </div>
        </section>
      </form>
    </>
  );
};

export default AddEventPage;
