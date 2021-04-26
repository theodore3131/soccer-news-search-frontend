import { Navbar } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

const Navigation = () => {
  const history = useHistory();
  const returnToMain = () => history.push('/');

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand onClick = { returnToMain }>Soccer News</Navbar.Brand>
    </Navbar>
  )
}

export default Navigation;