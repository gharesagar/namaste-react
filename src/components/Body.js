import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  // Local state variable - Super powerful variable
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  // Whenever state variable update, react triggers a reconciliation cycle (re-renders the component)
  console.log("Body Rendered");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.202841380161143&lng=72.95588571578264&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    setListOfRestaurant(json?.data?.cards[2]?.data?.data?.cards); // ? is called optional chaining. Null will be handled
    setFilteredRestaurant(json?.data?.cards[2]?.data?.data?.cards);
  };

  const onlineStatus = useOnlineStatus();

  if(onlineStatus === false) 
    return ( 
      <h1>
        Looks like you're offline !! Please check your internet connection;
      </h1> 
    );

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input 
            type="text" 
            className="border border-solid border-black" 
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}/>

          <button className="px-4 py-2 bg-green-100 m-4" onClick={()=> {
            
            const filteredRestaurant = listOfRestaurants.filter((res) => 
              res.data.name.toLowerCase().includes(searchText.toLowerCase())
            );

            setFilteredRestaurant(filteredRestaurant);

          }}>Search</button>
        </div>
        <button
          className="px-4 py-2 bg-grey-50"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.data.avgRating > 4.3
            );

            setFilteredRestaurant(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant.map(
          (
            restaurant // Multiline JSX
          ) => (
            <Link
               key={restaurant.data.id} 
               to= {"/restaurants/"+ restaurant.data.id } 
            > 
             <RestaurantCard resData={restaurant} />
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Body;
