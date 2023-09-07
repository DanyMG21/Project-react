import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  baseRoute,
  clientsRoute,
  invoicesRoute,
  loginRoute,
  platesRoute,
} from "./constants/routes";
import Login from "./pages/Login/Login";
import Plate from "./pages/Plates/Plates";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { decodeToken, getToken } from "./utils/tokenManagement";
import { useDispatch } from "react-redux";
import { sessionActions } from "./store/actions/session";
import Clients from "./pages/Clients/Clients";
import Invoices from "./pages/Invoices/Invoices";
import InvoiceCreate from "./pages/InvoiceCreate/InvoiceCreate";
import InvoiceDetails from "./pages/InvoiceDetail/InvoiceDetail";
//import CanAccess from "./components/CanAccess/CanAccess"

const ManinRouter = () => {
  const token = getToken();
  const dispatch = useDispatch();
  if (token) {
    const decodeUserData = decodeToken();
    dispatch(sessionActions.loginSuccess(decodeUserData));
  }

  //const PrivatePlate = CanAccess(Plate)
  return (
    <BrowserRouter>
      <Routes>
        <Route path={loginRoute} element={<Login />} />
        <Route path={baseRoute} element={<Login />} />
        <Route
          path={platesRoute}
          element={
            <PrivateRoute>
              <Plate />
            </PrivateRoute>
          }
          /*element = {
                   < PrivatePlate/>
                }*/
        />
        <Route
          path={clientsRoute}
          element={
            <PrivateRoute>
              <Clients />
            </PrivateRoute>
          }
          /*element = {
                   < PrivatePlate/>
                }*/
        />

<Route
                    path={`${invoicesRoute}/new`}
                    element={
                        <PrivateRoute>
                            <InvoiceCreate />
                        </PrivateRoute>
                    }
                />

                <Route
                    path={invoicesRoute}
                    element={
                        <PrivateRoute>
                            <Invoices />
                        </PrivateRoute>
                    }
                />

                <Route
                    path={`${invoicesRoute}/:id`}
                    element={
                        <PrivateRoute>
                            <InvoiceDetails />
                        </PrivateRoute>
                    }
                />
      </Routes>
    </BrowserRouter>
  );
};

export default ManinRouter;
