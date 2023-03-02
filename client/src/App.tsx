import { Route, Routes, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import CSS from "csstype";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Header from "./components/Header";
import AddManageCities from "./screens/ManageCities";
import Map from "./screens/Map";
import "./App.css";
import { useCitiesQuery } from "./gql/generated/schema";
import Register from "./screens/Register";
import bordeaux from "./assets/bordeaux.jpeg";
import lille from "./assets/lille.jpeg";
import paris from "./assets/paris.jpeg";
import PasswordReset from "./screens/PasswordReset";
import EmailPassword from "./screens/EmailPassword";
import InfoCity from "./screens/InfoCity";

const styles: CSS.Properties = {
  margin: 0,
  backgroundSize: "100vw",
};

//MOCK DATA CITIES
// const cities: {
//     id: number;
//     name: string;
//     city_area: string;
//     photo?: string;
//     user: {}[];
// }[] = [
//     {
//         id: 1,
//         name: "Bordeaux",
//         city_area: "44.8473900254569, -0.7188799313856008",
//         photo: bordeaux,
//         user: ["1", "2", "3"],
//     },
//     {
//         id: 2,
//         name: "Lille",
//         city_area: "50.62976866778606, 3.04621070309212",
//         photo: lille,
//         user: ["4", "5", "6"],
//     },
//     {
//         id: 3,
//         name: "Paris",
//         city_area: "48.87170691129766, 2.325403812427441",
//         photo: paris,
//         user: ["7", "8", "9"],
//     },
//     {
//         id: 4,
//         name: "Marseille",
//         city_area: "43.332225160179654, 5.398493055776797",
//         user: ["10", "11", "12"],
//     },
// ];

// interface City {
//   id: number;
//   name: string;
//   city_area: string;
//   photo?: string;
//   user: {}[];
// }

function App() {
  const path = window.location.pathname;

  const { loading: loadingCities, data } = useCitiesQuery();

  const cities = data?.cities ?? [];
  console.log(cities);
  return (
    <>
      <Toaster position="top-center" />
      <div style={styles}>
        {window.location.pathname !== "/login" ? <Header /> : null}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/email" element={<EmailPassword />} />
          <Route path="/password/reset/:token" element={<PasswordReset />} />
          {/* <Route path="*" element={<Home cities={cities} />} /> */}
          <Route
            path="/manage-cities"
            element={<AddManageCities cities={cities} />}
          />
          {/* <Route path="/info/:cityName" element={<InfoCity/>}/> */}
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
