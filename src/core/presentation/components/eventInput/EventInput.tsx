import { UseFormRegister } from 'react-hook-form';

interface FormValues {
  eventName: string;
  location: string;
  schedule: Date;
  costCategory: string;
  costValue: number;
}

interface EventInputProps {
  id: keyof FormValues;
  label: string;

  inputText: string;
  register: UseFormRegister<FormValues>;
}
import RequiredDot from '../requiredDot/RequiredDot.tsx';

const EventInput: React.FC<EventInputProps> = ({
  id,
  label,
  inputText,
  register,
}) => {
  return (
    <article className="flex flex-col w-full items-start gap-[10px]">
      <div className="flex">
        <label htmlFor={id}>{label}</label>
        <RequiredDot />
      </div>
      <input
        className={`form-input-radius ${id === 'location' ? 'w-[95%]' : 'w-full'}`}
        id={id}
        placeholder={inputText}
        type="text"
        {...register(id)} // register를 사용하여 입력 필드를 등록합니다.
      />
    </article>
  );
};

export default EventInput;