import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import User from '../../../domain/entities/user.ts';
import useDebounce from '../../hooks/useDebounce.ts';
import MultiSelectDropDown from '../dropDown/MultiSelectDropDown.tsx';

interface Props {
  onMembersSelected: (results: User[]) => void;
  selectedMembers?: User[];
}

const SearchInputComponent: React.FC<Props> = ({
  onMembersSelected,
  selectedMembers = [],
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색 Input 값.
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000); // 1000ms 디바운스
  const [searchResults, setSearchResults] = useState<User[]>([]); // 검색 결과 목록 저장.
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debouncedSearchTerm) {
      axios
        .get<User>(`http://localhost:3000/users/email/${debouncedSearchTerm}`)
        .then((response) => {
          console.log(response.data); // log
          const searchArray = [response.data];
          setSearchResults(searchArray);
          setIsOpen(true); // 검색 결과가 있을 때 드롭다운 열기.
        })
        .catch((error) => {
          console.error('Search error:', error);
          setSearchResults([]); // 에러 발생 시 이전 검색 결과 비우기.
          setIsOpen(false); // 드롭다운 닫기.
        });
    } else {
      setSearchResults([]); // 검색어가 비었을 때 결과를 비움
      setIsOpen(false); // 검색어가 없을 때 드롭다운 닫기.
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false); // 드롭다운 닫기.
      }
    };

    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  const handleSelectionChange = (selectedValuesArray: string[]) => {
    const selectedValue = searchResults.filter((searchResult) =>
      selectedValuesArray.includes(searchResult.email),
    );
    // console.log(selectedValuesArray.includes(searchResults[0].email));
    // console.log('selectedValuesArray:', selectedValuesArray);
    // console.log('searchResults:', searchResults);
    // console.log('selectedValue:', selectedValue);
    onMembersSelected(selectedValue);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <input
        type="text"
        placeholder="검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)} // 검색창 포커스 시 드롭다운 열기.
        className="border rounded p-2 w-full"
      />
      {isOpen && (
        <MultiSelectDropDown
          options={searchResults.map((user) => ({
            nickname: user.nickname,
            email: user.email,
          }))}
          onChange={handleSelectionChange}
          selectedMembers={selectedMembers.map((member) => member.email)}
        />
      )}
    </div>
  );
};

export default SearchInputComponent;
