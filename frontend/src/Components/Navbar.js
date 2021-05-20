import React, { useState,useEffect}from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import LoginService from './login/loginService';
import { SmallLogo } from '../assets/index';
import '../Components/css/login/style.scss';

const Header = styled.header`
  color: #707070;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 16px;
  background-color: white;
  z-index: 10;
  // box-shadow: 0px 1px 3px 2px rgba(0, 0, 0, 0.5);
  `;
const List = styled.ul`
  display: flex;
  `;
const Item = styled.li`
  text-decoration: none;
  min-width: 80px;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  // border-bottom: 4px solid ${props => (props.current ? "#fcbe32" : "transparent")}; 
  transition: border-bottom 0.3s ease-in-out;
  
  `;

const Slink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: black;
    text-decoration-line: none;
    font-weight: bold;
  }
`;

const isUserLoggedIn = LoginService.isUserLoggedIn();

export default withRouter(({ location: { pathname } }) => {
  const [data, setdata] = useState();
  
  useEffect(() => {
    if (localStorage.getItem('token') === null)
      setdata(<Item current={pathname === '/login'}><Slink to="/login">로그인</Slink></Item>);
    else
      setdata(<Item current={pathname === '/logout'} onClick={LoginService.logout}><Slink to="/logout">로그아웃</Slink></Item>);
  }, [localStorage.getItem('token')])

  return (
    <Header style={{marginTop:"30px"}}>
      <List>
        <Item current={pathname === '/calendar'}>
          <Slink to="/calendar"><SmallLogo /></Slink></Item>
        <Item current={pathname === '/board'}>
          <Slink to="/board">게시판</Slink></Item>
        {data}
      </List>
    </Header>
  )
});