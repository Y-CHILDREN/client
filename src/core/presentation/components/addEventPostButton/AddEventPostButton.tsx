interface AddEventPostButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

const AddEventPostButton: React.FC<AddEventPostButtonProps> = ({
  text,
  disabled = false,
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

export default AddEventPostButton;
