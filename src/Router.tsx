import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/Login.page';
import GenPage from './pages/Gen.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
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