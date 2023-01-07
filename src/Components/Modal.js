import styled from "styled-components";
import Modal from 'react-modal';
import { useContext } from "react";
import { DadosContext } from "../context/DadosContext";
import axios from "axios";
import LoadingDelete from "./LoadingDelete";

export default function ModalDelete() {
    const { modalIsOpen, setIsOpen, id, setPosts, setVisible, disabledModal, setDisabledModal } = useContext(DadosContext);

    const customStyles = {
        content: {
            width: '597px',
            height: '262px',
            left: '50%',
            top: '50%',
            background: '#333333',
            border: '1px solid #ccc',
            borderRadius: '50px',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    function goBack() {
        setIsOpen(false)
    }

    function deletePost(id) {
        setDisabledModal(true)

        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        };

        axios.delete(`http://localhost:4000/user-posts/${id}`, config)
            .then((res) => {
                console.log(res.data)
                setVisible(true)
                axios.get("http://localhost:4000/timeline-posts", config)
                    .then((response) => {
                        setVisible(false)
                        setIsOpen(false)
                        setPosts(response.data.posts)
                        setDisabledModal(false)
                    })
                    .catch((error) => {
                        setVisible(false)
                        setIsOpen(false)
                        setDisabledModal(false)
                        console.log(error.response)
                    })
            })
            .catch((err) => {
                setVisible(false)
                setIsOpen(false)
                setIsOpen(false)
                if(err.response.status===401 || err.response.status===404){
                    alert("Unable to run task")
                }
                if(err.response.status===500){
                    alert("internal server error")
                }
                console.log(err.response);
            })
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <Ask >Are you sure you want <br /> to delete this post?</Ask>
            <LoadingDelete />
            <BoxButtons>
                <ButtonConfirm
                    disabled={disabledModal}
                    onClick={goBack}>No, go back</ButtonConfirm>
                <ButtonDelete
                    disabled={disabledModal}
                    onClick={() => deletePost(id)}>Yes, delete it</ButtonDelete>
            </BoxButtons>
        </Modal>
    )
}

const Ask = styled.div`
    width: 100%;
    height: 100px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #FFFFFF;
    margin-bottom: 20px;

`

const BoxButtons = styled.div`
    width: 350px;
    height: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ButtonConfirm = styled.button`
    width: 150px;
    height: 50px;
    left: 572px;
    top: 508px;
    background: #FFFFFF;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #1877F2;

    &:hover {
    background: #999595;
        &:disabled {
        background: #61738a;
    }
    }
    &:active {
    transform: translateY(4px);
    }

    &:disabled {
    background-color: #61738a;
    color: #000000;
    cursor: not-allowed;
  }
`

const ButtonDelete = styled.button`
    width: 150px;
    height: 50px;
    left: 733px;
    top: 509px;
    background: #1877F2;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;

    &:hover {
    background: #001c3f;
    &:disabled {
        background: #61738a;
    }
     }

    &:active {
    transform: translateY(4px);
    }

    &:disabled {
    background-color: #61738a;
    color: #000000;
    cursor: not-allowed;
  }
`
