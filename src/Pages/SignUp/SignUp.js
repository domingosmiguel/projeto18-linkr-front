import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #151515;
  @media (max-width: 977px) {
    flex-direction: column;
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 535px);
  height: 100vh;
  box-sizing: border-box;
  padding-left: 144px;
  color: white;
  h1 {
    font-family: 'Passion One';
    font-style: normal;
    font-weight: 700;
    font-size: 106px;
  }
  h2 {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
  }
  @media (max-width: 1125px) {
    padding-left: calc(100% - (535px + 450px));
  }
  @media (max-width: 977px) {
    width: 100%;
    padding-left: 0;
    align-items: center;
    height: 200px;
    h1 {
      font-size: 76px;
    }
    h2 {
      font-size: 23px;
    }
  }
`;

const Form = styled.div`
  background-color: #333333;
  width: 100%;
  max-width: 535px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  input {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    width: 100%;
    max-width: 429px;
    height: 65px;
    color: black;
    padding-left: 10px;
    box-sizing: border-box;
    border-radius: 6px;
    border: none;
  }
  button {
    width: 100%;
    max-width: 429px;
    height: 65px;
    color: white;
    text-align: center;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    border: none;
    background: #1877f2;
    border-radius: 6px;
    margin-top: 2px;
    margin-bottom: 2px;
    :hover {
      text-decoration: underline;
      font-size: 28px;
      cursor: pointer;
    }
  }
  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    text-decoration: underline;
    color: white;
    :hover {
      font-size: 21px;
      cursor: pointer;
    }
  }
  @media (max-width: 977px) {
    max-width: 100%;
    box-sizing: border-box;
    padding: 0 24px;
    height: calc(100vh - 200px);
    input {
      font-size: 22px;
    }
    button {
      font-size: 22px;
      :hover {
        font-size: 23px;
      }
    }
  }
`;

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const navigate = useNavigate();
  function handleSignUp() {
    if (username.length < 3 || username.length > 40)
      return alert('Username must have between 3 and 40 characters!');
    if (password.length < 6 || password.length > 50)
      return alert('Password must have between 6 and 50 characters!');
    if (username && email && password && pictureUrl) {
      const promisse = axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/signup`,
        { username, email, password, pictureUrl }
      );
      promisse.then((response) => {
        navigate('/');
      });
      promisse.catch((error) => {
        alert(
          `Erro: ${error.response.status}\nSomething went wrong, wait a while and try again or visit our FAQ and search for the presented error code!`
        );
      });
    } else {
      alert('All fields must be filled in!');
    }
  }
  return (
    <Container>
      <CompanyInfo>
        <h1>Linkr</h1>
        <div>
          <h2>save, share and discover</h2>
          <h2>the best links on the web</h2>
        </div>
      </CompanyInfo>
      <Form>
        <input
          placeholder="e-mail"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <input
          placeholder="username"
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <input
          placeholder="picture url"
          onChange={(event) => setPictureUrl(event.target.value)}
        ></input>
        <button onClick={handleSignUp}>Sign Up</button>
        <Link to="/" relative="path">
          <h2>Switch back to log in</h2>
        </Link>
      </Form>
    </Container>
  );
}

export default SignUp;
