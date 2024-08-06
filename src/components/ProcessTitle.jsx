import React from 'react'
import styled from 'styled-components';

const Process = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 10px;
margin-bottom: 10px;
`;

const Number = styled.div`
width: 24px;
height: 24px;
background-color: #540090;
color: #FFFFFF;
font-weight: 700;
font-size: 18px;
border: none;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;

`;


const Title = styled.div`
color: #540090;
font-weight: 600;
font-size: 18px;
display: flex;
justify-content: center;
align-items: center;
margin-left: 26px;
`;

const Description = styled.div`
color: #540090;
font-weight: 500;
font-size: 12px;
display: flex;
justify-content: center;
align-items: center;
`;

function ProcessTitle({num, title, text}) {

  return (
    <>
        <Process>
            <Number>{num}</Number>
            <Title>{title}</Title>
        </Process>
        <Description>{text}</Description>
    </>
  )
}

export default ProcessTitle
