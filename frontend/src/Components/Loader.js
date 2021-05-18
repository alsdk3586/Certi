import CircularProgress from '@material-ui/core/CircularProgress';
import { Fragment } from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Loading = styled.h1`
  margin-top: 16px;  
  font-size: 28px;
`;

export default () => {
  return (
    <>
      <Wrapper>
        <Spinner animation="grow" size="lg"/>
        <Loading >Loading...</Loading>
      </Wrapper>
    </>
  )
}