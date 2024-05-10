import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/auth-context';

function withAuthentication(Component) {
  return function AuthenticatedComponent(props) {
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isAuthStateKnown, setIsAuthStateKnown] = useState(false);

    useEffect(() => {
      if (!authState.token) {
        navigate('/login');
      } else {
        setIsAuthStateKnown(true);
      }
    }, [authState, navigate]);

    if (!isAuthStateKnown) {
      return null;
    }

    return <Component {...props} />;
  };
}

export default withAuthentication;