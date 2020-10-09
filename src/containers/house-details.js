import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Container, Carousel, ListGroup } from 'react-bootstrap'
import { MapContainer } from '../components/maps'


import { MenuAppBar } from '../components/toolBar'


//logo

class Details extends Component{
  state = {
    idHouse:''
  }

  componentDidMount() {
    this.receiveHouse(this.props.housesState.houses)
  }

  receiveHouse = (housesData) => {
    let idHouse = window.location.pathname;
    idHouse = idHouse.split("/")
    idHouse = idHouse[2]
    
    const houseInfo = housesData.filter(item => {
      if(item.id === idHouse){
        return item
      }
    });

    const houseDetail = houseInfo.map(item => {
        const nameHouse = item.pricingInfos.businessType === 'RENTAL' ? 'Aluguel' : 'Venda';
        const numberBathrooms = item.bathrooms;
        const numberBedrooms = item.bedrooms;
        const numberParkingSpaces = item.parkingSpaces;
        const addressHouse = `${item.address.neighborhood} - ${item.address.city}`
        const geolocationHouse = item.address.geoLocation.location
        const priceHouse = item.pricingInfos.rentalTotalPrice ? item.pricingInfos.rentalTotalPrice : (item.pricingInfos.price && item.pricingInfos.businessType === 'SALE') ? item.pricingInfos.price : '0'
        const formatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2
        })


        return(
          <div className="details">
            <Carousel>
              {item.images.map(image => {
                return(
                  <Carousel.Item>
                    <img
                      className="d-block w-100 img-fluid m-height"
                      src={image}
                      alt="First slide"
                    />
                  </Carousel.Item>
                )
              })}
            </Carousel>
            <Container className="mt-4">
              <Row>
                <Col>
                  <h2>Incrivel Imóvel para {nameHouse}, na região de {item.address.city}</h2>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <h3>Pelo valor de: {priceHouse !== 0 ? formatter.format(priceHouse) : 'Sob Consulta'}</h3>
                  <br/>
                    <p>Nele você encontra:</p>
                    <div>
                    <ListGroup horizontal>
                      <ListGroup.Item className="text-center">
                        <label><i class="fas fa-toilet"></i></label><br/> <small>{numberBathrooms} Banheiros</small>
                      </ListGroup.Item>
                      <ListGroup.Item className="text-center">
                        <label className="ml-2"><i class="fas fa-bed"></i></label><br/> <small>{numberBedrooms} Quartos</small>
                      </ListGroup.Item>
                      <ListGroup.Item className="text-center">
                        <label className="ml-2"><i class="fas fa-warehouse"></i></label><br/> <small>{numberParkingSpaces} Vagas</small>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <img className="img-fluid" src={`https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&markers=size:normal%7Ccolor:blue%7Clabel:P%7C${geolocationHouse.lat},${geolocationHouse.lon}&key=AIzaSyAxnbgzk6BRWWumBc2TwPC2sBQWPOE_Wt4`}/>
                </Col>
              </Row>
            </Container>
          </div>
        )
      });

    this.setState({
      houseDetail
    })
  }
  render() {
    return (
      <div>
          <MenuAppBar/>
          {this.state.houseDetail}
      </div>
    );
  }
}

function mapStateToProps(props) {
    const { housesState } = props
    return {
      housesState
    };
}
  
const connectedDetails = connect(mapStateToProps)(Details);
export { connectedDetails as Details };