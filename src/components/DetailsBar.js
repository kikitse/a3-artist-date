import React, { Component } from 'react'

import DeleteDateModal from './DeleteDateModal'

// import react modal for delete message confirmation box
import ReactModal from 'react-modal'

export default class DetailsBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      showModal: false
    };
  }

  handleThumbsUp = () => {
    this.props.onThumbsUp(this.props.id)
  }

  handleThumbsDown = () => {
    this.props.onThumbsDown(this.props.id)
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseDate = () => {
    document.querySelector('#datePopup').classList.remove('is-active')
  }

  // user presses <i> plus like button on message
  // changes the state for that message
  // displays likes on the counter

  // dislike
  // <a className="level-item">
  //   <span className="icon is-small"><i className="fa fa-thumbs-down pull-right" onClick={this.handleThumbsDown}></i></span>
  // </a>

  handleEditMessage = () => {

  }

  render(){
    return(

      <nav className="level is-mobile">
        <div className="level-left">

          <a className="level-item">
            <span className="tag is-primary">Tag </span>
          </a>

          <a className="level-item">
            <span className="icon is-small">
              <i className="fa fa-thumbs-up pull-right"
                onClick={this.handleThumbsUp}
              ></i>
            </span>
          </a>

          <a className="level-item">
            <div className="pull-right">{this.props.likes}</div>
          </a>

          <a className="level-item">
            <span className="icon is-small">
              <i className="fa fa-star pull-right"></i>
            </span>
          </a>

          <a className="level-item">
            <span className="icon is-small">
              <i className="fa fa-paper-plane pull-right"></i>
            </span>
          </a>

          <a className="level-item">
            <span className="">|</span>
          </a>

          <a className="level-item">
            <span className="icon is-small">
              <i className="fa fa-pencil pull-right" ></i>
            </span>
          </a>

          <a className="level-item">
            <span className="icon is-small">
              <DeleteDateModal
                id={this.props.id}
                onDelete={this.props.onDelete}
                likes={this.props.likes}
                idea={this.props.idea}
              >
                {this.props.onDelete}
                {this.props.children}

              </DeleteDateModal>
            </span>
          </a>
        </div>
      </nav>

    )
  }
}
