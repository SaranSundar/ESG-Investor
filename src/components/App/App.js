import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Home from "../Home/Home";
import MaterialAppBar from "../MaterialAppBar/MaterialAppBar";

function App() {
    return (
        <div className="App">
            <MaterialAppBar/>
            <Switch>
                <Route exact path="/" component={Home}/>
                {/*<Route component={NoMatch}/>*/}
            </Switch>
        </div>
    );
}

export default App;
