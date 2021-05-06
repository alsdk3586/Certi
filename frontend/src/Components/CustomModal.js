import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import LineChart from './LineChart';

export default function CustomModal(props) {
  const eventData = props.data;

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
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped border size="md">
            <tbody>
              <tr>
                <td>필기시험접수일</td>
                <td>{eventData.startDt}</td>
              </tr>
              <tr>
                <td>필기시험일</td>
                <td>{eventData.endDt}</td>
              </tr>
              <tr>
                <td>필기합격률</td>
                <td>{eventData.acceptancerate_doc*100}%</td>
              </tr>
              <tr>
                <td>실기합격률</td>
                <td>{eventData.acceptancerate_result*100}%</td>
              </tr>
              <tr>
                <td>최종합격률</td>
                <td>{eventData.acceptancerate_prac*100}%</td>
              </tr>
            </tbody>
          </Table>
          {/* Chart */}
          <LineChart />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}