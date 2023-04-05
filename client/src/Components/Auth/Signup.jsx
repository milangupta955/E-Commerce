import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import * as EmailValidator from 'email-validator';
import { useNavigate } from 'react-router-dom';
import api from '../../utility';
function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [profilePic,setProfilePic] = useState('');
    const history = useNavigate();

    const nameChanger = (e) => {
        setName(e.target.value);
    }
    const emailChanger = (e) => {
        setEmail(e.target.value);
    }
    const passwordChanger = (e) => {
        setPassword(e.target.value);
    }
    const confirmPasswordChanger = (e) => {
        setconfirmPassword(e.target.value);
    }

    const profilePicChanger = (e) => {
        setProfilePic(e.target.value);
    }

    const signup = async () => {
        try {
            if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
                window.alert("You Must Fill all information");
            } else {
                let isEmailValid = EmailValidator.validate(email);
                if (isEmailValid) {
                    if (password.length < 6) {
                        window.alert("Password Must be of length 6");
                    } else {
                        if (password !== confirmPassword) {
                            window.alert("Password and Confirm Password Didn't Match");
                        } else {
                            let res = await api.post('auth/signup', {
                                name: name,
                                email: email,
                                password: password,
                                profilepic: profilePic
                            });
                            if (res.status === 201) {
                                window.alert("Your Account Has Been SuccessFully Created Please Login");
                                history('/login');
                            } else {
                                window.alert('Something Went Wrong');
                            }
                        }
                    }
                } else {
                    window.alert("Email You Entered is Not Valid")
                }
            }
        } catch (err) {
            window.alert(err.message);
        }
    }
    return (
        <div>
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col text-white">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-grey-600 border-1 border-white px-6 py-8 rounded shadow-md text-white w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <input
                            value={name}
                            onChange={nameChanger}
                            type="text"
                            className="block border border-grey-light text-black w-full p-3 rounded mb-4"
                            name="fullname"
                            placeholder="Full Name" />

                        <input
                            value={email}
                            onChange={emailChanger}
                            type="text"
                            className="block border border-grey-light text-black w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email" />

                        <input
                            value={password}
                            onChange={passwordChanger}
                            type="password"
                            className="block border border-grey-light text-black w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" />
                        <input
                            value={confirmPassword}
                            onChange={confirmPasswordChanger}
                            type="password"
                            className="block border border-grey-light text-black w-full p-3 rounded mb-4"
                            name="confirm_password"
                            placeholder="Confirm Password" />
                        <input 
                            value = {profilePic}
                            onChange = {profilePicChanger}
                            type = "text"
                            className="block border border-grey-light text-black w-full p-3 rounded mb-4"
                            placeholder='Profile Pic'
                        />
                        <button
                            onClick={signup}
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                        >Create Account</button>
                    </div>

                    <div className="text-grey-dark mt-6">
                        Already have an account?
                        <NavLink to='/login' className="no-underline border-b border-blue text-blue">
                            Log in
                        </NavLink>.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup