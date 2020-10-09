import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom'
import { Col, Button, Card, Row } from 'react-bootstrap'



class Pagination extends Component{
  state = {
    offset: 0,
    data: [],
    perPage: 20,
    currentPage: 0
  }

  componentDidMount() {
    this.receivedData(this.props.housesState.houses)
  }

  receivedData = (housesData) => {
    const originGet = this.props.origin.origin
    const houses = [];
    housesData.filter(item => {
      if(originGet === "zap") {
        if(item.address.geoLocation.location.lat !== 0 && item.address.geoLocation.location.lon !== 0) {
          if((item.pricingInfos.businessType === 'RENTAL' && item.pricingInfos.rentalTotalPrice >= 3500) || (item.pricingInfos.businessType === 'SALE' && item.pricingInfos.price >= 600000) || (item.pricingInfos.businessType === 'SALE' && item.usableAreas > 3500) || (item.pricingInfos.businessType === 'SALE' && (item.address.geoLocation.location.lat > -23.568704 || item.address.geoLocation.location.lat < -23.546686) && (item.address.geoLocation.location.lon > -46.693419 || item.address.geoLocation.location.lon < -46.641146) && item.pricingInfos.price >= item.pricingInfos.price - ( item.pricingInfos.price*10/100 ))) {
            houses.push(item)
          }
        }
      } else {
        if(item.address.geoLocation.location.lat !== 0 && item.address.geoLocation.location.lon !== 0) {
          let    valueCondo = 0
          if(item.pricingInfos.businessType === 'RENTAL'){
            const v1 = parseInt(item.pricingInfos.rentalTotalPrice);
            const v2 = parseInt(item.pricingInfos.monthlyCondoFee);
            valueCondo = (((v1 - v2)/v1)*100).toFixed(0)
          }
          if((item.pricingInfos.businessType === 'RENTAL' && item.pricingInfos.rentalTotalPrice <= 4000) || (item.pricingInfos.businessType === 'SALE' && item.pricingInfos.price <= 700000) || (item.pricingInfos.businessType === 'RENTAL' && item.pricingInfos.monthlyCondoFee && valueCondo < 30) || (item.pricingInfos.businessType === 'RENTAL' && (item.address.geoLocation.location.lat > -23.568704 || item.address.geoLocation.location.lat < -23.546686) && (item.address.geoLocation.location.lon > -46.693419 || item.address.geoLocation.location.lon < -46.641146) && item.pricingInfos.rentalTotalPrice <= item.pricingInfos.rentalTotalPrice + ( item.pricingInfos.rentalTotalPrice*50/100 ))) {
            houses.push(item)
          }
        }
      }
    });

    
    const data = houses;
    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    const postData = slice.map(house => {
      const nameHouse = house.pricingInfos.businessType === 'RENTAL' ? 'Aluguel' : 'Venda';
      const numberBathrooms = house.bathrooms;
      const numberBedrooms = house.bedrooms;
      const numberParkingSpaces = house.parkingSpaces;
      const addressHouse = house.address.city || house.address.neighborhood ? `${house.address.neighborhood} - ${house.address.city}` : `${house.address.geoLocation.precision}`
      const priceHouse = house.pricingInfos.rentalTotalPrice ? house.pricingInfos.rentalTotalPrice : (house.pricingInfos.price && house.pricingInfos.businessType === 'SALE') ? house.pricingInfos.price : '0'
      const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      })
      return(
        <Col className="d-flex justify-content-center mb-4">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={house.images[0]} />
              <Card.Body>
                <Card.Title>Para {nameHouse}</Card.Title>
                <Card.Text>
                  <small>{addressHouse}</small>
                  <br/>
                  <label>Valor {nameHouse}:</label><small> {priceHouse !== 0 ? formatter.format(priceHouse) : 'Sob Consulta'}</small>
                  <br/>
                  <label><i class="fas fa-toilet"></i></label> <small>{numberBathrooms}</small>
                  <label className="ml-2"><i class="fas fa-bed"></i></label> <small>{numberBedrooms}</small>
                  <label className="ml-2"><i class="fas fa-warehouse"></i></label> <small>{numberParkingSpaces}</small>

                </Card.Text>
              <Link to={`/house/${house.id}`}>
                <Button variant="primary">Veja Mais <i class="fas fa-arrow-right"></i></Button>
              </Link>
              </Card.Body>
          </Card>
        </Col>
      )
    })
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      postData,
      houses
    })
  }

  handlePageClick = (e) => {
    const houses = this.props.housesState.houses;
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.receivedData(houses)
    });

};

  render() {
    return (
      <div>
        <Row className="align-items-center">
          {this.state.postData}
        </Row>
        <Row>
          <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}/>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(props, origin) {
  const { housesState } = props
    return {
      housesState,
      origin
    };
}
  
const connectedPagination = connect(mapStateToProps)(Pagination);
export { connectedPagination as Pagination };