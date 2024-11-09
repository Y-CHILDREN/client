interface AddEventPostButtonProps {
  text: string;
}

const AddEventPostButton: React.FC<AddEventPostButtonProps> = ({ text }) => {
  return (
    <button className="w-full px-3 text-white  bg-dot-color">{text}</button>
  );
};

export default AddEventPostButton;
