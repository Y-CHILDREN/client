import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

import User from '../../../domain/entities/user.ts';
import useDebounce from '../../hooks/useDebounce.ts';
import MultiSelectDropDown from '../dropDown/MultiSelectDropDown.tsx';

export interface Option {
  nickname: string;
  email: string;
  avatar?: string;
}

interface SearchInputProps {
  onMembersSelected: (results: User[]) => void;
  onRemoveMember: (email: string) => void;
  selectedMembers?: User[];
  placeholder?: string;
  className?: string;
}

const SearchInputComponent: React.FC<SearchInputProps> = ({
  onMembersSelected,
  onRemoveMember,
  selectedMembers = [],
  placeholder,
  className,
}) => {
  const [searchTerms, setSearchTerms] = useState<string[]>([]); // 검색 Input 값.
  const debouncedSearchTerms = useDebounce<string[]>(searchTerms, 1000); // 1000ms 디바운스
  const [searchResults, setSearchResults] = useState<User[]>([]); // 검색 결과 목록 저장.
  const [options, setOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (debouncedSearchTerms.length === 0) {
        setSearchResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        console.log('debouncedSearchTerms', debouncedSearchTerms);
        const response = await axios.get<User[]>(
          `http://localhost:3000/users/emails/${debouncedSearchTerms}`,
        );
        setSearchResults(response.data);
        console.log('SearchResults:', response.data);
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [debouncedSearchTerms]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // searchResults 변경 시 options 상태 업데이트
  useEffect(() => {
    handleSearchProps(searchResults);
  }, [searchResults]);

  const handleSelectionChange = (selectedValuesArray: string[]) => {
    const selectedUsers = searchResults.filter((user) =>
      selectedValuesArray.includes(user.email),
    );
    // console.log(selectedValuesArray.includes(searchResults[0].email));
    // console.log('selectedValuesArray:', selectedValuesArray);
    // console.log('searchResults:', searchResults);
    // console.log('selectedValue:', selectedValue);
    onMembersSelected(selectedUsers);
  };

  const handleInputChange = (value: string) => {
    setSearchTerms(value.split(' ')); // 공백으로 분리된 검색어 배열로 설정
  };

  const handleSearchProps = (searchResults: User[]): Option[] => {
    const convertOptions: Option[] = searchResults.map((user) => ({
      nickname: user.nickname,
      email: user.email,
      avatar: user.user_image,
    }));
    // console.log('searchResults:', searchResults);
    // console.log('convertOptions:', convertOptions);

    setOptions(convertOptions);
    return convertOptions;
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerms.join(' ')}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92e7c5]"
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          Loading...
        </div>
      )}
      {isOpen && (
        <div ref={dropdownRef} className="absolute z-10 w-full mt-1">
          <MultiSelectDropDown
            options={options}
            onChange={handleSelectionChange}
            onRemove={onRemoveMember}
            selectedMembers={selectedMembers.map((member) => member.email)}
          />
        </div>
      )}
    </div>
  );
};

export default SearchInputComponent;
