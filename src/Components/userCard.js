import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function UserCard({
  following,
  user: { id, username, pictureUrl },
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/user/${id}`);
  };
  return (
    <Card onClick={handleClick}>
      <ProfilePic src={pictureUrl} alt={username} />
      <p>{username}</p>
      {following && <Follows>• following</Follows>}
    </Card>
  );
}

const Card = styled.div`
  cursor: pointer;
  height: fit-content;
  max-width: 100%;
  padding: 14px 17px 7px;
  display: flex;
  align-items: center;

  :nth-child(n + 2) {
    padding: 7px 17px 7px;
  }
  :last-child {
    padding: 7px 17px 14px;
  }
  :only-child {
    padding: 14px 17px 14px;
  }

  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
`;

const ProfilePic = styled.img`
  width: 39px;
  height: 39px;
  border-radius: 19.5px;
  object-fit: cover;
  margin-right: 12px;
`;

const Follows = styled.p`
  color: #c5c5c5;
  margin-left: 7px;
`;
