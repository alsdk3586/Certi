import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Modal, Button, Table, Container, Row, Col } from 'react-bootstrap';
import LineChart from './LineChart';
import PieChart from './PieChart';
import ColumnChart from './ColumnChart';
import axios from 'axios';
import BtnStar from './BtnStar';
import { favoriteApi, statisticsApi } from "../utils/axios";
import Loader from './Loader';
import { SmallLogo } from '../assets/index';
import styled from 'styled-components';

export default function CustomModal(props) {
  const eventData = props.data;
  // const code = props.data.code;
  const [code, setCode] = useState(props.data.code);
  const [genderStats, setGenderStats] = useState([]);
  const [ageStats, setAgeStats] = useState([]);
  const [title, setTitle] = useState(props.title);
  const [dateData, setDateData] = useState(props.date);
  const [passRt, setPassRt] = useState([]);
  const [noData, setNoData]  = useState(true);
  const [favoriteList, setFavoriteList] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const FavoriteButton = styled.button`
    background-color: transparent;
    border: none;
    margin: auto 0;
  `;
  const Slink = styled(Link)`
  fontSize: 25px;
  margin-left: 20px;
  margin-top: 10px;
  &:hover {
    text-decoration-line: none;
    font-weight: bold;
    font-size: 110%
  }
`;

  useEffect(async () => {
    const statistics = await statisticsApi.getStatsList(code);
    if (statistics !== undefined) {
      let gStat = [ 
        statistics.man,
        statistics.women
      ]
      let aStat = [{
        name: "합격자 수",
        data: [
          statistics.teen,
          statistics.twenty,
          statistics.thirty,
          statistics.fourty,
          statistics.fifty,
          statistics.sixty
        ]
      }]
      setGenderStats(gStat)
      setAgeStats(aStat)
    } else {
      setNoData(false)
    }

  }, [eventData])
  
  useEffect(async () => {
    const passRate = [];
    const docPassRate = [];
    const pracPassRate = [];
    const acceptRate = await statisticsApi.getPassRate(code);
    if (acceptRate.length !== 0) {
      acceptRate.map(elem => (
        passRate.push(elem.acceptanceRateResult),
        docPassRate.push(elem.acceptanceRateDoc),
        pracPassRate.push(elem.acceptanceRatePrac)
      ));
      let pass = {
        name: '합격률',
        data: passRate,
      }
      let doc = {
        name: '필기 합격률',
        data: docPassRate,
      }
      let prac = {
        name: '실기 합격률',
        data: pracPassRate,
      }
      setPassRt([pass, doc, prac])
    } else {
      setNoData(false)
    }
  }, [])

  useEffect(async () => {
    const favoriteListFromApi = await favoriteApi.getFavoritelist();
    setFavoriteList(favoriteListFromApi)
    // favoriteListFromApi.includes(code) ? setIsFavorite(true) : setIsFavorite(false);
    setIsFavorite(false)
    for (let index = 0; index < favoriteListFromApi.length; index++) {
      const element = favoriteListFromApi[index];
      if (element.certificateCode.certificateCode === String(code) ) {
        setIsFavorite(true)
        break
      }
    }
  }, [])

  async function createFavorite() {
    if(isFavorite) {
      const deleteFavorite = await favoriteApi.deleteFavorite(code);
      setIsFavorite(!isFavorite)
    } else {
      const favorite = await favoriteApi.addFavorite(code);
      setIsFavorite(!isFavorite)
    }
  }

  return (
    <>
    {noData ?  
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" 
          style={{ marginRight: "15px"}}
          >
            {title}
          </Modal.Title>
          {/* <Button isFilled={true} onClick={createFavorite} /> */}
          <FavoriteButton onClick={createFavorite}>
            <BtnStar state={isFavorite}/>
          </FavoriteButton>
          <Slink to={`/ChatBox/${code}`} >
            채팅방 참여하기
          </Slink>
        </Modal.Header>
        <Modal.Body>
          <Container >
            <span style={{fontSize: "20px", marginRight: "1rem", marginTop: "1rem"}}>일정</span>
            <span style={{fontSize: "20px", marginleft: "1rem" , marginTop: "1rem"}}>{dateData}</span>
          </Container>
          {/* Chart */}
          <Container>
            <Row className="d-flex justify-content-around mt-4">
              <Col lg={7} md={12} className="d-flex justify-content-center">
                <ColumnChart series={ageStats} />
              </Col>
              <Col lg={5} md={12} className="d-flex justify-content-center">
                <PieChart series={genderStats} />
              </Col>
              <Col lg={12} className="d-flex justify-content-center">
                <LineChart series={passRt}/>
              </Col>
            </Row>
          </Container>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      :
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" 
          style={{ marginRight: "15px"}}
          >
            {title}
          </Modal.Title>

          {/* <Button isFilled={true} onClick={createFavorite} /> */}
          <FavoriteButton onClick={createFavorite} isFilled={isFavorite}>
            <BtnStar />
            </FavoriteButton>
            <Slink to={`/ChatBox/${code}`} >
              채팅방 참여하기
            </Slink>

        </Modal.Header>
        <Modal.Body>
          {/* Chart */}
          <Container>
            <Row className="d-flex justify-content-around">
              <SmallLogo />
            </Row>
            <Row className="d-flex justify-content-center">
              <p style={{fontSize: "20px"}}> 이 시험에 대한 정보가 없습니다.</p>
            </Row>
          </Container>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    }
    </>
  );
}