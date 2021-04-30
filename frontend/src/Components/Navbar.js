import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

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
  /* background-color: rgba(20, 20, 20, 0.8); */
  z-index: 10;
  box-shadow: 0px 1px 3px 2px rgba(0, 0, 0, 0.5);
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
  border-bottom: 4px solid ${props => (props.current ? "#fcbe32" : "transparent")}; 
  transition: border-bottom 0.3s ease-in-out;
`;
const Slink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default withRouter(({ location : { pathname }}) => (
  <Header>
    <List>
      <Item current={pathname === '/'}>
        <Slink to="/">자격증닷컴</Slink></Item>
      <Item current={pathname === '/calendar'}>
        <Slink to="/calendar">캘린더</Slink></Item>
      <Item current={pathname === '/board'}>
        <Slink to="/board">게시판</Slink></Item>
      <Item current={pathname === '/certi'}>
        <Slink to="/certi">자격증</Slink></Item>
      <Item current={pathname === '/user'}>
        <Slink to="/user">회원</Slink></Item>
    </List>
  </Header>
));