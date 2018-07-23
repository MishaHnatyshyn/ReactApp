import { Meteor } from 'meteor/meteor';
import Posts from '../imports/db/Posts'
import UsersInfo from '../imports/db/Users'

Accounts.onCreateUser((options, user)=>{
    UsersInfo.insert({
       _id:user._id,
       username:user.username,
       followers:[],
       subscriptions:[],
       posts:[]
    });
    return user;
});

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    'posts.getUserPosts'(username) {
        return Posts.find({author:username}).fetch();
    },
    'posts.getFeedPosts'(user) {
        if(user){
            const subscriptions = UsersInfo.findOne({username:user.username}).subscriptions;
            const posts = Posts.find({author:{$in: subscriptions}}).fetch();
            return posts
        }
    },
    'posts.addPost'({text, title, user}) {
        Posts.insert({
            title,
            text,
            publication_time:new Date().toLocaleTimeString(),
            publication_date:new Date().toLocaleDateString(),
            author:user
        })
    },
    'user.follow'(users) {
        console.log(users);
        UsersInfo.update({username:users.follower.username},{$push:{subscriptions:users.user}});
        UsersInfo.update({username:users.user},{$push:{followers:users.follower.username}});
    },
    'user.unfollow'(users) {
        UsersInfo.update({username:users.follower.username},{$pull:{subscriptions:users.user}});
        UsersInfo.update({username:users.user},{$pull:{followers:users.follower.username}});
    },
    'user.search'(query) {
        return UsersInfo.find({username:{$regex: query}}).fetch();
    },
    'user.subscriptions'(user) {
        if(user) return UsersInfo.findOne({username:user.username}).subscriptions;
    },
});