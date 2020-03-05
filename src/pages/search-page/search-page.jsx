import React from 'react';
import './search-page.scss';
import * as dbFuncs from '../../modules/server-manager';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            searchTerm: '',
            fetching: false,
            noResults: false
        };
    }

    updateTweets = () => {
        if (this.state.searchTerm === '') {
            return;
        }
        this.setState({ fetching: true });
        dbFuncs.getTweets(this.state.searchTerm)
            .then(data => {
                console.log('Found tweets count:', data.length);
                if (Array.isArray(data) && data.length > 0) {
                    this.setState({
                        tweets: data,
                        fetching: false,
                        noResults: false
                    })
                }
                else {
                    this.setState({
                        fetching: false,
                        noResults: true
                    })
                }
            });
    }

    onSearchSubmit = () => {
        this.updateTweets();
    }

    onSearchBoxChange = (event) => {
        this.setState({ searchTerm: event.target.value.toLowerCase() });
    }

    onKeyUp = (event) => {
        // If ENTER is being pressed, initiate fetching of tweets
        if (event.keyCode === 13) {
            this.updateTweets();
        }
    }

    render() {

        return (
            <div className="search-page">
                <h2>Search for #JavaScript Tweets</h2>
                <p>I want tweets that contain the following:</p>
                <input name="search-text" className="search-box" type="text"
                    placeholder="✎..."
                    onChange={this.onSearchBoxChange}
                    onKeyUp={this.onKeyUp} />
                <button className="btn"
                    onClick={this.onSearchSubmit}>
                    SERACH</button>
                <div className="cards-container">
                    {!this.state.noResults ?
                        this.state.tweets.map((tweet, index) => {
                            return (
                                <div key={index} className="card-container">
                                    <div className="twitter-user">{tweet.username}</div>
                                    <div className="tweet-text">{tweet.text}</div>
                                </div>
                            )
                        })
                    : <h4>Found nothing... =(</h4>}
                </div>
            </div>
        );
    }
}

export default SearchPage;