import React, { Component } from 'react'

export default class Message extends Component {
  constructor(props){
    super(props)
  }

  handleThumbsUp = () => {
    this.props.onThumbsUp(this.props.id)
  }

  handleThumbsDown = () => {
    this.props.onThumbsDown(this.props.id)
  }

  handleDeleteMessage = () => {
    this.props.onDelete(this.props.id)
  }

  handleSortMessage = () => {
    this.props.onSort(this.props.id)
  }

  // user presses <i> plus like button on message
  // changes the state for that message
  // displays likes on the counter



  // edit

render(){
  return(
    <li>
      {this.props.children}
      <i className="fa fa-trash pull-right delete" onClick={this.handleDeleteMessage}></i>
      <i className="fa fa-thumbs-down pull-right" onClick={this.handleThumbsDown}></i>
      <i id="submit" className="fa fa-thumbs-up pull-right" onClick={this.handleThumbsUp}></i>
      <div className="pull-right">{this.props.likes}</div>
    </li>
  )

}
}
