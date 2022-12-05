import { createContext, useContext } from "react";
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext();


export const AuthProvider = ({
  children,
}) => {
  const [auth, setAuth] = useLocalStorage('auth', {});

  const userLogin = (authData) => {
    setAuth(authData);// setvame ssesion data
  }

  const userLogout = () => {
    setAuth({});//mahame ssesion data
  };

  return (
    <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
      {children}
    </AuthContext.Provider>
  )
};


//export const useAuthContext = () => {
//    const context = useContext(AuthContext);

//    return context
//};
//CUTOM HOOK 



export const withAuth = (Component) => {//funkciq koqto priema i vrushrta komponent
  const WrapperComponent = (props) => {
    const context = useContext(AuthContext);

    return <Component {...props} auth={context} />
  }
  return WrapperComponent;
}
//with HOC
