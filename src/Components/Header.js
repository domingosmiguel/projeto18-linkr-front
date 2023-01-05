import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
//Dados user
import { DadosContext } from '../context/DadosContext';

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

const User = styled.div`
  display: flex;
  flex-direction: column;
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

export default function Header() {
  const { userImg, setUserImg } = useContext(DadosContext);

  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  function handleLogout() {}
  return (
    <Container>
      <Logo onClick={() => navigate('/timeline')}>Linkr</Logo>
      <User>
        <Main>
          <ion-icon
            name={isOpen ? 'chevron-up-sharp' : 'chevron-down-sharp'}
            onClick={() => setOpen(!isOpen)}
          ></ion-icon>
          <img
            src={userImg}
            alt="user"
            width="53px"
            height="53px"
            borderradius="50%"
          />
        </Main>
        <Logout isOpen={isOpen}>
          <button onClick={handleLogout}>Logout</button>
        </Logout>
      </User>
    </Container>
  );
}
