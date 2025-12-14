import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Body from "./components/Body";
import Login from "./components/Login";
// Placeholders for now
const Feed = () => <div className="text-3xl font-bold text-center mt-10">Feed - Developer Cards (Coming Soon)</div>;
const Profile = () => <div className="text-2xl mt-10">User Profile Page</div>;
const Connections = () => <div className="text-2xl mt-10">Connections Page</div>;

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
