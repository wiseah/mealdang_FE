import styled from 'styled-components';

const StyledButton = styled.button`
  width: 350px;
  height: 56px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 4px 4px #B7B7B7;
  box-sizing: border-box;
  font-size: 30px;
  font-weight: 400;
  font-family: 'WavvePADO-Regular';
  margin-bottom: 20px;
  cursor: pointer;
  text-align: ${props => props.textAlign};
  padding-left: ${props => props.paddingLeft};
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
`

const ConfirmButton = ({ text, textAlign, paddingLeft, color, backgroundColor, onClick }) => {
  return (
      <StyledButton onClick={onClick} textAlign={textAlign} paddingLeft={paddingLeft} color={color} backgroundColor={backgroundColor}>{text}</StyledButton>
  );
};

export default ConfirmButton;