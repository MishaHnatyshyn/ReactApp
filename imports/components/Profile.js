import React, { Component } from 'react';

class UserInfo extends Component{
    constructor(props){
        super(props);
        this.hadleFollow = this.hadleFollow.bind(this);
    }

    hadleFollow(){
        this.props.onFollow(this.props.username)
    }

    render(){
        return(
            <div className="user-info">
                <div className="row" id="user-info-row">
                    <div className="col-sm-4">
                        <div className="user-avatar">
                            <div className="circle-foto"></div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="user-info-panel">
                            <div className="user-name">{this.props.username}</div>
                            <div className="user-follow-button" onClick={this.hadleFollow}>FOLLOW</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Post extends Component{
    render(){
        return(
            <div className="user-post">
                <div className="user-post-title"><h5>{this.props.title}</h5></div>
                <div className="user-post-text">{this.props.text}</div>
            </div>
        )
    }
}

export default class Profile extends Component{
    render(){
        return(
            <div>
                <UserInfo
                    username={this.props.username}
                    onFollow={this.props.onFollow}
                />
                <div className="user-content">
                    {this.props.posts.map(item=>(
                        <Post
                            key={item._id}
                            title={item.title}
                            text={item.text}
                        />
                    ))}
                </div>
            </div>
        )
    }
}