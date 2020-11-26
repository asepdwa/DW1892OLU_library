import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export function CustomInput(props) {
  return (
    <div className="form-group" style={{ marginTop: 20 }}>
      <input
        className={
          props.value
            ? props.error
              ? "form-control is-invalid"
              : "form-control is-valid"
            : "form-control"
        }
        style={props.style}
        {...props}
      />
      <span className="help-block text-danger">{props.error}</span>
    </div>
  );
}

export function CustomTextArea(props) {
  return (
    <div className="form-group">
      <textarea
        className={
          props.value
            ? props.error
              ? "form-control is-invalid"
              : "form-control is-valid"
            : "form-control"
        }
        style={props.style}
        {...props}
      />
      <span className="help-block text-danger">{props.error}</span>
    </div>
  );
}

export function CustomInputGroup(props) {
  return (
    <div className="form-group" style={{ marginTop: 20 }}>
      <div class="input-group">
        <input
          className={
            props.value
              ? props.error
                ? "form-control is-invalid"
                : "form-control is-valid"
              : "form-control"
          }
          style={props.style}
          {...props}
        />
        <div class="input-group-append">
          <button
            class="btn btn-secondary"
            type="button"
            onClick={props.action}
          >
            {props.actionName}
          </button>
        </div>
      </div>
      <span className="help-block text-danger">{props.error}</span>
    </div>
  );
}

export function CustomInputFile(props) {
  const { touched_check, file, errors, placeholder } = props;
  return (
    <div className="form-group">
      <div className="custom-file">
        <input type="file" className="custom-file-input" {...props} />
        <label onBlur={props.onBlur} className="custom-file-label">
          {!file ? placeholder : file.name}
        </label>
        <span className="help-block text-danger">
          {touched_check ? errors : ""}
        </span>
      </div>
    </div>
  );
}

export function CustomInputPassword(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="form-group" style={{ marginTop: 20 }}>
      <div class="input-group">
        <input
          className={
            props.value
              ? props.error
                ? "form-control is-invalid"
                : "form-control is-valid"
              : "form-control"
          }
          style={props.style}
          {...props}
          type={showPassword ? "text" : "password"}
        />
        <div class="input-group-append">
          <button
            class="btn btn-dark"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEye size={22} />
            ) : (
              <AiOutlineEyeInvisible size={22} />
            )}
          </button>
        </div>
      </div>
      <span className="help-block text-danger">{props.error}</span>
    </div>
  );
}

export function CustomSelect(props) {
  return (
    <div className="form-group" style={{ marginTop: 20 }}>
      <select
        className={
          props.value
            ? props.error
              ? "form-control is-invalid"
              : "form-control is-valid"
            : "form-control"
        }
        style={props.style}
        {...props}
      />
      <span className="help-block text-danger">{props.error}</span>
    </div>
  );
}
