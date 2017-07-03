import React, { Component } from 'react'

import auth from '../lib/auth'

// React modal
import ReactModal from 'react-modal';

export default class PostMessage extends Component {
    constructor(props){
    super(props)

      this.state = {
        newMessage: '',
        user: undefined
      }

  }

// Add Artist Date

handleNewArtistDate = () => {

  if (this.state.user){

    if(document.querySelector("#message").value === ""){
      //console.log("empty box")

      const fillTextArea = document.querySelector("#message");
      fillTextArea.placeholder = "Type an Artist Date here!";

      document.querySelector("#message").classList.add('is-danger');
      document.querySelector("#validArtistDate").style.visibility = "visible"

    }
    else {
      // dialogue - submit this idea?
      this.setState({ showModal: true });

      // console.log(`Message:${this.state.newMessage}`)
      // document.querySelector("#message").value = "";
      document.querySelector("#validArtistDate").style.visibility = "hidden"
      document.querySelector("#message").classList.remove('is-danger');
    }
  }
  else {
    console.log("Please sign in to use this")
  }
}

// Modal
handleOpenModal = () => {
  this.setState({ showModal: true });
}


handleCloseModal = () => {
  this.setState({ showModal: false });
}

// Create New Message

createNewMessage = () => {

  this.props.onNewMessage(this.state.newMessage)
  this.state.newMessage = "";
  this.setState({ showModal: false });
  // console.log(`Message:${this.state.newMessage}`)

}

handleMessageChange = (event) => {
  //console.log(event.target.value)
  this.setState({
    newMessage: event.target.value
  })
}

// ERROR EXAMPLE
/* <div className="field">
<p className="control has-icons-left has-icons-right">
  <input className="input is-danger" type="text" placeholder="Email input" value="hello@" />
  <span className="icon is-small is-left">
    <i className="fa fa-envelope"></i>
  </span>
  <span className="icon is-small is-right">
    <i className="fa fa-warning"></i>
  </span>
</p>
<p className="help is-danger">This email is invalid</p>
</div> */

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

render(){
  return (
<div>

  <div className="card">

    <div className="card-content">

      <p className="title is-4">What is an Artist Date?</p>
      <p className="subtitle">A Spiritual Path to Higher Creativity</p>
      <p>
        Part of this groundbreaking program includes two of Cameron's most
        vital tools for creative recovery: The Morning Pages and The Artist
        Date.
      </p>

    </div>

  </div>

    <br/>

  <div className="card">

    <div className="card-content">

      <p className="title">New Artist Date</p>
      <p className="subtitle">A Spiritual Path to Higher Creativity</p>
      <div className="field">
        <label className="label title"></label>

          <p className="control">
            <textarea value={this.state.newMessage} maxLength="180" onChange={this.handleMessageChange} id="message" type="text" className="form-control textarea" placeholder="Make a cigar box guitar!" >
            </textarea>
          </p>

          <nav className="level is-mobile" id="addArtistDate">

            <div className="level-left">

              <button onClick={this.handleNewArtistDate} id="submit" className="btn btn-default button is-primary item-level">
                Add Artist Date!

                <ReactModal
                   className="deleteModal container noFocus"
                   isOpen={this.state.showModal}
                   contentLabel="Submit Artist Date"
                >

                  <div className="box">
                    <h1 className="title"><strong>Submit</strong> this Artist Date? <br/>"{this.state.newMessage}"</h1>
                    <nav className="level is-mobile">
                      <div className="level-left">
                        <span className="level-item">
                          <button className="button is-primary" onClick={this.createNewMessage}>Submit</button>
                        </span>
                        <span className="level-item">
                          <button className="button" onClick={this.handleCloseModal}>Cancel</button>
                        </span>
                      </div>
                    </nav>
                  </div>

                </ReactModal>
              </button>

            </div>

            <div id="validArtistDate" className="level-right">

              <span className="level-item">

                <p className="help is-danger">
                  <span className="icon is-small">
                    <i className="fa fa-warning"></i>
                  </span>
                  <span>Please enter an Artist Date</span>
                </p>
              </span>
            </div>
          </nav>


      </div>

    </div>

  </div>

</div>
  )
}
}
