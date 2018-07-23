import React, { Component } from 'react';

export default class Header extends Component{
    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);
        this.search = this.search.bind(this);
        this.input = React.createRef();

    }

    logOut(e){
        e.preventDefault();
        Meteor.logout();
    }

    search(e){
        e.preventDefault();
        const query = this.input.current.value;
        this.props.onSearch(query);
    }

    render(){
        return(
            <div className="header">
                <nav className="navbar navbar-expand-lg navbar-dark bg-blue" id="main-nav">
                    <a className="navbar-brand" href="#">MeteorAPP</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/feed">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={'/users/'+this.props.username}>My profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.logOut}>Log out</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0" onSubmit={this.search}>
                            <input name="search-field" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" ref={this.input}/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}