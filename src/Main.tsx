import { Row, Col } from 'react-bootstrap';
import Search from './Search';
import logo2 from './images/logo2.png';
import { searchProps } from './interfaces';

const Main = (props: searchProps) => {
  return (
    <div>
      <br /><br />
      <Row className='justify-content-md-center'>
        <img src={logo2} alt='logo' className='logo'/>
      </Row>
      <Row className='justify-content-md-center'>
        <Col>
        <Search setResult = {props.setResult} />
        </Col>
      </Row> 
    </div>
  )
}

export default Main;