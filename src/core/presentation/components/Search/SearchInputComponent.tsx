import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

import User from '../../../domain/entities/user.ts';
import useDebounce from '../../hooks/useDebounce.ts';
import MultiSelectDropDown from '../dropDown/MultiSelectDropDown.tsx';

interface SearchInputProps {
  onMembersSelected: (results: User[]) => void;
  selectedMembers?: User[];
  placeholder?: string;
  className?: string;
}

const SearchInputComponent: React.FC<SearchInputProps> = ({
  onMembersSelected,
  selectedMembers = [],
  placeholder,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색 Input 값.
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000); // 1000ms 디바운스
  const [searchResults, setSearchResults] = useState<User[]>([]); // 검색 결과 목록 저장.
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!debouncedSearchTerm) {
        setSearchResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get<User>(
          `http://localhost:3000/users/email/${debouncedSearchTerm}`,
        );
        setSearchResults([response.data]);
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
  }, [debouncedSearchTerm]);

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

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
            options={searchResults.map((user) => ({
              nickname: user.nickname,
              email: user.email,
            }))}
            onChange={handleSelectionChange}
            selectedMembers={selectedMembers.map((member) => member.email)}
          />
        </div>
      )}
    </div>
  );
};

export default SearchInputComponent;
