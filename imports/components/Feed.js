import React, { Component } from 'react';

function AuthorInfo(props) {
    return(
        <div className="post-author">
            <div className="row">
                <div className="col-sm-1">
                    <div className="user-feed-avatar">
                        <div className="circle-foto-small-feed"></div>
                    </div>
                </div>
                <div className="col-sm-11">
                    <div className="post-author-name" onClick={FlowRouter.go('/'+props.username)}>{props.username}</div>
                    <div className="post-publication-time">{props.publicationTime}</div>
                </div>
            </div>
        </div>
    )
}

function Post(props) {
    return(
        <div className="post">
            <AuthorInfo username={props.username} publicationTime={props.publicationTime}/>
            <div className="post-title"><h5>{props.title}</h5></div>
            <div className="post-text">{props.text}</div>
        </div>
    )
}

export default class Feed extends Component{
    render(){
        return(
            <div className="content">
                {this.props.posts.map((item)=>(
                    <Post
                        key={item._id}
                        username={item.username}
                        publicationTime={item.publicationTime}
                        title={item.title}
                        text={item.text}
                    />
                ))}
            </div>
        )
    }
}