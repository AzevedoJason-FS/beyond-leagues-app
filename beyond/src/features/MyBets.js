import { useState, useEffect } from "react";
import axios from "axios";
import DashHeader from "../components/DashHeader";

const Login = () => {
  const [bets, setBets] = useState([]);
  const [totalWin, setTotalWin] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3500/my-bets/64c52a4eab79e620b2d89ed5`)
      .then((response) => {
        setBets(response.data);
      });
  }, []);


  return (
    <>
      <DashHeader />
      {bets && bets.length > 0 ? (
        bets.map((bet) => (
          <div key={bet._id}>
            <p>{bet._id}</p>
          </div>
        ))
      ) : (
        <p>nothing</p>
      )}
    </>
  );
};

export default Login;
