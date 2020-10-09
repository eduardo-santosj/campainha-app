import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap'


import { MenuAppBar } from '../components/toolBar'
import { Pagination } from '../components/pagination'



//logo

class VivaReal extends Component{
  state = {

  }
  render() {
    return (
      <div>
          <MenuAppBar/>
          <Container>
            <Row>
              <Col>
                <h2 className="text-center">A sua nova casa está aqui no Viva Real.</h2>
              </Col>
            </Row>
            <Pagination origin='viva-real'/>
          </Container>
      </div>
    );
  }
}

function mapStateToProps(props) {
    return {
      props
    };
}
  
const connectedVivaReal = connect(mapStateToProps)(VivaReal);
export { connectedVivaReal as VivaReal };