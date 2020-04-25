import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import CardColumns from 'react-bootstrap/CardColumns';
import Container from 'react-bootstrap/Container'
import {Row, Col} from 'react-bootstrap'
import '../src/App.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import GoogleMapReact from 'google-map-react';
import Navbar from 'react-bootstrap/Navbar';
import {Nav, NavDropdown} from 'react-bootstrap';

function App() {
  const [latest, setLatest] = useState("");
  const [results, setResults] = useState([]);
  const[searchforCountry, setSearchForCountry] = useState("");

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries")
      ])
      .then(resArr => {
        setLatest(resArr[0].data);
        setResults(resArr[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toDateString();

  const filterCountries = results.filter(item => {
    return searchforCountry !== ""
      ? item.country.includes(searchforCountry)
      : item;
  });

  const countriesLocation = results.map((data, index) => {
    return (
      <div
        lat={data.countryInfo.lat}
        lng={data.countryInfo.long}
        style={{
          color: "red",
          backgroundColor: "#FFF",
          height: "25px",
          width: "35px",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <img alt="flag" height="10px" src={data.countryInfo.flag} />
        <br />
        {data.cases}
      </div>
    );
  });
  
  const countriesInfected = filterCountries.map((data, index) => {
    return(
      <Card 
        key={index}
        bg="light" 
        text="black" 
        className="text-center"
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases {data.cases}</Card.Text>
          <Card.Text>Deaths {data.deaths}</Card.Text>
          <Card.Text>Healed {data.recovered}</Card.Text>
          <Card.Text>Today Cases {data.todayCases}</Card.Text>
          <Card.Text>Today Deaths {data.todayDeaths}</Card.Text>
          <Card.Text>Active {data.active}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="#home">COVID-19 Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/media-resources/news">WHO News</Nav.Link>
            <Nav.Link href="https://tandduong.github.io/new-portfolio-tan/" target="_blank">See Portfolio</Nav.Link>
            
            <NavDropdown title="By Tan D. Duong" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#search">Search</NavDropdown.Item>
              <NavDropdown.Item href="#map">See Map</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="https://tandduong.com/contact-me/" target="_blank">Contact In My Official Website</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    <CardDeck className="carddeck">
      <Container>
        <Row>
          <Col xs={4} md={4}>
        <Card border="warning" text="black" className="text-center card card-1">
          <Card.Body>
            <div className="card-title"><Card.Title>Cases </Card.Title></div>
            <Card.Text>
              {latest.cases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
  <small>{lastUpdated}</small>
          </Card.Footer>
        </Card>
        </Col>

        <Col xs={4} md={4}>
        <Card border="danger" text="black" className="text-center card card-2">
          <Card.Body>
          <div className="card-title"><Card.Title>Deaths</Card.Title></div>
            <Card.Text>
              {latest.deaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>{lastUpdated}</small>
          </Card.Footer>
        </Card >
        </Col>

        <Col xs={4} md={4}>
        <Card border="success" text="black" className="text-center card card-3">
          <Card.Body>
          <div className="card-title"><Card.Title>Healed</Card.Title></div>
            <Card.Text>
              {latest.recovered}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>{lastUpdated}</small>
          </Card.Footer>
        </Card>
        </Col>
        </Row>
      </Container>
    </CardDeck>
    <Form>
      <Form.Group controlId="Search">
          <div className="search" id="search">Search Country</div>
          <div className="sub-search" id="search"><p>Uppercase Required for the first letter (e.g: 'V' for Vietnam)</p></div>
      <div className="input">
        <Form.Control
          type="text"
          placeholder="Search location"
          onChange={e => setSearchForCountry(e.target.value)} />
          </div>
        <Form.Text className=""></Form.Text>
      </Form.Group>
    </Form>
      <CardColumns className="country-info">{countriesInfected}</CardColumns>

      <div id="map" style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "YOUR API KEY HERE" }}
          defaultCenter={{
            lat:21, lng: 105.8
          }}
          defaultZoom={3}
        >
          {countriesLocation}
        </GoogleMapReact>
      </div>

      <div className="footer">
        Copyright Tan D. Duong &copy; 2020
         
        <div class="icon">
            <a href="https://twitter.com/TanDDuong1">
                <i class="fab fa-twitter fa-2x"></i>
            </a>

            <a href="https://www.facebook.com/tdd1912">
                <i class="fab fa-facebook fa-2x"></i>
            </a>

            <a href="https://github.com/tandduong/">
                <i class="fab fa-github fa-2x"></i>
            </a>

            <a href="https://www.linkedin.com/in/tan-duong-84a711174/">
                <i class="fab fa-linkedin-in fa-2x"></i>
            </a>

            <a href="https://www.instagram.com/tandduong/">
                <i class="fab fa-instagram fa-2x"></i>
            </a>
        </div>
      </div>
    </div>
  );
}

export default App;
