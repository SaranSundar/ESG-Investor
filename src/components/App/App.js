import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";

function App() {
    return (
        <div className="App">
            {/*<NavBar/>*/}
            <Switch>
                {/*<Route exact path="/" component={Home}/>*/}
                {/*<Route component={NoMatch}/>*/}
            </Switch>
        </div>
    );
}

export default App;
