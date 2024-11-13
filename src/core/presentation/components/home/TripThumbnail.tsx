//이미지명 수정 -> ex. domestic seoul
//이미지 장소별로 추가
import LA from '../../assets/home/LA.jpg';
import China from '../../assets/home/China.jpg';
import Japan from '../../assets/home/Japan.jpg';
import Seoul from '../../assets/home/Seoul.jpg';
import Busan from '../../assets/home/Busan.jpg';

interface TripThumbnailProps {
  destination: string;
  className?: string;
}

const imageMap: { [key: string]: string } = {
  LA: LA,
  China: China,
  Japan: Japan,
  Seoul: Seoul,
  Busan: Busan,
};

const TripThumbnail: React.FC<TripThumbnailProps> = ({
  destination,
  className,
}) => {
  const city = destination.split(' ')[2]; // "domestic seoul" -> "seoul"
  const imageSource = imageMap[city.charAt(0).toUpperCase() + city.slice(1)]; // "seoul" -> "Seoul"

  return (
    <div
      className={`${className} absolute w-full h-full bg-cover bg-center`}
      style={{
        backgroundImage: `url(${imageSource})`,
      }}
    />
  );
};

export default TripThumbnail;
