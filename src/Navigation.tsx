import React from 'react'
import { Navbar } from 'react-bootstrap'

interface navigationProps {
    setResult: Function
}
const Navigation = (props: navigationProps) => {
  const resetSearch = () => {
    props.setResult(undefined);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand onClick = { resetSearch }>Soccer News</Navbar.Brand>
    </Navbar>
  )
}

export default Navigation;