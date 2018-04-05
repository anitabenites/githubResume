import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class App extends Component {
    state = {}
    setUser = () => {
        this.setState({
            username: this.refs.name.value
        });
    }
    render() {
        const { username } = this.state; // var username = this.state.username
        return (
            username
                ? <Redirect to={`/${username}`} /> // domain.com/anitabenites
                : <div className="card">
                <h1 className="card-header"> Github-Resume </h1>
                <div className="card-body">
                    <p>When you are applying for a software engineering position startups really enjoy seeing your code and portfolio.</p>
                    <p>Please enter your github account and enjoy from your new cv-formatted github.</p>
                    <div className="input-group">
                    <input className="form-control" type="text" placeholder="Enter your username" ref="name"/>
                    <span className="input-group-btn">
                        <button type="button" id="myBtn" className="btn" onClick={this.setUser}>Generate</button>
                    </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
