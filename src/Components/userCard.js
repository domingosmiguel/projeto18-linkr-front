import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function UserCard({ user: { id, username, pictureUrl } }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/user/${id}`);
  };
  return (
    <Card onClick={handleClick}>
      <ProfilePic src={pictureUrl} alt={username} />
      <Username>{username}</Username>
    </Card>
  );
}

const Card = styled.div`
  cursor: pointer;
  height: fit-content;
  width: 563px;
  padding: 14px 17px 7px;
  display: flex;
  align-items: center;
  :last-child {
    padding: 14px 17px 14px;
  }
`;

const ProfilePic = styled.img`
  width: 39px;
  height: 39px;
  border-radius: 19.5px;
  object-fit: cover;
  margin-right: 12px;
`;

const Username = styled.p`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
`;
