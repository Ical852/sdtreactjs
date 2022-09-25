import React from 'react'
import propTypes from 'prop-types'

export default function InputCustomed(props) {
    const { label, value, error, errMsg, onChange, autofocus, type } = props
  return (
    <div class="form-group">
        <label for="name" class="form-label">{label}</label>
        <input 
            type={type} 
            class={`form-control ${error && 'is-invalid'}`} 
            aria-describedby="emailHelp" 
            autoFocus={autofocus} 
            required 
            value={value}
            onChange={onChange} />
        {
            error &&
            <div class="invalid-feedback">
                {errMsg}
            </div>
        }
    </div>
  )
}

InputCustomed.propTypes = {
    label : propTypes.string,
    value: propTypes.string,
    error : propTypes.bool,
    errMsg : propTypes.string,
    onChange : propTypes.func,
    autofocus : propTypes.bool,
    type: propTypes.string
}