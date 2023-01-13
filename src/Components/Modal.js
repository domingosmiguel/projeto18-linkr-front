import React from 'react';
import styled, { css, keyframes } from 'styled-components';

export default function Modal({ handleClick, setOpenModal, action }) {
  const txtDefiner = {
    delete: {
      confirm: 'Yes, delete it',
      cancel: 'No, go back',
      children: 'Are you sure you want to delete this post?',
    },
    share: {
      confirm: 'Yes, share!',
      cancel: 'No, cancel',
      children: 'Do you want to re-post this link?',
    },
  };
  return (
    <ModalBackground onClick={() => setOpenModal(false)}>
      <ModalContainer
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <ModalText>{txtDefiner[action]?.children}</ModalText>
        <ModalButtonsContainer>
          <ModalButton confirm={false} onClick={() => setOpenModal(false)}>
            {txtDefiner[action]?.cancel}
          </ModalButton>
          <ModalButton confirm={true} onClick={handleClick[action]}>
            {txtDefiner[action]?.confirm}
          </ModalButton>
        </ModalButtonsContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(255, 255, 255, 0.9);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1400px;
`;
const slideInFwdCenter = keyframes`
    0% {
    transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
`;
const ModalContainer = styled.div`
  max-width: 597px;
  max-height: 270px;
  width: 100%;
  height: 100%;
  margin: 25px;
  padding: 15px 25px 38px;
  border-radius: 25px;
  background-color: #333;
  color: #fff;
  box-shadow: 8.5px 10.9px 110.6px -43px rgba(0, 0, 0, 0.173),
    48px 62px 126px -43px rgba(0, 0, 0, 0.25);
  animation: ${slideInFwdCenter} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  display: flex;
  flex-direction: column;
  align-items: center;

  &,
  & :nth-child(n) {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
  }
`;
const ModalText = styled.div`
  height: 100%;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  width: 100%;
  min-width: 280px;
  max-width: 340px;

  display: flex;
  align-items: center;
  letter-spacing: 0.04em;
  font-size: 29px;
  line-height: 35px;
`;
const ModalButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 280px;
  max-width: 300px;
`;
const ButtonConfirm = css`
  background: #ffffff;
  color: #1877f2;
`;
const ButtonDelete = css`
  background: #1877f2;
  color: #ffffff;
`;

const ModalButton = styled.button`
  width: 134px;
  height: 37px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  line-height: 22px;

  ${({ confirm }) => (confirm ? ButtonConfirm : ButtonDelete)}

  &:active {
    transform: translateY(4px);
  }

  &:disabled {
    opacity: 0.9;
    cursor: default;
  }
`;
