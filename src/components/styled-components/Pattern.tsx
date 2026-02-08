import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="container" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
        190deg,
        orangered,
        orangered 10px,
        black 10px,
        orangered 20px
      )
      orange;
    background-blend-mode: overlay;
  }`;

export default Pattern;
