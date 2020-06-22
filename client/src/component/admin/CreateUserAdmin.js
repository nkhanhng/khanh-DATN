import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import {registerUser} from '../../actions/authAction';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup'

const CreateUserAdmin = (props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errors, setErrors] = useState({})
    const onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            password,
            password2
        }
        // console.log(props)
        dispatch(registerUser(newUser, props.history, '/admin/users'))
    }

    return (
        <div className="register">
        <div className="container">
            <div className="row">
            <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Create User</h1>
                <form action="create-profile.html" onSubmit={onSubmit}>
                <TextFieldGroup
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                />

                <TextFieldGroup
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    info="This site uses Gravatar so if you want a profile page, use a Gravatar"
                />

                <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                />

                <TextFieldGroup
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    error={errors.password2}
                />

                <button type="submit" className="btn btn-info btn-block mt-4">
                    Submit
                </button>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
};

export default CreateUserAdmin;
