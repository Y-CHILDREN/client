interface AddEventHeaderProps {
  message: string;
}

const AddEventHeader: React.FC<AddEventHeaderProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default AddEventHeader;
