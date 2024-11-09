interface EventInputProps {
  id: string;
  label: string;
  inputRef: React.MutableRefObject<string>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    ref: React.MutableRefObject<string>,
  ) => void;
  inputText: string;
}
import RequiredDot from '../requiredDot/RequiredDot.tsx';

const EventInput: React.FC<EventInputProps> = ({
  id,
  label,
  inputRef,
  onChange,
  inputText,
}) => {
  return (
    <article className="flex flex-col w-full items-start gap-[10px]">
      <div className="flex">
        <label htmlFor={id}>{label}</label>
        <RequiredDot />
      </div>
      <input
        className={`form-input-radius ${id === 'place' ? 'w-[95%]' : 'w-full'}`}
        id={id}
        placeholder={inputText}
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e, inputRef)
        }
      />
    </article>
  );
};

export default EventInput;
