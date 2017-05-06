import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

const propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  visible: PropTypes.bool,
}

const defaultProps = {
  visible: true,
}

const Message = props => {
  if(props.visible === false) {
    return null
  }

  const wrapperClasses = classNames({
    "message": true,
    [props.className]: !!props.className,
  })

  return (
    <article className={wrapperClasses}>
      <div className="message-header">
        <p>{props.title}</p>
      </div>
      <div className="message-body content">
        {props.children}
      </div>
    </article>
  )
}

Message.propTypes    = propTypes
Message.defaultProps = defaultProps

export default Message
