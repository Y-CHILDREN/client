import ContentLoader from 'react-content-loader';

const EventFormSkeleton = () => (
  <ContentLoader
    speed={2}
    width={420}
    height={600}
    viewBox="0 0 420 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="20" y="0" rx="8" ry="8" width="360" height="40" />
    {/* 제목 */}
    <rect x="20" y="20" rx="4" ry="4" width="150" height="20" />

    {/* 입력 필드 */}
    <rect x="20" y="50" rx="8" ry="8" width="360" height="40" />
    <rect x="20" y="110" rx="4" ry="4" width="150" height="20" />
    <rect x="20" y="140" rx="8" ry="8" width="360" height="40" />

    {/* 일정 */}
    <rect x="20" y="200" rx="4" ry="4" width="150" height="20" />
    <rect x="20" y="230" rx="8" ry="8" width="330" height="40" />
    <rect x="360" y="230" rx="4" ry="4" width="40" height="40" />
    <rect x="20" y="280" rx="8" ry="8" width="330" height="40" />
    <rect x="360" y="280" rx="4" ry="4" width="40" height="40" />

    {/* 경비 항목 */}
    <rect x="20" y="340" rx="4" ry="4" width="150" height="20" />
    <rect x="20" y="370" rx="8" ry="8" width="170" height="40" />
    <rect x="200" y="370" rx="8" ry="8" width="120" height="40" />
    <rect x="330" y="370" rx="4" ry="4" width="40" height="40" />

    {/* 경비 추가 버튼 */}
    <rect x="20" y="420" rx="8" ry="8" width="360" height="40" />

    {/* 추가 완료 버튼 */}
    <rect x="20" y="480" rx="8" ry="8" width="360" height="50" />
    <rect x="20" y="550" rx="8" ry="8" width="360" height="50" />
  </ContentLoader>
);

export default EventFormSkeleton;
