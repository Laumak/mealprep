import React from "react"
import { Route } from "react-router-dom"

import ContentWrapper from "../../components/contentWrapper"

import Login from "./containers/login"
import Register from "./containers/register"

const Authentication = () => {
  return (
    <ContentWrapper>
      <div className="columns">
        <div className="column is-8 is-offset-2">

          <Route path={"/login"} component={Login} />
          <Route path={"/register"} component={Register} />

        </div>
      </div>
    </ContentWrapper>
  )
}

export default Authentication
