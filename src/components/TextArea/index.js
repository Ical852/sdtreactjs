import React from 'react'
import propTypes from 'prop-types'

export default function TextAreaCustomd(props) {
    const { label, value, error, errMsg, onChange, autofocus } = props
  return (
    <div class="form-group">
        <label for="ingredients" class="form-label">{label}</label>
        <textarea 
            type="text" 
            class={`form-control ${error && 'is-invalid'}`} rows="3" required
            autoFocus={autofocus}
            onChange={onChange}
            value={value}
            ></textarea>
            {
                error &&
                <div class="invalid-feedback">
                    {errMsg}
                </div>
            }
    </div>
  )
}

TextAreaCustomd.propTypes = {
  label: propTypes.string,
  value: propTypes.string,
  error: propTypes.bool,
  errMsg: propTypes.string,
  onChange: propTypes.func,
  autofocus: propTypes.bool
}