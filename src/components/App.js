import React, { Component } from 'react' // dependencies from package.json
import _ from 'lodash'

import NavBar from './NavBar'
import Header from './Header'
import PostMessage from './PostMessage'
import MessageBoard from './MessageBoard'
import Message from './Message'
import Intro from './Intro'

import db from '../lib/database'
import auth from '../lib/auth'

const Messages = db.ref('Messages')

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [
      ],
      user: undefined,
      currentUser: {
        email: undefined,
        providerId: undefined,
        uid: undefined
      }
    }

  }

  handleNewMessage = (text, likes, email, uid, username) => {

    //Show user details
    // const currentUser = auth.currentUser
    //
    // if (currentUser != null){
    //   currentUser.providerData.forEach( profile =>
    //     // console.log(profile)
    //     this.setState({
    //       email: profile.email,
    //       providerId: profile.providerId,
    //       uid: profile.uid
    //     })
    //   )}

    const newMessage = {
      text: text,
      likes: 0,
      email: this.state.email,
      uid: this.state.uid,
      username: "boobs"
    }
    // this.setState({
    //   messages: this.state.messages.concat(newMessage)
    // })
    Messages.push(newMessage)
    console.log(newMessage.likes)
  }

  handleDeleteMessage = (id) => {

    console.log(id)
    Messages.child(id).remove()
  }

  handleThumbsUp = (id) => {
    if(this.state.user){
      Messages.child(id).child('likes')
      .transaction(currentLikes => currentLikes + 1)
    }
    else{
      console.log("sign in to like this")
    }

  }
  // THROUGH STATE
  // const message = this.state.messages[id]
  //
  // message.likes = message.likes + 1
  //
  // this.setState({
  //   messages: this.state.messages
  // })
  // console.log('up', this.state.messages[id])

  handleThumbsDown = (id) => {
    Messages.child(id).child('likes')
    .transaction(currentLikes => currentLikes - 1)
    //console.log('down', this.state.messages[id])
  }

  sortedMessages(){
    const messages = _.map(this.state.messages, (message, id) => {
      return {
        id: id,
        message: message,
      }
    })

    return _.orderBy(messages, message => message.message.likes, 'desc')
  }

  // handleSortMessages = (id) => {
  // // on click we want to take all the messages and sort by most likes
  //   Messages.child(id).sort()
  //
  //   keys = Object.keys(myObj)
  //   keys.sort();
  //
  //   const sortByKeys = object => {
  //   const keys = Object.keys(object)
  //   const sortedKeys = _.sortBy(keys)
  //
  //   return _.fromPairs(
  //     _.map(sortedKeys, key => [key, object[key]])
  // }

  // const keys = Object.keys(Messages)

  componentDidMount(){
    Messages.on('value', snapshot => {
      // messages: snapshot.val()

      this.setState({
        messages: snapshot.val()
      })
    })

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

  render() {
    return (
      <div>


        <NavBar
          uid={this.state.uid}
        />
        <Header />
        <div className="container bot-marg">
          <div className="columns">

            <div className="column ">
              <Intro />
            </div>

            <div className="column">
              <PostMessage onNewMessage={this.handleNewMessage} />
            </div>

          </div>
      </div>

      <div className="hero is-danger">
        <div className="container">
          <div className="hero-body">
            <h1 className="title">
              Artist Date Ideas
            </h1>
            <h2 className="subtitle">
              Submit your ideas
            </h2>
        </div>
      </div>
    </div>



    <MessageBoard>
      {_.map(this.sortedMessages(), (container) => (
        <Message

          key={container.id}
          id={container.id}
          likes={container.message.likes}
          onThumbsDown={this.handleThumbsDown}
          onThumbsUp={this.handleThumbsUp}
          onDelete={this.handleDeleteMessage}
          onSort={this.sortMessages}
          dateIdea={container.message.text}
        >
          {container.message.text}

        </Message>
      ))}
    </MessageBoard>

      </div>
    )
  }
}
