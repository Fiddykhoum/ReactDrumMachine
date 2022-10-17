import styled from 'styled-components';
import React from 'react'

export default function Footer( {isLight, handleToggleTheme} ) {
  return (
    <Wrapper>
      <button onClick={handleToggleTheme}>
        Switch to {isLight ? "Dark" : "Light"} theme 
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
height: 80px;
display: flex;
justify-content: center;
align-items: center;
border-top: solid 1px;
background-color: ${(props)=> props.theme.mainColor};

`;