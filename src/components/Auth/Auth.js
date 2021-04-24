import React, { Component } from 'react';
import { Formik } from 'formik';

class Auth extends Component {
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
                }}>LogIn</h4>
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
                >
                    {/* formik gives us handleChange & handleSubmit   */}
                    {({ values, handleChange, handleSubmit }) => (<div>
                        <form onSubmit={handleSubmit}
                            style={{
                                border: "1px solid grey",
                                borderRadius: "5px",
                                padding: "20px",
                                paddingBottom: "50px",
                                borderTopLeftRadius: "0px",
                                borderTopRightRadius: "0px"
                            }}>
                            <input
                                name="email"
                                placeholder="Enter Your Email"
                                className="form-control"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                name="password"
                                placeholder="Password"
                                className="form-control"
                                value={values.password}
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                name="passwordConfirm"
                                placeholder="Confirm Password"
                                className="form-control"
                                value={values.passwordConfirm}
                                onChange={handleChange}
                            />
                            <br />
                            <button type="submit" className="btn btn-info float-right">Sign Up</button>
                            <button type="submit" className="btn btn-success float-right mr-2">Log In</button>
                        </form>
                    </div>)}
                </Formik>
            </div>
        )
    }
}

export default Auth;