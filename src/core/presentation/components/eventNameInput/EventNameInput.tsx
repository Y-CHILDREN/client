import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormValues } from '../../pages/AddEventPage.tsx';
import RequiredDot from '../requiredDot/RequiredDot.tsx';

interface EventInputProps {
  id: keyof FormValues;
  label: string;
  inputText: string;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}

const EventNameInput: React.FC<EventInputProps> = ({
  id,
  label,
  inputText,
  register,
  errors,
}) => {
  return (
    <article className="flex flex-col w-full items-start gap-[10px] ">
      <div className="flex">
        <label htmlFor={id}>{label}</label>
        <RequiredDot />
      </div>
      <input
        className={'form-input-radius w-full'}
        id={id}
        placeholder={inputText}
        type="text"
        {...register(id)}
      />
      {errors[id] && (
        <p className="text-sm text-red-500">{errors[id]?.message}</p>
      )}
    </article>
  );
};

export default EventNameInput;
