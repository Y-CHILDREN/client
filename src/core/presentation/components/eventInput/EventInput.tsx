import { UseFormRegister } from 'react-hook-form';
import { FormValues } from '../../pages/AddEventPage.tsx';

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
        {...register(id)}
      />
    </article>
  );
};

export default EventInput;
