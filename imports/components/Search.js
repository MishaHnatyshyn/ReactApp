import React, { Component } from 'react';

function Button(props) {
    if(props.isFollowed){
        return(
            <div className="user-follow-button" id="unfollow-button" onClick={props.handleUnFollow}>UNFOLLOW</div>
        )
    }else return(
        <div className="user-follow-button" onClick={props.handleFollow}>FOLLOW</div>
    )
}

class UserContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {isFollowed:(this.props.subscriptions.indexOf(this.props.username) > -1)};
        this.handleFollow = this.handleFollow.bind(this);
        this.handleUnFollow = this.handleUnFollow.bind(this);
    }

    handleFollow(e){
        e.preventDefault();
        this.setState((prevState) => ({
            isFollowed: !prevState.isFollowed
        }));
        this.props.onFollow(this.props.username)
    }

    handleUnFollow(e){
        e.preventDefault();
        this.setState((prevState) => ({
            isFollowed: !prevState.isFollowed
        }));
        this.props.onUnFollow(this.props.username)
    }

    render(){
        if(this.props.currUser.username === this.props.username) return null;
        else return(
            <div className="user-container">
                <div className="row" id="user-search-info-row">
                    <div className="col-sm-2">
                        <div className="user-search-avatar">
                            <div className="circle-foto-small"></div>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="user-search-info-panel">
                            <div className="user-name"><a href={'/users/'+this.props.username}>{this.props.username}</a></div>
                            <div className="user-description">some info</div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <Button
                            isFollowed={this.state.isFollowed}
                            handleUnFollow={this.handleUnFollow}
                            handleFollow={this.handleFollow}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default class Search extends Component{
    render(){
        return(
            <div >
                {this.props.users.map(user=>(
                    <UserContainer
                        key={user.username}
                        username={user.username}
                        onFollow={this.props.onFollow}
                        onUnFollow={this.props.onUnFollow}
                        currUser={this.props.currUser}
                        subscriptions={this.props.subscriptions}
                    />))}
            </div>
            )
    }
}