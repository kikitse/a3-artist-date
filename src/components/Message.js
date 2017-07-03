import React, { Component } from 'react'

import ReactModal from 'react-modal'

import DatePopup from './DatePopup'
import DetailsBar from './DetailsBar'



export default class Message extends Component {
  constructor(props){
    super(props)

    this.state = {
      showModal: false,
      clickedMessage: "default",
    }

  }

  handleSortMessage = () => {
    this.props.onSort(this.props.id)
  }

  handleExpandDate = (event) => {

    const pointer = event.target //|| event.srcElement

    if(pointer.nodeName ==='LI'){

      this.setState({
        showModal: true,
        clickedMessage: this.props.children
      })

      //console.log(event.target)
      //console.log(this.props.children)

      //document.querySelector('#datePopup').classList.add('is-active')

      console.log("this.props.children: " + this.props.children)
      console.log("clickedMessage: " + this.state.clickedMessage)

    }

    if(!pointer ||pointer.nodeName !='LI') return

    // loading
    //document.querySelector("popUp").className = "loader"

  }

  handleCloseDate = () => {
    this.setState({
      showModal: false
    })
  }

// CARD IMAGE
  // <div className="card-image">
  //   <figure className="image">
  //     <img src="http://via.placeholder.com/300x150" alt="Image"/>
  //   </figure>
  // </div>

render(){
  return(
    <li onClick={this.handleExpandDate} className="box is-mobile idea">

      <article className="media">
        <div className="media-left">
          <figure className="image is-100x100">
            <img src="http://via.placeholder.com/100x100" alt="Image" />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <span className="title">
                <strong>
                {this.props.children}
                </strong>
            </span>
            <p>
              <small>23 May 2017 | <a>UID</a></small>
            </p>

          </div>

          <DetailsBar
            likes={this.props.likes}
            id={this.props.id}
            onDelete={this.props.onDelete}
            idea={this.props.idea}
            onThumbsDown={this.props.onThumbsDown}
            onThumbsUp={this.props.onThumbsUp}
          >
            {this.props.children}
          </DetailsBar>

        </div>
      </article>

      <ReactModal
        isOpen={this.state.showModal}
        contentLabel="Artist Date Popup"
        className="noFocus modalMargin modalBg"
        style={{
            overlay : {
              top: 52
            }
          }}
      >
        <div className="card">

          <header className="card-header">
            <p className="card-header-title">
              <p className="title dateTitle">
                {this.props.children}
              </p>
            </p>
          </header>
          <div className="card-content">


            <div className="content">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris.</p>

              <p><small>1 Jan 2016 | <a>UID</a></small></p>

            </div>

            <DetailsBar
              likes={this.props.likes}
              id={this.props.id}
              onDelete={this.props.onDelete}
              idea={this.props.idea}
              onThumbsDown={this.props.onThumbsDown}
              onThumbsUp={this.props.onThumbsUp}
            >
              {this.props.children}
            </DetailsBar>

          </div>

          <footer className="card-footer">
            <a className="card-footer-item">Save</a>
            <a className="card-footer-item"
              onClick={this.handleCloseDate}>Cancel</a>
          </footer>

        </div>
      </ReactModal>

    </li>

  )

}
}
