import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
//import Grocery from "./components/Grocery";


/*
  Chunking
  Code Splitting
  Dynamic Bundling
  Lazy Loading
  On demand loading
  Dynamic import
*/

const Grocery = lazy(() => import("./components/Grocery")); 

/* So whenever there is change in path the below outlet will be filled with children according on what page we are.
   So when we are on "/" then <Body/> will be filled. When we are on "/about" then <About/> will be filled 
*/
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/grocery",
        element: (
           <Suspense fallback= { <h1>Loading.....</h1> }>
            <Grocery/>
           </Suspense>)
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />
      }
    ],
    errorElement: <Error />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
