import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "../css/Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "728466374633-tela4eovuk3jdagsce8gbsk20v6m6f1p.apps.googleusercontent.com";

const Home = ({ userId, handleLogin, handleLogout }) => {
  const handlePlayLocal = () => {
    console.log("New Button Clicked");
  };
  const handlePlayOnline = () => {
    console.log("New Button Clicked");
  };
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex-container">
        {userId ? (
          <button
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
        <div className="buttons-container">
          <button onClick={handlePlayLocal}>Play Local</button>
          <button onClick={handlePlayOnline}>Play Online</button>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Home;
