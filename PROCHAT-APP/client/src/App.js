import "./App.css";
import HomePageComponent from "./SignUp-Login-page/HomePageComponent";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./SignUp-Login-page/LoginPage";
import SignUpPage from "./SignUp-Login-page/SignUpPage";
import ChatPage from "./Chat-Component/ChatPage";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <HomePageComponent />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signUp",
      element: <SignUpPage />,
    },
    {
      path: "/chat",
      element: <ChatPage />,
    },
  ]);

  return (
    <div className="App">
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />
        <Outlet />
      </Provider>
    </div>
  );
}

export default App;
