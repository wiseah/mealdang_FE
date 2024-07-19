import styled from 'styled-components';

const StyledButton = styled.button`
  width: 280px;
  height: 56px;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #6A0DAD;
  margin: 26.5px 35px 18px 35px;
  font-size: 30px;
  font-weight: 400;
  font-family: 'WavvePADO-Regular';
  color: #ffffff;
  text-align: center;
`


const SubmitButton = ({ onClick, ...props }) => {
    return (
        <StyledButton {...props} onClick={onClick} />
    );
};

export default SubmitButton;
