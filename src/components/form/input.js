import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

const propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
}

const defaultProps = {
  placeholder: "",
}

const Input = props => {
  const controlClasses = classNames({
    control: true,
    "has-icons-left": !!props.icon,
  })

  return (
    <div className="field">
      {
        props.label &&
          <label htmlFor={props.name} className="label">
            {props.label}
          </label>
      }

      <p className={controlClasses}>
        <input
          type={props.type}
          name={props.name}
          className="input"
          onChange={e => props.onChange(e)}
          placeholder={props.placeholder}
        />

        {
          props.icon &&
            <span className="icon is-small is-left">
              <i className={`fa ${props.icon}`}></i>
            </span>
        }
      </p>
    </div>
  )
}

Input.propTypes    = propTypes
Input.defaultProps = defaultProps

export default Input
