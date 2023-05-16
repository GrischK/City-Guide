import { useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AnimatedCard from "../components/AnimatedCard";
import ICity from "../interfaces/ICity";
import { filterBySearch } from "../utils/helpers";
import { useCitiesQuery, useGetProfileQuery } from "../gql/generated/schema";
import IState from "../interfaces/IState";

export default function Home() {
  // gets the params from URL
  const [searchParams, setSearchParams] = useSearchParams();

  const { loading: loadingCities, data, refetch } = useCitiesQuery();

  const cities = data?.cities ?? [];
  // State to manage both URL query & cities to display
  const [state, setState] = useState<IState>({
    query: searchParams.get("query") ?? "",
    list: [],
  });

  // takes in value from the search bar and returns a filtered list of the cities to display
  //(filter improves with each letter)
  //searchParams controls the URL (what comes after the "?")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const results = cities.filter((city) => {
      if (e.target.value === " ") return cities;
      return city.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchParams({ query: e.target.value });
    setState({
      query: e.target.value,
      list: results,
    });
  };

    const { data: currentUser } = useGetProfileQuery({
        errorPolicy: "ignore"
    });

    const currentUserRole = currentUser?.profile?.role;
    console.log(currentUserRole);

    return (
        <>
            <form>
                <input
                    value={state.query}
                    onChange={handleChange}
                    placeholder="Rechercher une ville..."
                    type="search"
                ></input>
            </form>

            <div className={"homeStyle"}>
                {(currentUserRole === "cityAdmin" || currentUserRole === "superAdmin") &&
                <Link to={"/manage-cities"}>
                    <button className={"addCityButtonStyles"}>
                        <AddCircleOutlineOutlinedIcon/>
                        <p>AJOUTER UNE VILLE</p>
                    </button>
                </Link>
                }
                {(currentUserRole === "cityAdmin" || currentUserRole === "superAdmin") &&
                    <Link to={"/manage-users"}>
                        <button className={"addCityButtonStyles"}>
                            <AddCircleOutlineOutlinedIcon/>
                            <p>GERER LES UTILISATEURS</p>
                        </button>
                    </Link>
                }
                {state.query === ""
                    // if there is no search, display all cities
                    ? cities.map((city) => (
                        <NavLink key={city.id} to={`/info/${city.name}`}>
                            < AnimatedCard key={city.id} cityName={city.name} cityPhoto={city.photo}
                                           data-testid="city-list"/>
                        </NavLink>)
                    )
                    :
                    state.list.map((city) => (
                        // if there is a search display the cities corresponding
                        <NavLink key={city.id} to={`/info/${city.name}`}>
                            < AnimatedCard key={city.id} cityName={city.name} cityPhoto={city.photo}
                                           data-testid="city-list"/>
                        </NavLink>))
                }
            </div>
        </>
    )
        ;
}
