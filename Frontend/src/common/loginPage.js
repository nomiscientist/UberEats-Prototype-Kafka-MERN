import {Button} from 'react-bootstrap';
import { Link} from 'react-router-dom';

const HomePage = props => {


return (
    <div>
     <Link to = "/restaurantSignUp">  <Button variant="dark">Restaurant SignUp</Button> </Link>
     <Link to = "/customerSignUp"> <Button variant="dark">Customer SignUp</Button> </Link>
    </div>
);


}

export default HomePage;