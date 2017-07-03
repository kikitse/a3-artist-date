import React, { Component } from 'react'

import Login from './Login'

import ReactModal from 'react-modal'
import db from '../lib/database'
import auth from '../lib/auth'

export default class NavBar extends Component {
  constructor(props){
    super(props)

    this.state = {
      showModal: false,
      user: undefined,
      error: undefined,

      }
    }




render(){

      return(
        <nav className="nav">
          <div className="nav-left">
            <a className="nav-item">
              <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo"/>
            </a>
          </div>

          <span className="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div className="nav-right nav-menu">
            <a className="nav-item">
              Home
            </a>
            <a className="nav-item">
              Book
            </a>

            <Login
            uid={this.props.uid}
            />

          </div>
        </nav>
      )
    }
  }
