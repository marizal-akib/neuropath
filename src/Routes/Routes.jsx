import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import AddPatients from "../pages/Add_Patients/AddPatients";
import AllPatients from "../pages/All_Patients/AllPatients";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-patient",
        element: <AddPatients></AddPatients>,
      },
      {
        path: "/all-patient",
        element: <AllPatients></AllPatients>,
      },
    ],
  },
]);
