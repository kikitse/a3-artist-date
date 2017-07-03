import React, { Component } from 'react'

export default class Header extends Component {
  constructor(props){
  super(props)

  }

  // <div class="hero container has-text-centered">
  //   <div class="hero-body">
  //       <h1 class="title">
  //         Artist Date Ideas
  //       </h1>
  //       <p class="subtitle">
  //         Hero subtitle
  //       </p>
  //     </div>
  //   </div>

render() {
  return (

    <div className="hero is-primary">
      <div className="container">
        <div className="hero-body">
          <h1 className="title">
            The Artist's Way
          </h1>
          <h2 className="subtitle">
            Artist Date Generator
          </h2>
      </div>
    </div>
  </div>

  )
}
}
