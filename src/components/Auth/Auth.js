import React, { Component } from 'react';
import { Formik } from 'formik';

class Auth extends Component {
    state = {
        mode: "Sign Up"
    }

    switchModeHandler = () => {
        this.setState({ mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up" })
    }
    render() {
        return (
            <div>
                <h4 style={{
                    backgroundColor: "#00AFDB",
                    color: "white",
                    border: "1px solid grey",
                    margin: "0px",
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                    padding: "20px",
                }}>{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</h4>
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: "",
                            passwordConfirm: "",
                        }
                    }

                    onSubmit={
                        (values) => {
                            console.log(values);
                        }
                    }

                    validate={(values) => {
                        const errors = {};

                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^([a-zA-Z0-9]\.?)+[^\.]@([a-zA-Z0-9]\.?)+[^\.]$/g.test(values.email)) {
                            errors.email = 'Please enter a valid email address!';
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#\$%\^&\*])(?=.{8,})/g.test(values.password)) {
                            errors.password = 'Password must contain 8 characters and at least 1 lowercase letter, 1 uppercase letter, 1 number & 1 special character!';
                        }

                        if (this.state.mode === "Sign Up") {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = 'Required';
                            } else if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = 'Password field does no match!';
                            }
                        }
                        //console.log("Errors:", errors)
                        return errors;
                    }}
                >
                    {/* formik gives us handleChange & handleSubmit   */}
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div
                            style={{
                                border: "1px solid grey",
                                borderRadius: "5px",
                                padding: "20px",
                                paddingBottom: "50px",
                                borderTopLeftRadius: "0px",
                                borderTopRightRadius: "0px"
                            }}>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <input
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>
                                    <small> {errors.email} </small>
                                </span>
                                <br />
                                <input
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>
                                    <small>{errors.password}</small>
                                </span>
                                <br />
                                {this.state.mode === "Sign Up" ? <div>
                                    <input
                                        name="passwordConfirm"
                                        placeholder="Confirm Password"
                                        className="form-control"
                                        value={values.passwordConfirm}
                                        onChange={handleChange}
                                    />
                                    <span style={{ color: "red" }}>
                                        <small>{errors.passwordConfirm}</small>
                                    </span>
                                    <br />
                                </div> : null}
                                <button className="btn btn-info float-right" onClick={this.switchModeHandler}>Switch to {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}</button>
                                <button type="submit" className="btn btn-success  mr-2 float-right">{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</button>
                            </form>
                        </div>)}
                </Formik>
            </div >
        )
    }
}

export default Auth;