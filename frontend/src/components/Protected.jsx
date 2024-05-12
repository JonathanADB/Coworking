import { useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/auth-context';

function withAuthentication(Component) {
  return function AuthenticatedComponent(props) {
    const { currentUser, isUserLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isAuthStateKnown, setIsAuthStateKnown] = useState(false);

    useEffect(() => {
      if (!isUserLoggedIn) {
        navigate('/login');
      } else {
        setIsAuthStateKnown(true);
      }
    }, [isUserLoggedIn, navigate]);

    if (!isAuthStateKnown) {
      return null;
    }

    return <Component {...props} />;
  };
}
export default withAuthentication;