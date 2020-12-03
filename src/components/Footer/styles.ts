import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.footer`
  width: 100%;
  height: 50px;
  background-color: #343a40;
  position: fixed;
  bottom: 0px;

  p {
    text-align: center;
    margin-top: 14px;
    color: rgba(255,255,255,.5);
    font-size: 14px;
  }
`;
