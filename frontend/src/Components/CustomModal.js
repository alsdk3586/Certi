import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, Container, Row, Col } from 'react-bootstrap';
import LineChart from './LineChart';
import PieChart from './PieChart';
import ColumnChart from './ColumnChart';
import axios from 'axios';
import BtnStar from './BtnStar';

export default function CustomModal(props) {
  const eventData = props.data;
  const code = props.data.code;
  const [stats, setStats] = useState();
  const [title, setTitle] = useState('');
  const [acceptanceRateDoc, setDoc] = useState(null);
  const [acceptanceRatePrac, setPrac] = useState(null);
  const [acceptanceRateResult, setResult] = useState(null);
  
  useEffect(() => {
    axios.get(`http://localhost:8080/certificate/statistics/${code}`)
    .then((res)=> {
      const data = res.data;
      let stat = {  
        statisticAge: data.statisticAge,
        statisticGender: data.statisticGender,
        statisticNumber: data.statisticGetNumber,
      }
      setStats(stat)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [eventData])
  
  useEffect(() => {
    axios.get(`http://localhost:8080/certificate/acceptancerate/${code}`)
    .then((res)=> {
      const acceptRate = res.data[res.data.length-1];
      setDoc(acceptRate.acceptanceRateDoc);
      setPrac(acceptRate.acceptanceRatePrac);
      setResult(acceptRate.acceptanceRateResult);
      setTitle(acceptRate.certificateCode.certificateClassificationCode);
    })
    .catch((err)=> {console.log(err)})
  }, [eventData])

  return (
    <>
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {title}
          <BtnStar isFilled={true}/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container >
            <Table border size="md">
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
            </Table>
          </Container>
          {/* Chart */}
          <Container>
            <Row className="d-flex justify-content-around">
              <Col lg={6} md={12} className="d-flex justify-content-center">
                <PieChart series={stats}/>
              </Col>
              <Col lg={6} md={12} className="d-flex justify-content-center">
                <ColumnChart />
              </Col>
              <Col lg={12} className="d-flex justify-content-center">
                <LineChart />
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