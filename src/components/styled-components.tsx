"use client"
import styled from 'styled-components';

// Create a styled button component
export const H2 = styled.h2`
  font-weight: bold;
  color: white;
  margin: 10px;

  //for sm devices
  @media (min-width: 640px) {
    font-size:22px;
  }
  //for md devices
  @media (min-width: 768) {
    font-size:22px;
  }
  //for lg devices
  @media(min-width: 1024px) {
    font-size:25px;
  }

  //for xl devices
  @media (min-width: 1280px){
    font-size:27px;
  }
`;


