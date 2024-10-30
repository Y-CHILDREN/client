import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  // 디바운스된 값을 저장.
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 지연 시간 후에 값 업데이트
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 타이머 초기화
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 값 또는 지연 시간이 변경될 때마다 재실행.

  return debouncedValue;
}

export default useDebounce;
