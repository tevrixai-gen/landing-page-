import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './App.css';
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
