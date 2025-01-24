import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/Login.page';
import GenPage from './pages/Gen.page';

const router = createBrowserRouter([
  {
    path: '/',
    // Skips login page if password environment variable is not set.
    element: (typeof import.meta.env.VITE_PW !== "undefined") ? <LoginPage /> : <GenPage />,
  }, 
  {
    path: '/generator',
    element: <GenPage />,
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
}

export default Router;