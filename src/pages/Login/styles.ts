import styled from 'styled-components';
import controleMerendaLogo from '../../assets/logo.png';

export const Container = styled.div`
  height: 100%;

  display: grid;
  align-items: stretch;
  //background: linear-gradient(to bottom right, #fff 0%, 	#6d7dac 200%);
`;
// 6d7dac
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: auto;
  margin-top: 0px;
  margin-bottom: 14%;
  width: 100%;
`;

export const Form = styled.form`
  margin-top: 20px;
  padding: 40px;
  border: 1px solid #343a40;
  background: #343a40;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    text-align: center;
    margin-bottom: 25px;
    font-size: 17px;
    color: #a5a5a5;
  }

  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`;

export const FormActions = styled.div`
  width: 100%;
  margin-top: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none;
    color: #fff;
    font-size: 14px;
  }
`;

export const Background = styled.div`
  flex: 1;
  margin-top: 7%;
  height: 195px;
  background: url(${controleMerendaLogo}) no-repeat center;
`;
