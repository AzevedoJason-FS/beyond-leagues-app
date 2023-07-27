import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./component/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import FantasyPlayers from "./features/fantasy-players/FantasyPlayers";
import UsersList from "./features/users/UsersList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
          <Route path="fantasy-players">
            <Route index element={<FantasyPlayers />} />
          </Route>
          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>
        </Route>{/* End Dash */}
      </Route>
    </Routes>
  );
};

export default App;
