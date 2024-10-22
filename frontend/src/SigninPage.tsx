import { Footer, SigninForm } from "./components";
import { useAuth } from "./context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const SigninPage = () => {
  const { signup } = useAuth(); // Asegúrate de tener una función de registro en el contexto
  const navigate = useNavigate();

  const handleSignin = (username: string, password: string) => {
    if (username && password) {
      signup(username, password);
      navigate("/sitio-index");
    }
    console.log("Sign in details:", { username, password });
  };

  return (
    <>
      <SigninForm onSignin={handleSignin} />
      <Footer />
    </>
  );
};

export default SigninPage;