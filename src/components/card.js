import React, { Component } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

class Card extends Component {
  static propTypes = {
    title: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    children: PropTypes.any,
    className: PropTypes.string,
    onHeaderClick: PropTypes.func,
    headerButtonText: PropTypes.string,
    toggleable: PropTypes.bool,
    open: PropTypes.bool,
    auth: PropTypes.bool,
  }

  static defaultProps = {
    title: "Loading...",
    toggleable: false,
    open: true,
    auth: false,
  }

  state = {
    open: this.props.open,
  }

  toggleCardContent = e => {
    e.stopPropagation();

    this.setState({ open: !this.state.open })
  }

  renderHeaderContent = () => {
    const { title, id, onHeaderClick, headerButtonText } = this.props

    // Header has a clickable button
    if(onHeaderClick && headerButtonText) {
      return (
        <p className="card-header-title">
          <span>{ title }</span>

          {
            this.props.auth &&
              <button
                className="button is-warning is-small"
                onClick={() => onHeaderClick(id)}
              >
                {headerButtonText}
              </button>
          }
        </p>
      )
    }

    // Header itself is clickable
    if(onHeaderClick) {
      return (
        <a className="card-header-title" onClick={() => onHeaderClick(id)}>
          { title }
        </a>
      )
    }

    return (
      <p className="card-header-title">
        <span>{ title }</span>
      </p>
    )
  }

  render() {
    const cardClasses = classNames({
      card: true,
      closed: !this.state.open,
      [this.props.className]: !!this.props.className,
    })

    const chevronClasses = classNames({
      fa: true,
      "fa-angle-down": !this.state.open,
      "fa-angle-up": this.state.open,
    })

    return (
      <div className={cardClasses}>
        <header className="card-header">
          { this.renderHeaderContent() }

          {
            this.props.toggleable &&
              <a className="card-header-icon" onClick={e => this.toggleCardContent(e)}>
                <span className="icon">
                  <i className={chevronClasses}></i>
                </span>
              </a>
          }
        </header>

        {
          this.state.open &&
            <div className="card-content">
              {this.props.children}
            </div>
        }

      </div>
    )
  }
}

export default Card
