import styled, { css } from 'styled-components';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 2px solid #111111;
  background: #1c1c1c;
  border-radius: 4px;
  width: 300px;
  height: 42px;
  padding: 10px 15px;
  margin-bottom: 10px;

  svg {
    margin-right: 5px;
    color: #373737;
  }

  ${props =>
    props.isFocused &&
    css`
      svg {
        color: #6d7dac;
      }
      border-color: #6d7dac;
    `}

  ${props =>
    props.isFilled &&
    css`
      svg {
        color: #6d7dac;
      }
    `}

  input {
    flex: 1;
    height: 100%;
    padding-left: 15px;
    font-size: 16px;
    background: transparent;
    color: #fff;
    border: 0px;

    &::placeholder {
      color: #a5a5a5;
    }
  }

  .icon-click {
    cursor: pointer;
  }
`;
