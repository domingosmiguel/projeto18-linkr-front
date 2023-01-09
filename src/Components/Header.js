import axios from 'axios';
import { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useForm from '../hooks/useForm';
import UserCard from './userCard';

export default function Header({ user, sessionId }) {
  const [isOpen, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [data, updateData] = useForm({ search: '' }, setUsers);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  function handleLogout() {
    const promise = axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/logout`,
      { sessionId, userId: user.id },
      config
    );
    promise.then((response) => {
      localStorage.clear();
      navigate('/');
    });
    promise.catch((error) => {
      alert(
        `Error: ${error.response?.status}\n Something went wrong, try again later!`
      );
    });
  }
  function handleAnswerChange(event) {
    if (event.key === 'Escape') {
      event.target.value = '';
      updateData(event);
      event.target.blur();
    }
  }
  return (
    <Container>
      <Logo onClick={() => navigate('/timeline')}>Linkr</Logo>
      <SearchResults>
        <DebounceInput
          element={SearchInput}
          placeholder='Search for people'
          name='search'
          type='text'
          debounceTimeout={300}
          onChange={(e) => updateData(e, config.headers)}
          value={data.search}
          onKeyUp={handleAnswerChange}
        />
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </SearchResults>
      <User isOpen={isOpen}>
        <Main>
          <ion-icon
            name={isOpen ? 'chevron-up-sharp' : 'chevron-down-sharp'}
            onClick={() => setOpen(!isOpen)}
          ></ion-icon>
          <img src={user.pictureUrl} alt='user' width='53px' height='53px' />
        </Main>
        <Logout isOpen={isOpen}>
          <button onClick={handleLogout}>Logout</button>
        </Logout>
      </User>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  width: 100%;
  background-color: #151515;
  box-sizing: border-box;
  padding-left: 28px;
`;

const SearchResults = styled.div`
  background-color: #e7e7e7;
  border-radius: 8px;
  position: absolute;
  width: 100%;
  max-width: 563px;
  top: 14px;
  left: 50%;
  margin-left: calc(-563px / 2);
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 563px;
  height: 41px;
  background: #ffffff;
  border-radius: 8px;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  padding: 0 17px;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.isOpen ? 'flex-start' : 'center')};
  margin-top: ${(props) => (props.isOpen ? '20px' : '0')};
  height: 100%;
  overflow-y: visible;
  ion-icon {
    color: white;
    width: 32px;
    height: 24px;
    :hover {
      cursor: pointer;
    }
  }
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  padding-right: 18px;
  img {
    border-radius: 50%;
  }
`;

const Logout = styled.div`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  background-color: #151515;
  height: 50px;
  border-bottom-left-radius: 33%;
  width: 100%;
  button {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    height: 50px;
    font-size: 17px;
    color: white;
    background-color: #151515;
    width: 100%;
    border: none;
    padding-right: 50x;
    border-bottom-left-radius: 33%;
    :hover {
      cursor: pointer;
      text-decoration: underline;
      font-size: 18px;
    }
  }
`;

const Logo = styled.h1`
  font-family: 'Passion One';
  font-style: normal;
  font-weight: 700;
  font-size: 49px;
  color: white;
  :hover {
    cursor: pointer;
  }
`;
