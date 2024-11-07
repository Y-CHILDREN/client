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

const EventInput: React.FC<EventInputProps> = ({
  id,
  label,
  inputRef,
  onChange,
  inputText,
}) => {
  return id === 'place' ? (
    <section className="flex flex-col">
      <label className="" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-24 p-3 "
        id={id}
        placeholder={inputText}
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e, inputRef)
        }
      />
    </section>
  ) : (
    <section className="flex flex-col">
      <label className="" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        placeholder={inputText}
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e, inputRef)
        }
      />
    </section>
  );
};

export default EventInput;
