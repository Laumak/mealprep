import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import navigate from "../../utils/navigate"

import { FetchCurrentWeek, FetchWeek, GoToWeek } from "./actions"
import { FetchAllMeals } from "../meals/actions"

import ContentWrapper from "../../components/contentWrapper"

import PlannerDay from "./components/plannerDay"
import WeekNavigation from "./components/weekNavigation"

class PlannerWeek extends Component {
  static propTypes = {
    currentWeek: PropTypes.object,
    fetchCurrentWeek: PropTypes.func.isRequired,
    fetchAllMeals: PropTypes.func.isRequired,
    fetchWeek: PropTypes.func.isRequired,
    match: PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const weekNumber = this.props.match.params.number
    const year       = this.props.match.params.year

    this.props.fetchAllMeals()

    if(!this.props.currentWeek.number) {
      if(!weekNumber) {
        return this.props.fetchCurrentWeek()
      }

      this.props.fetchWeek(weekNumber, year)
    }
  }

  handleOnGoToWeek = type => {
    let num
    const year = this.props.match.params.year

    if(type === "prev") {
      num = this.props.currentWeek.number - 1
    }

    if(type === "next") {
      num = this.props.currentWeek.number + 1
    }

    return this.props.fetchWeek(num, year)
      .then(() => navigate(`/planner/${num}`, this.context))
  }

  getToday = todayIndex => {
    let today

    switch(todayIndex) {
      case 0: {
        today = 6
        break
      }
      case 1: {
        today = 0
        break
      }
      case 2: {
        today = 1
        break
      }
      case 3: {
        today = 2
        break
      }
      case 4: {
        today = 3
        break
      }
      case 5: {
        today = 4
        break
      }
      case 6: {
        today = 5
        break
      }
    }

    return today
  }

  // https://gist.github.com/dblock/1081513#gistcomment-1756491
  weekOfYear = date => {
    const d = new Date(+date)

    d.setHours(0,0,0)
    d.setDate(d.getDate()+4-(d.getDay() || 7))

    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7)
  }

  renderDays = days => {
    const now = new Date()
    const todayIndex = now.getDay()
    const currentWeekNumber = this.weekOfYear(now)

    let today = this.getToday(todayIndex)

    return days.map((day, index) => {
      let open = false

      if(this.props.currentWeek.number != currentWeekNumber) {
        open = true
      } else {
        if(index >= today) {
          open = true
        }
      }

      return <PlannerDay day={day} open={open} key={day.id} />
    })
  }

  render() {
    const { currentWeek } = this.props

    return (
      <ContentWrapper>
        {
          currentWeek.number &&
            <WeekNavigation
              initialWeek={currentWeek}
              goToWeek={this.handleOnGoToWeek}
            />
        }

        <div className="planner-week">
          {
            !!currentWeek.days.length &&
              <div className="columns is-multiline">
                { this.renderDays(currentWeek.days) }
              </div>
          }
        </div>
      </ContentWrapper>
    )
  }
}

const mapState = state => ({
  currentWeek: state.weeks.current,
  weeks: state.weeks.all,
})

const mapDispatch = dispatch => ({
  fetchCurrentWeek: () => dispatch(FetchCurrentWeek()),
  fetchWeek: (number, year) => dispatch(FetchWeek(number, year)),
  goToWeek: number => dispatch(GoToWeek(number)),
  fetchAllMeals: () => dispatch(FetchAllMeals()),
})

export default connect(mapState, mapDispatch)(PlannerWeek)
