import styled from 'styled-components';

const StyledButton = styled.button`
  width: 350px;
  height: 56px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 4px 4px #B7B7B7;
  box-sizing: border-box;
  background-color: #6A0DAD;
  font-size: 30px;
  font-weight: 400;
  font-family: 'WavvePADO-Regular';
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
`

const ConfirmButton = ({ text, onClick }) => {
  return (
      <StyledButton onClick={onClick}>{text}</StyledButton>
  );
};

export default ConfirmButton;