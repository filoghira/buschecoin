import Marketplace from './pages/Marketplace';
import History from './pages/History';
import Inventory from './pages/Inventory';
import Home from './pages/Home';
import Navbar from './components/Navbar';

import { themeOptions } from './themes/Purple';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

export default function App() {
    
    return (
        <ThemeProvider theme={themeOptions}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar/>}>
                        <Route index element={<Home/>} />
                        <Route path="marketplace" element={<Marketplace />} />
                        <Route path="history" element={<History />} />
                        <Route path="inventory" element={<Inventory />} />
                        <Route path="*" element={
                        <div>
                        <h1>404</h1>
                        <p>Page not found</p>
                        </div>
                        } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};