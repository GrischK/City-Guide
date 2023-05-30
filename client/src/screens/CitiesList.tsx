import {useEffect, useState} from "react";
import {Link, NavLink, useSearchParams} from "react-router-dom";
import AnimatedCard from "../components/AnimatedCard";
import ICity from "../interfaces/ICity";
import {filterBySearch} from "../utils/helpers";
import {useCitiesQuery} from "../gql/generated/schema";
import IState from "../interfaces/IState";
import directions from "../assets/images/directions.png"

export default function CitiesList() {
    // gets the params from URL
    const [searchParams, setSearchParams] = useSearchParams();

    const {loading: loadingCities, data, refetch} = useCitiesQuery();

    const cities = data?.cities ?? [];
    // State to manage both URL query & cities to display
    const [state, setState] = useState<IState>({
        query: searchParams.get("query") ?? "",
        list: [],
    });

    useEffect(() => {

        document.body.style.overflow = "auto"

    })


    // takes in value from the search bar and returns a filtered list of the cities to display
    //(filter improves with each letter)
    //searchParams controls the URL (what comes after the "?")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const results = cities.filter((city) => {
            if (e.target.value === " ") return cities;
            return city.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setSearchParams({query: e.target.value});
        setState({
            query: e.target.value,
            list: results,
        });
    };

    return (
        <>
            <div className="citiesList_container">

                <div className="search-input">
                    <form>
                        <input
                            value={state.query}
                            onChange={handleChange}
                            placeholder="Rechercher une ville..."
                            type="search"
                        ></input>
                    </form>
                </div>

                <section className={"citiesList_wrapper"}>
                    {state.query === ""
                        // if there is no search, display all cities
                        ? cities.map((city) => (
                            <NavLink className='cardLink' key={city.id} to={`/info/${city.name}`}>
                                < AnimatedCard key={city.id} cityName={city.name} cityPhoto={city.photo}/>
                            </NavLink>)
                        )
                        :
                        state.list.map((city) => (
                            // if there is a search display the cities corresponding
                            <NavLink key={city.id} to={`/info/${city.name}`}>
                                < AnimatedCard key={city.id} cityName={city.name} cityPhoto={city.photo}/>
                            </NavLink>))
                    }
                </section>
            </div>
        </>
    )
}