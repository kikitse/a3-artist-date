import React, { Component } from 'react'

export default class Intro extends Component {

constructor(props){
  super(props)
}

//   Longer Description
//   This international bestseller has inspired millions to overcome the
//   limiting beliefs and fears that inhibit the creative process.
//   First published in 1992, The Artist's Way is the
//   seminal book on the subject of creativity. Perhaps even more vital
//   in today's cultural climate than when it was first published,
//   The Artist's Way is a powerfully provocative and inspiring work.
//   In it, Julia Cameron takes readers on an amazing twelve-week journey
//   to discover the inextricable link between their spiritual and
//   creative selves.
//   <br/>This groundbreaking program includes:
//   <br/>- Introductions to two of Cameron's most vital tools for creative
//   recovery--The Morning Pages and The Artist Date - Hundreds of highly
//   effective exercises and activities - Guidance on starting a
//   "Creative Cluster" of fellow artists who will support you in your
//   creative endeavors A revolutionary program for artistic renewal from
//   the world's foremost authority on the creative process, The Artist's
//   Way is a life-changing book.

render(){
  return (
    <div>

      <div className="card">

        <div className="card-image">
          <figure className="image ">
            <img src="http://www.tseac.ie/uploads/The-Artists-Way.jpg" alt="Image"/>
          </figure>
        </div>

        <div className="card-content">

          <p className="title is-4">The Artist's Way</p>
          <p className="subtitle">A Spiritual Path to Higher Creativity</p>
          <p>
            This international bestseller has inspired millions to overcome the
            limiting beliefs and fears that inhibit the creative process.
            In it, Julia Cameron takes readers on an amazing twelve-week journey
            to discover the inextricable link between their spiritual and
            creative selves.
          </p>

        </div>

      </div>

    </div>
  )
}




}
