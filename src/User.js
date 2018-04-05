import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UserModel } from './models';

class User extends Component {
    state = {}
//componentDidMount is a callback function that gets called the moment the component is mounted on the DOM
// componentDidMount is more like an entry point for the component to start rendering.
    componentDidMount() {
        const { username } = this.props.match.params
        if (username) {
            UserModel.findByUsername(username) // if (username) { UserModel.findByUsername... }
                .then(data => {
                    // we mean status: http request status : "I want to go on a session now"
                    // for successful github profile fetching, the status attribute will be null because
                    // the response.json() that is called inside the UserModel will return only the response body and not the status.
                    if (!data.status) {
                        console.log('this is the data', data);
                        this.setState({
                            user: data,
                            error: null
                        })
                        this.fetchRepos(username); //It uses the username supplied to fetch the user's repositories from Github
                    } else {
                        console.log(data);
                        this.setState({
                            error: data,
                            user: null
                        });
                    }
                });
        }
    }
    fetchRepos(username) {
        UserModel.findUserRepos(username) // We use here the fetched user's info to fetch the user's repos
            .then(data => {
                if (!data.status) {
                    this.setState({
                        // this data contains the repos for the passed username
                        // data is just array of repo objects
                        ownedRepos: data.filter(d => !d.fork), // User's owned repos
                        // array.filter: which is the same as data.filter:
                        //it creates a new Array B from an existing Array A by iterating over Array A
                        // and passing a callback that returns either true or false.
                        //If the callback returns true, the item in the iteration gets returned.
                        forkedRepos: data.filter(d => d.fork), // User's forked repos
                        error: null,
                    });
                } else {
                    this.setState({
                        error: data
                    })
                }
            });
    }

    buildLanguages(repos) {
        // Builidng the repos languages list here
        const languages = {}
        repos.forEach(repo => {
            languages[repo.language] = (languages[repo.language] || 0) + 1; // Just keeping the count of each of them
        });
        return languages; // Return the list of languages { JavaScript: 4, PHP: 3, Ruby: 1 }
    }

    renderLanguage(lang, langList, totalRepos) {
        // Calculating the percentage per language here
        return lang === 'null'
                ? null
                : <span key={lang}>
                    <strong>{lang}</strong>: { Math.ceil((langList[lang]/totalRepos) * 100)}% &nbsp;
                </span>
    }

    backButton() {
        return (
            <p class="backLinkP"><Link className="backLink" to='/'>Click to return to the main page</Link></p>
        )
    }

    render() {
        const { user, ownedRepos, forkedRepos, error } = this.state; // Get the owned and forked repos stored in the state
        const ownedRepoLang = ownedRepos && this.buildLanguages(ownedRepos); // Get languages list from owned repos
        const ownedRepoLangKeys = ownedRepoLang && Object.keys(ownedRepoLang); //  the keys for easy iteration
        const forkedRepoLang = forkedRepos && this.buildLanguages(forkedRepos); //Get languages list for forked repos
        const forkedRepoLangKeys = forkedRepoLang && Object.keys(forkedRepoLang); // And then get the keys for easy iteration

        return error
            ? ( <div>
                    { error.status === 404 ? 'User not found.' : 'An error occured. Request could not be completed' }
                    { this.backButton() }
                </div> )
            : !user ? null : (
                <div className="card">
                    <img className="avatar" src={user.avatar_url} alt=""/>
                    <h4 className="name">{user.name || user.login}</h4>
                    <div className="insideInfo">
                    <h4 className="location">Location: {user.location || '-'}</h4>
                    <h4 className="website">Website: {user.blog || '-'}</h4>

                    <h4 className="followers">Github followers: {user.followers}</h4>
                    <h4 className="following">Github following: {user.following}</h4>
                    <h4 className="publicRepos">Public Owned Repos: {ownedRepos && ownedRepos.length}</h4>
                    <p>
                    <span>Languages breakdown of the Owned Repos: <br/>
                        { ownedRepoLangKeys && ownedRepoLangKeys.map(lang => {
                            return this.renderLanguage(lang, ownedRepoLang, ownedRepos.length); // Render each language with percentage result for owned repos
                        })
                        }
                    </span>
                    </p>

                    <h4 className="forkedRepos">Public Forked Repos: { forkedRepos && forkedRepos.length }</h4>
                    <p>
                    <span> Language breakdown of the Forked Repos: <br/>
                        { forkedRepoLangKeys && forkedRepoLangKeys.map(lang => {
                            return this.renderLanguage(lang, forkedRepoLang, forkedRepos.length); // Render each language with percentage for forked repos
                        })
                         }
                    </span>
                    </p>
                    { this.backButton() }

                    </div>
                </div>
            )
    }
}

export default User;
