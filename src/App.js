import React from 'react';
import Routes from "./Router";
import { BrowserRouter} from "react-router-dom";

function App() {
    
    return (
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    );
}

export default App;