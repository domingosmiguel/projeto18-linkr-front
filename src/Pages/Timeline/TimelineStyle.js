import styled from 'styled-components';

export const BoxInputs = styled.div`
  padding: 16px 22px 16px 18px;
  width: 611px;
  margin-top: 43px;
  margin-bottom: 29px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 974px) {
    padding: 10px 16px 12px 16px;
    margin-bottom: 16px;
    width: 100%;
    border-radius: 0;
    margin-top: 10px;
  }
`;
export const Image = styled.div`
  width: 50px;
  margin-right: 18px;

  @media (max-width: 974px) {
    display: none;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const ButtonPost = styled.button`
  width: 112px;
  height: 31px;
  background: #1877f2;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 5px 0 0 auto;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;

  &:disabled {
    background-color: #b5b5b5;
    color: #000000;
    cursor: not-allowed;
  }

  &:hover {
    background: #001c3f;
    &:disabled {
      background: #1877f2;
    }
  }

  @media (max-width: 974px) {
    margin: 6px 0 0 auto;
    font-size: 12px;
    height: 22px;
  }
`;

export const NewPosts = styled.div`
  width: 611px;
  height: 61px;
  background: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: ${(props) => (props.number ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #fff;
  gap: 16px;

  margin: 0 0 18px;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 974px) {
    width: calc(100% - 20px);
    margin: 0 10px 18px;
    height: 51px;
  }
`;

export const EndMessage = styled.p`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  color: white;
  margin-bottom: 20px;
`;
