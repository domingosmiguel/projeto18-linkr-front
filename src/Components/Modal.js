import React from 'react';
import styled, { keyframes } from 'styled-components';

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
          <ModalButton onClick={() => setOpenModal(false)}>
            {txtDefiner[action]?.cancel}
          </ModalButton>
          <ModalButton onClick={handleClick[action]}>
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
  z-index: 3;
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
  background-color: #fff;
  max-width: 300px;
  max-height: 270px;
  height: 100%;
  padding: 25px;
  border-radius: 25px;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 8.5px 10.9px 110.6px -43px rgba(0, 0, 0, 0.173),
    48px 62px 126px -43px rgba(0, 0, 0, 0.25);
  animation: ${slideInFwdCenter} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  display: flex;
  flex-direction: column;
`;
const ModalText = styled.div`
  height: 100%;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  letter-spacing: 0.04em;
`;
const ModalButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalButton = styled.button`
  appearance: none;
  background-color: #fafbfc;
  border: 1px solid rgba(27, 31, 35, 0.15);
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0,
    rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  color: #24292e;
  display: inline-block;
  list-style: none;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
  padding: 0.6em 1em;
  font-size: 18px;
  line-height: 21px;
  border-radius: 0.5em;
  box-shadow: 6px 6px 12px #c5c5c5;
  cursor: pointer;
  margin-right: 10px;
  :hover {
    background-color: #f3f4f6;
    text-decoration: none;
    transition-duration: 0.1s;
  }

  :disabled {
    background-color: #fafbfc;
    border-color: rgba(27, 31, 35, 0.15);
    color: #959da5;
    cursor: default;
  }

  :active {
    background-color: #edeff2;
    box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
    transition: none 0s;
  }

  :focus {
    outline: 1px transparent;
  }

  :before {
    display: none;
  }

  :-webkit-details-marker {
    display: none;
  }
`;
