import React, { Component } from 'react'

export default class MessageBoard extends Component {
  constructor(props){
  super(props)
  }

  render(){
    return(
          <div className="container bot-marg">
       <ul className="message-board">
         {this.props.children}
       </ul>
           </div>

    )
  }


}
