import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste';
import Contact from './components/Contact';

const Layout = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
);

// Define Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
  path: "/contact",
  element: (
    <Layout>
      <Contact/>
    </Layout>
  ),
},
  {
    path: "/paste",
    element: (
      <Layout>
        <Paste />
      </Layout>
    ),
  },
  {
    path: "/paste/:id",
    element: (
      <Layout>
        <ViewPaste />
      </Layout>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <div>404 - Page Not Found</div>
      </Layout>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      
    </div>
  );
}

export default App;
