import "../App.css";
import React from 'react';
import fire from './config/firebase'

class Home extends React.Component {

    logout() {
        
    }

    render() {
        return(
            <div>
                <h1>You are logged in...</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

export default Home;