import { React, useEffect, useState } from "react";
import axios from "axios";
import Dots from "../images/dots.png";
import Naked_Logo from "../images/naked_logo.png";
import Coins from "../images/coins.svg";
import Sword from "../images/sword.svg";
import Gold from "../images/gold.svg";
import Shield from "../images/shield.svg";

const Management = () => {
  const [items, setItems] = useState();
  const [bets, setBets] = useState([]);
  const [totalOdds, setTotalOdds] = useState([]);
  const [entry, setEntry] = useState(0);
  const [win, setWin] = useState(0);
  const [multiplier, setMultiplier] = useState(0);
  const [user, setUser] = useState([]);
  const [balance, setBalance] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3500/fantasy-players/Kills`)
      .then((response) => {
        setItems(response.data);
      });

    axios
      .get("http://localhost:3500/auth/me/64c52a4eab79e620b2d89ed5")
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
        setBalance(response.data[0].money);
      });
  }, []);

  useEffect(() => {
    const values = totalOdds.reduce((total, obj) => obj.chosenOdd + total, 0);
    setMultiplier(values);

    const x = entry * values;

    setWin(x.toFixed(2));
  }, [totalOdds, entry, win]);

  //   const getAssistOdds = (e) => {
  //     e.preventDefault();
  //     axios
  //       .get(`http://localhost:3500/fantasy-players/Assists`)
  //       .then((response) => {
  //         setItems(response.data);
  //         console.log(response.data);
  //       });
  //   };

  //   const getKillsOdds = (e) => {
  //     e.preventDefault();
  //     axios
  //       .get(`http://localhost:3500/fantasy-players/Kills`)
  //       .then((response) => {
  //         setItems(response.data);
  //         console.log(response.data);
  //       });
  //   };

  const handleAdd = (e, id, payload) => {
    e.preventDefault();
    if (entry > balance) {
    } else if (bets.includes(payload)) {
      setBets((current) => current.filter((player) => !(player._id === id)));
      setTotalOdds((current) =>
        current.filter((player) => !(player.id === id))
      );
    } else {
      setBets((current) => [payload, ...current]);
    }
  };

  const handleOverUnder = (e, id, overUnder) => {
    e.preventDefault();

    const check = (totalOdds) => totalOdds.id === id;
    const exist = totalOdds.some(check);

    if (exist) {
    } else {
      setTotalOdds((current) => [
        { id: id, chosenOdd: Number(overUnder) },
        ...current,
      ]);
    }
  };

  const handleBet = (e, userId, selectBets, winAmount, betAmount) => {
    e.preventDefault();
  

    let newBalance = balance - betAmount;

    selectBets.forEach((bet) => {

      const bet_object = {
        user_id: userId,
        bet: bet.id,
        chosen_odd: bet.chosenOdd,
        win_amount: winAmount,
        new_balance: newBalance,
      };
      
      setBalance(newBalance);
      setEntry(0);
      setBets([]);
      setWin();
      setMultiplier(0);

      axios
        .post(`http://localhost:3500/my-bets`, bet_object)
        .then((response) => {
          console.log(response.data);
        });
    });
  };

  return (
    <>
      {user && user.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginBottom: "4rem",
              alignItems: "center",
              backgroundColor: "#1b293D",
              paddingRight: "20px",
              borderRadius: "8px",
            }}
          >
            <img src={Coins} style={{ width: "70px" }} alt="logo" />
            <b style={{ color: "#3273fa", fontSize: "24px" }}>${balance}</b>
          </div>
        </div>
      ) : (
        <p></p>
      )}
      <div className="game_header">
        <button id="odds_btn">
          {/* onClick={(e) => getKillsOdds(e)}  */}
          <img
            src={Sword}
            style={{ width: "24px", color: "white", marginRight: "10px" }}
          />
          Kills
        </button>
        <button id="odds_btn">
          {/* onClick={(e) => getAssistOdds(e)}  */}
          <img
            src={Shield}
            style={{ width: "24px", color: "white", marginRight: "10px" }}
          />
          Assists
        </button>
        <button id="odds_btn">
          {/* onClick={(e) => getKillsOdds(e)} */}
          <img
            src={Gold}
            style={{ width: "24px", color: "white", marginRight: "10px" }}
          />
          GD@15
        </button>
      </div>
      <div className="container">
        <div className="pick-container">
          {items && items.length > 0 ? (
            items.map((player) => (
              <div className="card" key={player._id}>
                <h2 id="player_name">{player.name}</h2>
                <p>
                  {player.team.name} - {player.role}
                </p>
                <img src={player.image} id="player_card" alt="player card" />
                {bets.includes(player) ? (
                  <span className="checkmark">
                    <div className="checkmark_stem"></div>
                    <div className="checkmark_kick"></div>
                  </span>
                ) : (
                  <span className="checkmark"></span>
                )}
                <div id="odds">
                  <h2 id="odds_number">{player.odds}</h2>
                  <img src={Dots} alt="middle dots" id="dots" />
                  <p>{player.odds_obj}</p>
                </div>
                <button
                  id="odds_btn_add"
                  onClick={(e) => handleAdd(e, player._id, player)}
                ></button>
                {/* {match.opponents.map((team) => (
                <div>
                <img src={team.logo} />
                <h2>{team.name}</h2>
                </div>
            ))} */}
              </div>
            ))
          ) : (
            <p>No Selections Today</p>
          )}
        </div>
        <div className="bet_slip_container">
          <div id="bet_slip_title">
            <h3>Bet Slip</h3>
            <h2 id="bet_slip_amount">{bets.length}</h2>
          </div>
          {bets && bets.length > 0 ? (
            bets.map((bet) => (
              <>
                <div className="bet_slip_player" key={bet._id}>
                  <button
                    onClick={(e) => handleAdd(e, bet._id, bet)}
                    id="remove_bet"
                  >
                    -
                  </button>
                  <p>
                    <b>{bet.name}</b>
                  </p>
                  <img
                    src={bet.image}
                    id="background_image"
                    alt="player card"
                  />
                  <p id="player_detail">
                    {bet.team.name} - {bet.role}
                  </p>
                  <p id="player_detail">
                    {bet.odds_obj}: <b id="odd_number">{bet.odds}</b>
                  </p>
                  <p id="player_detail">Odds Over: x{bet.multiplier_over}</p>
                  <p id="player_detail">Odds Under: x{bet.multiplier_under}</p>
                  <div className="over_under_box">
                    {totalOdds.some((totalOdds) => totalOdds.id === bet._id) ? (
                      <p></p>
                    ) : (
                      <>
                        <button
                          id="multiplier_btn"
                          onClick={(e) =>
                            handleOverUnder(e, bet._id, bet.multiplier_over)
                          }
                        >
                          OVER
                        </button>
                        <button
                          id="multiplier_btn"
                          onClick={(e) =>
                            handleOverUnder(e, bet._id, bet.multiplier_under)
                          }
                        >
                          UNDER
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </>
            ))
          ) : (
            <p>no current bets</p>
          )}
          <div>
            <div id="retuns_box">
              <div id="entry_box">
                <p>Entry</p>
                <div id="entry_sign">
                  <p>$</p>
                  <input
                    type="number"
                    onChange={(e) => setEntry(e.target.value)}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-"].includes(evt.key) &&
                      evt.preventDefault()
                    }
                    id="entry_value"
                    placeholder="0"
                  />
                </div>
              </div>
              <div id="to_win_box">
                <p>To Win</p>
                <div id="entry_sign">
                  <p>$</p>
                  <h2>{win}</h2>
                </div>
              </div>
              <div>
                <p>Multiplier</p>
                <h3>
                  <b style={{ color: "#3273fa", fontSize: "32px" }}>x</b>
                  {multiplier.toFixed(2)}
                </h3>
              </div>
            </div>
            <button
              type="submit"
              id="submit_btn"
              onClick={(e) => handleBet(e, user[0]._id, totalOdds, win, entry)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Management;
