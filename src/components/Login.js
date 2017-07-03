import React, { Component } from 'react'

import ReactModal from 'react-modal'
import auth from '../lib/auth'

export default class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      showModalLog: false,
      showModalReg: false,
      user: undefined,
      error: undefined,

      currentUser: {
        email: undefined,
        providerId: undefined,
        uid: undefined
      }
    }
  }

  // Navigation

    // <div className="nav-center">
    //   <a className="nav-item">
    //     <span className="icon">
    //       <i className="fa fa-github"></i>
    //     </span>
    //   </a>
    //   <a className="nav-item">
    //     <span className="icon">
    //       <i className="fa fa-twitter"></i>
    //     </span>
    //   </a>
    // </div>

  // Optional Card Header

  // <header className="card-header">
  //   <p className="card-header-title">
  //     Component
  //   </p>
  //   <a className="card-header-icon">
  //     <span className="icon">
  //       <i className="fa fa-angle-down"></i>
  //     </span>
  //   </a>
  // </header>

  // Form Elements

  // {/* <div className="field">
  // <label className="label">Name</label>
  // <p className="control">
  //   <input className="input" type="text" placeholder="Text input"/>
  // </p>
  // </div> */}

  // {/* <div className="field">
  //   <label className="label">Subject</label>
  //   <p className="control">
  //     <span className="select">
  //       <select>
  //         <option>Select dropdown</option>
  //         <option>With options</option>
  //       </select>
  //     </span>
  //   </p>
  // </div>
  //
  // <div className="field">
  //   <p className="control">
  //     <label className="checkbox">
  //       <input type="checkbox"/>
  //       I agree to the <a href="#">terms and conditions</a>
  //     </label>
  //   </p>
  // </div>
  //
  // <div className="field">
  //   <p className="control">
  //     <label className="radio">
  //       <input type="radio" name="question"/>
  //       Yes
  //     </label>
  //     <label className="radio">
  //       <input type="radio" name="question"/>
  //       No
  //     </label>
  //   </p>
  // </div> */}

  // {/* <div className="field is-grouped">
  //   <p className="control">
  //     <button className="button is-primary">Submit</button>
  //   </p>
  //   <p className="control">
  //     <button className="button is-link">Cancel</button>
  //   </p>
  // </div> */}

  onSignUp = () => {
    console.log("sign up!")
    const email = this.refs.emailInput.value
    const password = this.refs.passwordInput.value
    const username = this.refs.usernameInput.value

    auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({
        error: undefined
      })
    })
    .catch(err => {
      this.setState({
        error: err.message
      })
    })

    // reset email and password values
    this.refs.emailInput.value = ''
    this.refs.passwordInput.value = ''
  }

  onLogin = () => {
    console.log("login!")

    const email = this.refs.emailInput.value
    const password = this.refs.passwordInput.value

    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({
        error: undefined
      })
    })
    .catch(err => {
      this.setState({
        error: err.message
      })
    })

    this.refs.emailInput.value = ''
    this.refs.passwordInput.value = ''
  }

  handleLogout = () => {
    auth.signOut()
  }

  // Open and Close Registration Modal

  openSignUpModalReg = () => {
    this.setState({ showModalReg: true });
  }

  handleCloseModalReg = () => {
    this.setState({ showModalReg: false });
  }

  // Open and Close Login Modal

  openSignUpModalLog = () => {
    this.setState({ showModalLog: true });
  }

  handleCloseModalLog = () => {
    this.setState({ showModalLog: false });
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {

      //Show user details
      const currentUser = auth.currentUser

      if (currentUser != null){
        currentUser.providerData.forEach( profile =>
          // console.log(profile)
          this.setState({
            email: profile.email,
            providerId: profile.providerId,
            uid: profile.uid
          })
      )}

      this.setState({
        user: user
      })
    })

  }

  // console.log(
  // profile,
  // "Sign-in provider: "+profile.providerId,
  // "Email: "+profile.email,
  // "Provider-specific UID: "+profile.uid,
  // "Name: "+profile.displayName,
  // "Photo URL: "+profile.photoURL
  // )

  // Other user info for Nav Bar
  // <p>ProviderID: {this.state.providerId}</p>
  // <p>UserID: {this.state.uid}</p>

