import React, { useEffect, useState } from 'react';
import axios from 'axios';

import User from '../../../domain/entities/user.ts';
import useDebounce from '../../hooks/useDebounce.ts';
import MultiSelectDropDown from '../dropDown/MultiSelectDropDown.tsx';

interface Props {
  onMembersSelected: (results: User[]) => void;
}

const SearchInputComponent: React.FC<Props> = ({ onMembersSelected }) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색 Input 값.
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000); // 1000ms 디바운스
  const [searchResults, setSearchResults] = useState<User[]>([]); // 검색 결과 목록 저장.

  useEffect(() => {
    if (debouncedSearchTerm) {
      axios
        .get<User>(`http://localhost:3000/users/email/${debouncedSearchTerm}`)
        .then((response) => {
          console.log(response.data); // log
          const searchArray = [response.data];
          setSearchResults(searchArray);
        })
        .catch((error) => console.error('Search error:', error));
    } else {
      setSearchResults([]); // 검색어가 비었을 때 결과를 비움
    }
  }, [debouncedSearchTerm, onMembersSelected]);

  const handleSelectionChange = (selectedValuesArray: string[]) => {
    const selectedValue = searchResults.filter((searchResult) => {
      selectedValuesArray.includes(searchResult.email);
    });
    onMembersSelected(selectedValue);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded p-2"
      />
      <MultiSelectDropDown
        options={searchResults.map((user) => ({
          nickname: user.nickname,
          email: user.email,
        }))}
        onChange={handleSelectionChange}
      />
    </div>
  );
};

export default SearchInputComponent;
