interface EventInputProps {
  label: string;
  inputRef: React.MutableRefObject<string>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    ref: React.MutableRefObject<string>,
  ) => void;
}

const EventInput: React.FC<EventInputProps> = ({
  label,
  inputRef,
  onChange,
}) => {
  return (
    <section>
      <label htmlFor="">{label}</label>
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e, inputRef)
        }
      />
    </section>
  );
};

export default EventInput;
