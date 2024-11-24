//이미지명 수정 -> ex. domestic seoul
//이미지 장소별로 추가
import la from '../../assets/home/la.jpg';
import china from '../../assets/home/china.jpg';
import japan from '../../assets/home/japan.jpg';
import seoul from '../../assets/home/seoul.jpg';
import busan from '../../assets/home/busan.jpg';
import chungbuk from '../../assets/home/chungbuk.jpeg';
import chungnam from '../../assets/home/chungnam.jpeg';
import daegu from '../../assets/home/daegu.jpeg';
import daejeon from '../../assets/home/daejeon.jpeg';
import gangwon from '../../assets/home/gangwon.jpeg';
import gwangju from '../../assets/home/gwangju.jpeg';
import gyeongbuk from '../../assets/home/gyeongbuk.jpeg';
import gyeongnam from '../../assets/home/gyeongnam.jpg';
import incheon from '../../assets/home/incheon.jpeg';
import jeju from '../../assets/home/jeju.jpeg';
import jeonbuk from '../../assets/home/jeonbuk.jpeg';
import jeonnam from '../../assets/home/jeonnam.jpeg';
import ulsan from '../../assets/home/ulsan.jpeg';

interface TripThumbnailProps {
  destination: string;
  className?: string;
}

const imageMap: { [key: string]: string } = {
  la: la,
  china: china,
  japan: japan,
  seoul: seoul,
  busan: busan,
  chungbuk: chungbuk,
  chungnam: chungnam,
  daegu: daegu,
  daejeon: daejeon,
  gangwon: gangwon,
  gwangju: gwangju,
  gyeongbuk: gyeongbuk,
  gyeongnam: gyeongnam,
  incheon: incheon,
  jeju: jeju,
  jeonbuk: jeonbuk,
  jeonnam: jeonnam,
  ulsan: ulsan,
};

const TripThumbnail: React.FC<TripThumbnailProps> = ({
  destination,
  className,
}) => {
  const city = destination.split(' ')[1]; // "domestic seoul" -> "seoul"
  const imageSource = imageMap[city];

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
