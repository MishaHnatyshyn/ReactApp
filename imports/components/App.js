import React, { Component } from 'react';
import Header from './Header'

export default class App extends Component {
    render(){
        return(
            <div className="my-container">
                <Header
                    onSearch={this.props.onSearch}
                    username={this.props.username}
                />
                <div className="wrapper" id="wrapper">
                </div>
            </div>
        )
    }
}


