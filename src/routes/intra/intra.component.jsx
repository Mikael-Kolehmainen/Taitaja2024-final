import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./intra.styles.css";
import Footer from "../../components/footer/footer.component";
import Header from "../../components/header/header.component";
import {
  changeOwnPassword,
  changeUserPassword,
  createNewUser,
  deleteUserWithId,
  getAllUsers,
} from "../../backend/user";
import { getAllGames, storeNewGame, updateGame } from "../../backend/game";

const Intra = () => {
  const user = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [ownPassword, setOwnPassword] = useState("");
  const [newUser, setNewUser] = useState({ username: "", role: "" });
  const roles = ["user", "admin"];
  const [userPasswords, setUserPasswords] = useState([{}]);
  const [changeOwnPasswordMessage, setChangeOwnPasswordMessage] = useState("");
  const [userSuccessMessage, setUserSuccessMessage] = useState("");
  const [gameSuccessMessage, setGameSuccessMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [newGame, setNewGame] = useState({ title: "", imagePath: "", amountOfShownScores: 0 });
  const [fetchUsers, setFetchUsers] = useState(false);
  const [fetchGames, setFetchGames] = useState(false);
  const isAdmin = user.role === "admin";

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (!isAdmin) {
        return;
      }

      try {
        const getAllUsersRequest = {
          username: user.username,
          session: user.session,
        };
        const response = await getAllUsers(getAllUsersRequest);
        if (response.status == 200) {
          setAllUsers(response.data);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    fetchAllUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const fetchAllGames = async () => {
      if (!isAdmin) {
        return;
      }

      try {
        const response = await getAllGames();
        if (response.status == 200) {
          setAllGames(response.data);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    fetchAllGames();
  }, [fetchGames]);

  const handleChangeOwnPassword = async () => {
    if (!ownPassword) {
      setError("Salasana kenttä on tyhjä");
      return;
    }

    try {
      const changeOwnPasswordRequest = {
        username: user.username,
        session: user.session,
        newPassword: ownPassword,
      };
      const response = await changeOwnPassword(changeOwnPasswordRequest);
      if (response.status == 200) {
        setChangeOwnPasswordMessage("Salasana on vaihdettu.");
      }
    } catch (error) {
      console.error(error);
      setError(error.response.message);
    }
  };

  const handleUpdateUserPassword = async (event, userId) => {
    let allUserPasswords = [...userPasswords];
    allUserPasswords[userId] = event.target.value;

    setUserPasswords(allUserPasswords);
  };

  const handleChangeUserPassword = async (userId) => {
    if (!isAdmin) {
      return;
    }

    if (!userPasswords[userId]) {
      setError(`Käyttäjä (ID: ${userId}) salasana kenttä on tyhjä`);
      return;
    }

    try {
      const changeUserPasswordRequest = {
        username: user.username,
        session: user.session,
        newPassword: userPasswords[userId],
        userId: userId,
      };
      const response = await changeUserPassword(changeUserPasswordRequest);
      if (response.status == 200) {
        setUserSuccessMessage(`Käyttäjä (ID: ${userId}) salasana on vaihdettu.`);
      }
    } catch (error) {
      console.error(error);
      setError(error.response.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!isAdmin) {
      return;
    }

    try {
      const deleteUserRequest = {
        username: user.username,
        session: user.session,
        userId: userId,
      };
      await deleteUserWithId(deleteUserRequest);
      setUserSuccessMessage(`Käyttäjä (ID: ${userId}) on poistettu`);
      setFetchUsers((prevValue) => !prevValue);
    } catch (error) {
      console.error(error);
      setError(error.response.message);
    }
  };

  const handleCreateNewUser = async () => {
    if (!isAdmin) {
      return;
    }

    if (!newUser.username) {
      setError(`Uusi käyttäjänimi kenttä on tyhjä`);
      return;
    }

    try {
      const newUserRequest = {
        username: user.username,
        session: user.session,
        newUsername: newUser.username,
        role: newUser.role || "user",
      };
      const response = await createNewUser(newUserRequest);

      if (response.status == 200) {
        setUserSuccessMessage("Uusi käyttäjä on luotu");
        setFetchUsers((prevValue) => !prevValue);
        setNewUser({ username: "", role: "" });
      }
    } catch (error) {
      console.error(error);
      setError(error?.response?.message);
    }
  };

  const handleUpdateGameTitleState = (event, index) => {
    let games = [...allGames];
    games[index].title = event.target.value;

    setAllGames(games);
  };

  const handleUpdateGameShownScoresState = (event, index) => {
    let games = [...allGames];
    games[index].amountOfShownScores = event.target.value;

    setAllGames(games);
  };

  const handleUpdateGame = async (index) => {
    if (!isAdmin) {
      return;
    }

    try {
      const updateGameRequest = {
        id: allGames[index].id,
        title: allGames[index].title,
        imagePath: allGames[index].imagePath,
        createdAt: allGames[index].createdAt,
        amountOfShownScores: allGames[index].amountOfShownScores,
      };
      const response = await updateGame(updateGameRequest);
      if (response.status == 200) {
        setGameSuccessMessage("Peli on päivitetty.");
        setFetchGames((prevValue) => !prevValue);
      }
    } catch (error) {
      console.error(error);
      setError(error?.response?.message);
    }
  };

  const handleCreateNewGame = async () => {
    if (!isAdmin) {
      return;
    }

    try {
      const newGameRequest = {
        title: newGame.title,
        amountOfShownScores: newGame.amountOfShownScores,
      };
      const response = await storeNewGame(newGameRequest);
      if (response.status == 200) {
        setGameSuccessMessage("Uusi peli on luotu");
        setFetchGames((prevValue) => !prevValue);
        setNewGame({ title: "", imagePath: "", amountOfShownScores: 0 });
      }
    } catch (error) {
      console.error(error);
      setError(error?.response?.message);
    }
  };

  return (
    <>
      <Header isAuthenticated={true} />
      <section>
        <article>
          <h1>Intranet</h1>
          <p className="error">{error}</p>
          {isAdmin ? (
            <>
              <h3>Käyttäjät</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Käyttäjänimi</td>
                    <td>Vaihda salasana</td>
                    <td>Poista?</td>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user, i) => {
                    return (
                      <tr key={i}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td className="flex">
                          <input
                            type="password"
                            placeholder="Uusi salasana"
                            value={userPasswords[user.id]}
                            onChange={(e) => handleUpdateUserPassword(e, user.id)}
                            required
                          />
                          <input
                            type="submit"
                            value="Vaihda"
                            className="btn"
                            onClick={async () => await handleChangeUserPassword(user.id)}
                            required
                          />
                        </td>
                        <td>
                          <button className="btn" onClick={async () => await handleDeleteUser(user.id)}>
                            Poista
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="success">{userSuccessMessage}</p>
              <div className="configuration">
                <p>Lisää uusi käyttäjä:</p>
                <input
                  type="text"
                  placeholder="Käyttäjänimi"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />

                <select onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                  {roles.map((role, i) => {
                    return (
                      <option value={role} key={i}>
                        {role}
                      </option>
                    );
                  })}
                </select>
                <input type="submit" value="Luo" className="btn" onClick={async () => await handleCreateNewUser()} />
              </div>
            </>
          ) : (
            <></>
          )}
          {isAdmin ? (
            <>
              <h3>Pelit</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Otsikko</td>
                    <td>Kuva</td>
                    <td>Päivämäärä</td>
                    <td>Montako tulosta näytetään</td>
                  </tr>
                </thead>
                <tbody>
                  {allGames.map((game, i) => {
                    return (
                      <tr key={i}>
                        <td>{game.id}</td>
                        <td>
                          <input type="text" value={game.title} onChange={(e) => handleUpdateGameTitleState(e, i)} />
                          <input type="submit" value="Vaihda" onClick={async () => await handleUpdateGame(i)} />
                        </td>
                        <td>{game.imagePath}</td>
                        <td>{game.createdAt}</td>
                        <td>
                          <input
                            type="text"
                            value={game.amountOfShownScores}
                            onChange={(e) => handleUpdateGameShownScoresState(e, i)}
                          />
                          <input type="submit" value="Vaihda" onClick={async () => await handleUpdateGame(i)} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="success">{gameSuccessMessage}</p>
              <div className="configuration">
                <p>Lisää uusi peli:</p>
                <input
                  type="text"
                  placeholder="Pelin otsikko"
                  value={newGame.title}
                  onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Montako tulosta"
                  value={newGame.amountOfShownScores}
                  onChange={(e) => setNewGame({ ...newGame, amountOfShownScores: e.target.value })}
                />
                <input type="submit" className="btn" value="Luo" onClick={async () => await handleCreateNewGame()} />
              </div>
            </>
          ) : (
            <></>
          )}
          <h3>Omat asetukset</h3>
          <div className="configuration">
            <p>Vaihda salasana:</p>
            <input
              type="password"
              placeholder="Salasana"
              value={ownPassword}
              onChange={(e) => setOwnPassword(e.target.value)}
              required
            />
            <input type="submit" value="Vaihda" onClick={async () => await handleChangeOwnPassword()} />
            <p className="success">{changeOwnPasswordMessage}</p>
          </div>
        </article>
      </section>
      <Footer />
    </>
  );
};

export default Intra;
