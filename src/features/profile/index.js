import React, { Component } from "react"

import ContentWrapper from "../../components/contentWrapper"

class Profile extends Component {
  // state = {

  // }

  render() {
    return (
      <ContentWrapper className="profile">
        <header>

          <div className="user">
            <div className="avatar">
              <img src="https://placehold.it/256x256" />
            </div>

            <div className="info content">
              <h1 className="title is-3">Hermanni Honkkeli</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit assumenda eqwer.</p>
            </div>
          </div>

          <div className="stats">
            <div className="item">
              <h2 className="title is-2">234</h2>
              <h3 className="title is-5">Meals</h3>
            </div>

            <div className="item">
              <h2 className="title is-2">234</h2>
              <h3 className="title is-5">User profile</h3>
            </div>

            <div className="item">
              <h2 className="title is-2">234</h2>
              <h3 className="title is-5">User profile</h3>
            </div>
          </div>

        </header>
      </ContentWrapper>
    )
  }
}

export default Profile
