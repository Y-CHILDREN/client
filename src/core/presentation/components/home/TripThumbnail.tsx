//이미지명 수정 -> ex. domestic seoul
//이미지 장소별로 추가
import LA from '../../assets/home/LA.jpg';
import China from '../../assets/home/China.jpg';
import Japan from '../../assets/home/Japan.jpeg';
import Seoul from '../../assets/home/Seoul.jpg';
import Busan from '../../assets/home/Busan.jpeg';

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
  const city = destination.split(' ')[1]; // "domestic seoul" -> "seoul"
  const imageSource = imageMap[city.charAt(0).toUpperCase() + city.slice(1)]; // "seoul" -> "Seoul"

  return (
    <img
      src={imageSource || LA} // 매칭되는 이미지가 없을 경우 LA를 기본값으로 사용
      alt={destination}
      className={className}
    />
  );
};

export default TripThumbnail;
