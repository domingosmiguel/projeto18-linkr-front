import { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { AiOutlineSearch } from 'react-icons/ai';
import styled from 'styled-components';
import useForm from '../hooks/useForm';
import UserCard from './userCard';

export default function SearchInput({ headers }) {
  const [users, setUsers] = useState([]);
  const [data, updateData, setData] = useForm({ search: '' }, setUsers);

  function handleEvent(event) {
    if (event.key === 'Escape') {
      event.target.value = '';
      setUsers([]);
      event.target.blur();
    }
  }
  return (
    <Positioner>
      <InputContainer>
        <DebounceInput
          element={MyInput}
          placeholder='Search for people and friends'
          name='search'
          type='text'
          debounceTimeout={300}
          onChange={(e) => updateData(e, headers)}
          onClick={(e) => updateData(e, headers)}
          value={data.search}
          onKeyUp={handleEvent}
          onBlur={() => {
            setTimeout(() => {
              setData({ search: '' });
              setUsers([]);
            }, 100);
          }}
        />
        <AiOutlineSearch />
      </InputContainer>
      <ScrollContainer length={users.length}>
        <ResultsContainer>
          {users.slice(0, 10).map((user) => (
            <UserCard key={user.id} following={user.following} user={user} />
          ))}
        </ResultsContainer>
      </ScrollContainer>
    </Positioner>
  );
}
const ScrollContainer = styled.div`
  position: relative;

  height: ${({ length }) => {
    let height = 0;
    if (length) {
      height += 14 + length * 53;
    }
    return height + 'px';
  }};
  max-height: 332px;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: block;
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 20px;
    border: 3px solid #e7e7e7;
  }
`;
const ResultsContainer = styled.div`
  position: absolute;
  width: 100%;
`;
const Positioner = styled.div`
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
