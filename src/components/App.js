import React, { Component } from 'react' // dependencies from package.json
import _ from 'lodash'

import Header from './Header'
import PostMessage from './PostMessage'
import MessageBoard from './MessageBoard'
import Message from './Message'
import db from '../lib/database.js'

const Messages = db.ref('Messages')

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [
        { text: 'booger', likes: 10},
        { text: 'boooob', likes: 104}
      ]
    }
    this.handleNewMessage = this.handleNewMessage.bind(this)
}


  componentDidMount() {
    Messages.on('value', snapshot => {
      messages: snapshot.val()

      this.setState({
        messages: snapshot.val()
      })

    })
  }

  handleNewMessage(text){
    const newMessage = { text: text, likes: 0 }
    // this.setState({
    //   messages: this.state.messages.concat(newMessage)
    // })
    Messages.push(newMessage)
  }

handleThumbsUp = (id) => {
  Messages.child(id).child('likes')
  .transaction(currentLikes => currentLikes + 1)
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

handleDeleteMessage = (id) => {
  Messages.child(id).remove()
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

// array.sort()
// }

  render() {
    return (


        <div className="container">

          <Header>
            Anon Message Board
          </Header>
        <PostMessage onNewMessage={this.handleNewMessage} />


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
            >
              {container.message.text}
            </Message>
          ))}
        </MessageBoard>
        </div>

    )
  }
}