render(){

  if (this.state.user) {
    return(

      <div className="nav-item">
        <div className="field is-grouped">

          <p className="control">
            <a className="button">
              <span className="icon">
                <i className="fa fa-user"></i>
              </span>
              <span>{this.props.uid}</span>
            </a>
          </p>

          <p className="control">
            <a className="button is-danger">
              <span className="icon">
                <i className="fa fa-sign-out"></i>
              </span>
              <span onClick={this.handleLogout}>Logout</span>
            </a>
          </p>

        </div>
      </div>)
  } else {
  return(
    <div className="nav-item">

      <div className="field is-grouped">

        <p className="control">
          <a className="button is-primary" onClick={this.openSignUpModalReg}>
            <span>Register</span>

            <ReactModal
               className="noFocus"
               isOpen={this.state.showModalReg}
               contentLabel="Submit Artist Date"
            >
              <div className="container loginModalContainer">
                <div className="card loginModalCard">
                  <div className="card-content">
                    <div className="content">

                      <h1 className="title"><strong>Register</strong></h1>
                      <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.</p>
                      <p className="">Error: { this.state.error ? this.state.error : null }</p>

                      <div className="field">
                        <label className="label">Name</label>
                        <p className="control">
                          <input className="input" type="text" placeholder=""/>
                        </p>
                      </div>

                      <div className="field">
                        <label className="label">Username</label>
                        <p className="control has-icons-left has-icons-right">
                          <input
                            ref="usernameInput"
                            className="input"
                            type="text"
                            placeholder=""/>
                          <span className="icon is-small is-left">
                            <i className="fa fa-user"></i>
                          </span>
                          <span className="icon is-small is-right">
                            <i className="fa fa-check"></i>
                          </span>
                        </p>
                        <p className="help is-success">This username is available</p>
                      </div>

                      <div className="field">
                        <label className="label">Email</label>
                        <p className="control has-icons-left has-icons-right">
                          <input
                            ref="emailInput"
                            className="input"
                            type="text"
                            placeholder="youremail@email.com"/>
                          <span className="icon is-small is-left">
                            <i className="fa fa-envelope"></i>
                          </span>
                          <span className="icon is-small is-right">
                            <i className="fa fa-warning"></i>
                            <i className="fa fa-check"></i>
                          </span>
                        </p>
                        <p className="help is-danger">This email is invalid</p>
                      </div>

                      <div className="field">
                        <label className="label">Password</label>
                        <p className="control has-icons-left has-icons-right">
                          <input
                            ref="passwordInput"
                            className="input"
                            type="password"
                            placeholder="Your password"/>
                          <span className="icon is-small is-left">
                            <i className="fa fa-key"></i>
                          </span>
                          <span className="icon is-small is-right">
                            <i className="fa fa-unlock"></i>
                            <i className="fa fa-lock"></i>
                          </span>
                        </p>
                        <p className="help is-danger">This password needs to be ...</p>
                      </div>

                    </div>
                  </div>

              <footer className="card-footer">
                <a onClick={this.onSignUp} className="card-footer-item">Register</a>
                <a onClick={this.handleCloseModalReg} className="card-footer-item">Cancel</a>
              </footer>

            </div>
          </div>

            </ReactModal>



          </a>
        </p>

        <p className="control">
          <a className="button" onClick={this.openSignUpModalLog}>
            <span className="icon">
              <i className="fa fa-user"></i>
            </span>
            <span>Login</span>

            <ReactModal
               className="noFocus"
               isOpen={this.state.showModalLog}
               contentLabel="Submit Artist Date"
            >
              <div className="container loginModalContainer">
                <div className="card loginModalCard">
                  <div className="card-content">
                    <div className="content">

                      <h1 className="title"><strong>Login</strong></h1>
                      <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.</p>
                      <p className="">Error: { this.state.error ? this.state.error : null }</p>

                      <div className="field">
                        <label className="label">Email</label>
                        <p className="control has-icons-left has-icons-right">
                          <input ref="emailInput" className="input" type="text" placeholder="youremail@email.com"/>
                          <span className="icon is-small is-left">
                            <i className="fa fa-envelope"></i>
                          </span>
                          <span className="icon is-small is-right">
                            <i className="fa fa-warning"></i>
                            <i className="fa fa-check"></i>
                          </span>
                        </p>
                        <p className="help is-danger">This email is invalid</p>
                      </div>

                      <div className="field">
                        <label className="label">Password</label>
                        <p className="control has-icons-left has-icons-right">
                          <input ref="passwordInput" className="input" type="password" placeholder="Your password"/>
                          <span className="icon is-small is-left">
                            <i className="fa fa-key"></i>
                          </span>
                          <span className="icon is-small is-right">
                            <i className="fa fa-unlock"></i>
                            <i className="fa fa-lock"></i>
                          </span>
                        </p>
                        <p className="help is-danger">This password needs to be ...</p>
                      </div>

                    </div>
                  </div>

              <footer className="card-footer">
                <a onClick={this.onLogin} className="card-footer-item">Login</a>
                <a onClick={this.handleCloseModalLog} className="card-footer-item">Cancel</a>
              </footer>

            </div>
          </div>

            </ReactModal>

          </a>
        </p>

      </div>

    </div>
  )}}
}
