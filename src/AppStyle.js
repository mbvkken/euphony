import styled from "styled-components";
import { css } from "styled-components";

export const Header = styled.div`
  background: rgba(31, 58, 147, 1);
  margin-top: 0;
  padding: 1rem;
  color: white;
`

export const Nav = styled.div`
  background: rgba(31, 58, 147, 1);
  /* padding: 1em 0; */
  margin: 0px;
  width: 100vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export const Body = styled.div`
  background-color: #f9f9f9;
  overflow-x: hidden;
  width: 100vw;
  /* height: 90vh; */
`;

export const GridContain = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr 70px;
  height: 0;
`;

export const PageContain = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  height: 100%;
  width: 100vw;

  background-color: #f9f9f9;
  overflow-y: scroll;
`;