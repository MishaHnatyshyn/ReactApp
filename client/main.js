import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker'
import { Blaze } from 'meteor/blaze'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from "../imports/components/App";
import Profile from '../imports/components/Profile.js';
import Feed from "../imports/components/Feed";
import Search from "../imports/components/Search";

import './main.html';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});

Template.loginButtons.rendered = function()
{
    Accounts._loginButtonsSession.set('dropdownVisible', true);
};

Accounts.onLogin(function() {
    document.getElementById('login').style.display = 'none';
    renderApp(Meteor.user());
    FlowRouter.go('/feed')
});

Accounts.onLogout(
    function() {
        FlowRouter.go('/login');
    }
);

FlowRouter.notFound ={
    action: function() {
        FlowRouter.go('/feed')
    }
};

FlowRouter.route('/users/:username', {
    action: function(params, queryParams) {
        getPostsForUserProfile(params.username);
    }
});

FlowRouter.route('/feed', {
    action: function() {
        Tracker.autorun(() => {
            getPostsForFeedRender(Meteor.user());
        });
    }
});

FlowRouter.route('/', {
    action: function() {
        FlowRouter.go('/feed')
    }
});


FlowRouter.route('/login', {
    action: function() {
            Blaze.render(Template.loginButtons, document.getElementById('login'));
            document.getElementById('login').style.display = 'block';
            ReactDOM.render('', document.getElementById('target'))
    }
});

const onFollow=(user)=>{
    Meteor.call('user.follow', {follower:Meteor.user(), user}, (err, res) => {
        if (err) {
            console.log(err);
        } else {

        }
    });
};

const onUnFollow=(user)=>{
    Meteor.call('user.unfollow', {follower:Meteor.user(), user}, (err, res) => {
        if (err) {
            console.log(err);
        } else {

        }
    });
};

const getPostsForFeedRender = (user) =>{
    Meteor.call('posts.getFeedPosts', user, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            renderFeed(res)
        }
    });
};

const getPostsForUserProfile = (user) =>{
    Meteor.call('posts.getUserPosts', user, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            renderUserProfile(user, res)
        }
    });
};

const getUsersForSearch = (query) => {
    console.log("getUsersForSearch    ", query);
    Meteor.call('user.search', query, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            if(Meteor.user()){
                Meteor.call('user.subscriptions', Meteor.user(), (err, subscriptions) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if(Meteor.user()){
                            renderSearch(res, Meteor.user(),subscriptions);
                        }
                    }
                });

            }
        }
    });
};

const renderApp = (user) =>{
    if(user)ReactDOM.render(<App
        onSearch={getUsersForSearch}
        username={user.username}
    />, document.getElementById('target'))
};

const renderUserProfile = (username,posts) => {
    ReactDOM.render(
        <Profile
            username={username}
            posts={posts}
            onFollow={onFollow}
            onUnFollow={onUnFollow}
        />, document.getElementById('wrapper'))
};
const renderFeed = (posts) => {
    if(posts && posts.length>0) ReactDOM.render(<Feed posts={posts} />, document.getElementById('wrapper'));
    else ReactDOM.render(<h6 align="center">No posts</h6>, document.getElementById('wrapper'));
};
const renderSearch = (users, currUser, subscriptions) => {
    if(users.length > 0)ReactDOM.render(
        <Search
            users={users}
            onFollow={onFollow}
            onUnFollow={onUnFollow}
            currUser={currUser}
            subscriptions={subscriptions}
        />, document.getElementById('wrapper'))
};
