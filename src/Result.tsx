import { useState } from 'react'
import { Row, Col, Card, Pagination } from 'react-bootstrap'
import { resultProps } from './interfaces'

const PAGE_SIZE = 15;

const Result = (props: resultProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [prevDisabled, setPrevDisabled] = useState<boolean>(false);
  const [nextDisabled, setNextDisabled] = useState<boolean>(false);

  const totalPages = Math.ceil(props.result.length / PAGE_SIZE);
  const firstPage = () => setCurrentPage(1);
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (currentPage === totalPages - 1) {
        setNextDisabled(false);
      }
      if (currentPage === 1) {
        setPrevDisabled(true)
      }
    }
  }
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      if (currentPage ===  2) {
        setPrevDisabled(false);
      }
      if (currentPage === totalPages) {
        setNextDisabled(true)
      }
    }
  }
  const lastPage = () => setCurrentPage(totalPages)
  const pageClick = (pageNumber: number) => setCurrentPage(pageNumber);

  const range = (start: number, end: number, step = 1) => {
    let output = [];
    if (typeof end === 'undefined') {
      end = start;
      start = 0;
    }
    for (let i = start; i < end; i += step) {
      output.push(i);
    }
    return output;
  };

  return (
    <div>
      <br/><hr/>
      {props.result.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
        .map((ele) => {
          return (
            <Card key={ele.id}>
              <Row>
                <Col md={1}>
                  <a href={ele.address}>
                    <Card.Img src={ele.image_src} className='image' />
                  </a>
                </Col>
                <Col>
                  <Card.Header as="h5">
                  <a href={ele.address}>{ele.title}</a>
                  <span className='timestamp'>{ele.timestamp}</span>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {ele.snippet}
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
        )
      })}
      <hr/>
      <Pagination className='center'>
        <Pagination.First onClick = {firstPage} />
        <Pagination.Prev disabled = {prevDisabled} onClick = {prevPage} />
        {
          range(1, totalPages + 1).map((index) =>
            <Pagination.Item 
              key={index}
              active={index === currentPage}
              onClick = {() => pageClick(index)}
            >{index}</Pagination.Item>
          )
        }
        <Pagination.Next disabled = {nextDisabled} onClick = {nextPage} />
        <Pagination.Last onClick = {lastPage} />
      </Pagination>
    </div>
  )
}

export default Result;