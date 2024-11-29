interface EventSubmitButtonProps {
  text: string;
  disabled: boolean;
}

const EventSubmitButton: React.FC<EventSubmitButtonProps> = ({
  text,
  disabled,
}) => {
  return (
    <button
      className={`w-full mt-auto my-3 text-white bg-dot-color ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      type="submit"
    >
      {text}
    </button>
  );
};

export { EventSubmitButton };
