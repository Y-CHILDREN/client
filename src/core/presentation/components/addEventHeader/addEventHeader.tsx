interface AddEventHeaderProps {
  message: string;
}

const AddEventHeader: React.FC<AddEventHeaderProps> = ({ message }) => {
  return (
    <section className="flex items-center h-[60px] px-3 border-b-2 border-gray-200 ">
      <img
        className="cursor-pointer"
        src="/src/core/presentation/assets/addEventForm/xIcon.svg"
        alt="닫기 아이콘"
      />
      <div className="flex justify-center flex-grow">
        <p className="text-lg font-bold">{message}</p>
      </div>
    </section>
  );
};

export default AddEventHeader;
