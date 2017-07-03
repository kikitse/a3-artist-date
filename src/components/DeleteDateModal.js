import React, { Component } from 'react'

import ReactModal from 'react-modal'

export default class DeleteDateModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      showModal: false
    };
  }

  handleDeleteMessage = () => {
    this.props.onDelete(this.props.id)
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  render(){
    return(

          <i onClick={this.handleOpenModal} className="fa fa-trash pull-right delete">
            <ReactModal
               className="noFocus container"
               isOpen={this.state.showModal}
               contentLabel="Delete Artist Date"
            >
              <div className="box">
                <h1 className="title"><strong>Delete</strong> this Artist Date? <br/>"{this.props.children}"</h1>
                <nav className="level is-mobile">
                  <div className="level-left">
                    <span className="level-item">
                      <button className="button is-danger" onClick={this.handleDeleteMessage}>Delete</button>
                    </span>
                    <span className="level-item">
                      <button className="button" onClick={this.handleCloseModal}>Cancel</button>
                    </span>
                  </div>
                </nav>
              </div>

            </ReactModal>
          </i>




    )
  }
}
