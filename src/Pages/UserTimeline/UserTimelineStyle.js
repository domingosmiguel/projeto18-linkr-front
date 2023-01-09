import styled from 'styled-components';

export const ContainerTimeline = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #4d4d4d;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;
export const ContainerPostsAndTrending = styled.div`
  width: 940px;
  min-height: 100%;
  margin-top: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 974px) {
    width: 100%;
  }
`;
export const ContainerPosts = styled.div`
  width: 611px;
  height: 1000px;
  position: relative;
  position: absolute;
  left: 0;
  top: 0;
  @media (max-width: 974px) {
    width: 100%;
    margin: 0 auto;
  }
`;
export const ContainerImgNameUser = styled.div`
  width: 500px;
  height: 100px;
  margin-top: 53px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;
export const TittlePosts = styled.div`
  font-family: 'Oswald', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
  display: flex;

  span {
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin-right: 18px;
    object-fit: cover;
  }

  @media (max-width: 974px) {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 10px;
  }
`;
export const ContainerInputs = styled.div`
  width: 502px;
  height: 209px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  span {
    display: block;
    margin-bottom: 10px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
  }
`;
export const InputLink = styled.input`
  width: 503px;
  height: 30px;
  left: 327px;
  top: 288px;
  background: #efefef;
  border-radius: 5px;
  border: none;
  margin-bottom: 5px;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #949494;
  &::placeholder {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
  }
  &:disabled {
    background-color: #b5b5b5;
    color: #000000;
  }
`;
export const InputText = styled.input`
  width: 502px;
  height: 66px;
  background: #efefef;
  border-radius: 5px;
  border: none;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #949494;

  position: relative;
  &::placeholder {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
    position: absolute;
    left: 10px;
    top: 10px;
  }
  &:disabled {
    background-color: #b5b5b5;
    color: #000000;
  }
`;
export const ButtonPost = styled.button`
  width: 112px;
  height: 31px;
  left: 718px;
  top: 394px;
  background: #1877f2;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 5px;
  margin-left: 79%;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;

  &:disabled {
    background-color: #b5b5b5;
    color: #000000;
  }

  &:hover {
    background: #001c3f;
    &:disabled {
      background: #1877f2;
    }
  }
`;
