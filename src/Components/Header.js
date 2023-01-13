import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Header({ config, deleteToken, user, sessionId }) {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    const promise = axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/logout`,
      { sessionId, userId: user.id },
      config
    );
    promise.then(() => {
      deleteToken();
      navigate('/');
    });
    promise.catch((error) => {
      alert(
        `Error: ${error.response?.status}\n Something went wrong, try again later!`
      );
    });
  }

  return (
    <Container>
      <Logo onClick={() => navigate('/timeline')}>Linkr</Logo>
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
  z-index: 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  width: 100%;
  background-color: #151515;
  box-sizing: border-box;
  padding-left: 28px;
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
    object-fit: cover;
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
