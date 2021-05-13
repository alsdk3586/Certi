import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, Container } from 'react-bootstrap';
import LineChart from './LineChart';
import PieChart from './PieChart';
import ColumnChart from './ColumnChart';
import axios from 'axios';

export default function CustomModal(props) {
  const eventData = props.data;
  const code = props.data.code;
  const [stats, setStats] = useState();
  const [acceptanceRateDoc, setDoc] = useState(null);
  const [acceptanceRatePrac, setPrac] = useState(null);
  const [acceptanceRateResult, setResult] = useState(null);
  
    axios.get(`http://localhost:8080/certificate/statistics/${code}`)
    .then((res)=> {
      const data = res.data;
      data.forEach(elem => {
        let stat = {
          statisticAge: elem.statisticAge,
          statisticGender: elem.statisticGender,
          statisticNumber: elem.scheduleDocRegStartDt,
        }
      }
      );
    })
    .catch((err) => {
      console.log(err)
    })
    axios.get(`http://localhost:8080/certificate/acceptancerate/${code}`)
    .then((res)=> {
      const acceptRate = res.data[res.data.length-1];
      setDoc(acceptRate.acceptanceRateDoc);
      setPrac(acceptRate.acceptanceRatePrac);
      setResult(acceptRate.acceptanceRateResult);
    })
    .catch((err)=> {console.log(err)})

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {eventData.code}
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
          <PieChart />
          <ColumnChart />
          <LineChart />

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}