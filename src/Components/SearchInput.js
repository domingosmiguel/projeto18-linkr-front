import { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { AiOutlineSearch } from 'react-icons/ai';
import styled from 'styled-components';
import useForm from '../hooks/useForm';
import UserCard from './userCard';

export default function SearchInput({ headers }) {
  const [users, setUsers] = useState([]);
  const [data, updateData, setData] = useForm({ search: '' }, setUsers);

  function handleAnswerChange(event) {
    if (event.key === 'Escape') {
      event.target.value = '';
      updateData(event);
      event.target.blur();
    }
  }
  return (
    <SearchResults>
      <InputContainer>
        <DebounceInput
          element={MyInput}
          placeholder='Search for people and friends'
          name='search'
          type='text'
          debounceTimeout={300}
          onChange={(e) => updateData(e, headers)}
          value={data.search}
          onKeyUp={handleAnswerChange}
        />
        <AiOutlineSearch />
      </InputContainer>
      {users.map((user) => (
        <UserCard
          key={user.id}
          following={user.following}
          user={user}
          resetInput={() => {
            setData({ search: '' });
            setUsers([]);
          }}
        />
      ))}
    </SearchResults>
  );
}

const SearchResults = styled.div`
  background-color: #e7e7e7;
  border-radius: 8px;
  position: fixed;
  width: 100%;
  max-width: 563px;
  top: 14px;
  left: 50%;
  margin-left: calc(-563px / 2);
  z-index: 2;

  @media (max-width: 974px) {
    z-index: 1;
    top: 14px;
    position: absolute;
    margin-left: 10px;
    margin-right: 10px;
    left: 0%;
    max-width: calc(100% - 20px);
  }
`;

const InputContainer = styled.div`
  position: relative;

  svg {
    color: #c6c6c6;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 7.5px;
    right: 15px;
  }
`;

const MyInput = styled.input`
  width: 100%;
  max-width: 563px;
  height: 45px;
  background: #ffffff;
  border-radius: 8px;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  padding: 0 55px 0 17px;
  position: relative;

  ::placeholder {
    color: #c6c6c6;
  }

  @media (max-width: 974px) {
    max-width: 100%;
  }
`;
