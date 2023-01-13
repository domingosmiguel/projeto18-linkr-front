import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

export default function FollowButton({ headers }) {
  const [follow, setFollow] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [buttonTxt, setButtonTxt] = useState(true);
  const { id } = useParams();

  const baseURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { isFollower },
        } = await axios.request({
          baseURL,
          url: `/follows/${id}`,
          headers,
        });
        setFollow(isFollower);
      } catch (error) {
        console.log(error);
        alert('The server was not able to perform the action!');
      } finally {
        setDisabled(false);
      }
    })();
  }, [id]);

  const handleClick = async () => {
    setDisabled(true);
    try {
      if (!follow) {
        await axios.request({
          baseURL,
          url: `/follows/${id}`,
          method: 'post',
          headers,
        });
        setFollow(true);
      } else {
        await axios.request({
          baseURL,
          url: `/follows/${id}`,
          method: 'delete',
          headers,
        });
        setFollow(false);
      }
    } catch (error) {
      console.log(error);
      alert('The server was not able to perform the action!');
    } finally {
      setDisabled(false);
    }
  };
  useEffect(() => {
    if (disabled)
      setButtonTxt(
        <ReactLoading
          type='bubbles'
          color={follow ? '#1877f2' : '#ffffff'}
          height={29}
          width={100}
        ></ReactLoading>
      );
    else if (follow) setButtonTxt('Unfollow');
    else setButtonTxt('Follow');
  }, [disabled, follow]);

  return (
    <MyButton follow={follow} disabled={disabled} onClick={handleClick}>
      {buttonTxt}
    </MyButton>
  );
}

const DisabledButton = css`
  pointer-events: none;
  opacity: 0.7;
`;

const BlueButton = css`
  background-color: #1877f2;
  color: #ffffff;
`;

const WhiteButton = css`
  background-color: #ffffff;
  color: #1877f2;
`;

const MyButton = styled.button`
  ${({ follow, disabled }) => [
    follow ? WhiteButton : BlueButton,
    disabled && DisabledButton,
  ]};
  cursor: pointer;

  position: absolute;
  top: 78px;
  right: 0px;

  width: 112px;
  height: 31px;

  border: none;
  border-radius: 5px;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  @media (max-width: 974px) {
    top: 90px;
    right: 28px;
  }

  svg {
    height: 60px;
    margin-top: -15%;
  }
`;
