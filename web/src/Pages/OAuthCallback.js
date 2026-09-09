import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { accountCheckAndGet } from "../endpoints/rest/auth";
import { setStoredUser, setTokens } from "../api/tokenStorage";
import { userContext } from "../Context/UserContext";

function OAuthCallback() {
  const { setUser } = useContext(userContext);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");
  const refreshToken = params.get("refreshToken");

  useEffect(() => {
    if (!token || !refreshToken) {
      navigate("/login");
      return;
    }

    setTokens(token, refreshToken);

    accountCheckAndGet()
      .then((currentUser) => {
        setStoredUser(currentUser);
        setUser(currentUser);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate, refreshToken, setUser, token]);

  return <div className="loading">Accesso in corso...</div>;
}

export default OAuthCallback;
