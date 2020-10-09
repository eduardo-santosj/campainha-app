import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { saveHouses } from '../actions'

import { MenuAppBar } from '../components/toolBar'


class Home extends Component{
  state = {
    housesDataExist: []
  }
  componentDidMount() {
    const { dispatch } = this.props;
    axios.get(`http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json`)
    .then(res => {
      if(res.status === 200){
        const houses = res.data;
        this.setState({housesDataExist: houses})
        dispatch(saveHouses(houses));
      }
    })
  }
  render() {
    const housesDataExist = this.state.housesDataExist;
    return (
      <div className="home">
          <MenuAppBar/>
          <Container>
            <Row className="align-items-center">
              <Col className="align-self-center text-center">
                <h1>Buscador de Imóveis para Comprar ou Alugar</h1>
                <h3>Conte sempre conosco. Empresas do grupo Zap</h3>
                <h5>Zap Imóveis e Viva Real, apresentam:</h5>
              </Col>
            </Row>
            <Row className="align-items-center pt-4">
              <Col className="text-center">
                <Link exact to="/zap">
                  <Button variant="outline-dark" disabled={housesDataExist.length > 0 ? false : true} className="default-btn"><img alt="icone zap imóveis" src="https://cdnfiles.vivareal.com/emails/v2/logo_zap.png"/></Button>
                </Link>
              </Col>
              <Col className="text-center">
                <Link exact to="/viva-real">
                  <Button disabled={housesDataExist.length > 0 ? false : true} className="default-btn"><img className="icon-viva" alt="icone viva real imóveis" src="https://cdn1.vivareal.com/p/14948-bd25f0d/v/static/app/svg/styleguide/logo/vivareal-5bcdffca.svg"/></Button>
                </Link>  
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      state
    };
}
  
const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };