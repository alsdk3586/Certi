import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, Container, Row, Col } from 'react-bootstrap';
import LineChart from './LineChart';
import PieChart from './PieChart';
import ColumnChart from './ColumnChart';
import axios from 'axios';
import BtnStar from './BtnStar';
import { favoriteApi } from "../utils/axios";

export default function CustomModal(props) {
  const eventData = props.data;
  const code = props.data.code;
  const [genderStats, setGenderStats] = useState([]);
  const [ageStats, setAgeStats] = useState([]);
  const [title, setTitle] = useState('');
  // const [acceptanceRateDoc, setDoc] = useState(null);
  // const [acceptanceRatePrac, setPrac] = useState(null);
  // const [acceptanceRateResult, setResult] = useState(null);
  const [passRt, setPassRt] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/certificate/statistics/${code}`)
    .then((res)=> {
      const data = res.data[0];
      let gStat = [ 
        data.man,
        data.women
      ]
      let aStat = [{
        name: "합격자 수",
        data: [
          data.teen,
          data.twenty,
          data.thirty,
          data.fourty,
          data.fifty,
          data.sixty
        ]
      }]
      setGenderStats([...gStat])
      setAgeStats([...aStat])
    })
    .catch((err) => {
      console.log(err)
    })
  }, [eventData])
  
  useEffect(() => {
    axios.get(`http://localhost:8080/certificate/acceptancerate/${code}`)
    .then((res)=> {
      const acceptRate = res.data;
      const passRate = [];
      const docPassRate = [];
      const pracPassRate = [];
      // setDoc(acceptRate.acceptanceRateDoc);
      // setPrac(acceptRate.acceptanceRatePrac);
      // setResult(acceptRate.acceptanceRateResult);
      setTitle(acceptRate[0].certificateCode.certificateClassificationCode);
      acceptRate.map(elem => {
        passRate.push(elem.acceptanceRateResult)
        docPassRate.push(elem.acceptanceRateDoc)
        pracPassRate.push(elem.acceptanceRatePrac)
      });
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
    })
    .catch((err)=> {console.log(err)})
  }, [eventData])

  async function createFavorite(code){
    const favorite = await favoriteApi.addFavorite(code);
    // favorite.then((res) => {console.log('post성공: ',res)})
  }

  return (
    <>
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
          <BtnStar isFilled={true} onClick={createFavorite(code)} />
        </Modal.Header>
        <Modal.Body>
          <Container >
            {/* <Table border size="md">
              <tbody>
                <tr>
                  <td>필기합격률</td>
                  <td>{acceptanceRateDoc}%</td>
                </tr>
                <tr>
                  <td>실기합격률</td>
                  <td>{acceptanceRatePrac}%</td>
                </tr>
                <tr>
                  <td>최종합격률</td>
                  <td>{acceptanceRateResult}%</td>
                </tr>
              </tbody>
            </Table> */}
          </Container>
          {/* Chart */}
          <Container>
            <Row className="d-flex justify-content-around">
              <Col lg={5} md={12} className="d-flex justify-content-center">
                <PieChart series={genderStats} />
              </Col>
              <Col lg={7} md={12} className="d-flex justify-content-center">
                <ColumnChart series={ageStats} />
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
    </>
  );
}