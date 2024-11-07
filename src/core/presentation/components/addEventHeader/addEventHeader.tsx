import { IoClose } from 'react-icons/io5';

interface AddEventHeaderProps {
  message: string;
}

const AddEventHeader: React.FC<AddEventHeaderProps> = ({ message }) => {
  return (
    <section className="flex items-center justify-between px-3 pb-10 text-black">
      <IoClose color="black" />
      <div className="flex justify-center flex-grow ">
        <p>{message}</p>
      </div>
    </section>
  );
};

export default AddEventHeader;
