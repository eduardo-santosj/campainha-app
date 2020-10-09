import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap'


import { MenuAppBar } from '../components/toolBar'
import { Pagination } from '../components/pagination'


class Zap extends Component{
  render() {
    return (
      <div>
          <MenuAppBar/>
          <Container>
            <Row>
              <Col>
                <h2 className="text-center">Quando o assunto é imóvel, o ZAP tem todas as soluções.</h2>
              </Col>
            </Row>
            <Pagination origin='zap'/>
          </Container>
      </div>
    );
  }
}

function mapStateToProps(props) {
  const { housesState } = props;
    return {
      housesState
    };
}
  
const connectedZap = connect(mapStateToProps)(Zap);
export { connectedZap as Zap };