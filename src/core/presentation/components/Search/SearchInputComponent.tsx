import React, { useEffect, useState } from 'react';
import axios from 'axios';

import User from '../../../domain/entities/user.ts';
import useDebounce from '../../hooks/useDebounce.ts';

interface Props {
  onSearchResult: (results: User[]) => void;
}

const SearchInputComponent: React.FC<Props> = ({ onSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500); // 500ms 디바운스

  useEffect(() => {
    if (debouncedSearchTerm) {
      axios
        .get<User[]>(
          `https://yourserver.com/api/users/search?email=${debouncedSearchTerm}`,
        )
        .then((response) => {
          onSearchResult(response.data); // 검색 결과를 부모 컴포넌트로 전달
        })
        .catch((error) => console.error('Search error:', error));
    } else {
      onSearchResult([]); // 검색어가 비었을 때 결과를 비움
    }
  }, [debouncedSearchTerm, onSearchResult]);

  return (
    <div>
      <input
        type="text"
        placeholder="검색..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        autoComplete="off"
        className="border rounded p-2"
      />
    </div>
  );
};

export default SearchInputComponent;
