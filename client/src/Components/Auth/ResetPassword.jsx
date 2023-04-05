import React from 'react'
import { useState } from 'react';
import api from '../../utility';
import { useNavigate } from 'react-router';
function ResetPassword() {
    const [otp,setOtp] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setconfirmPassword] = useState('');
    const history = useNavigate();
    const otpChanger=(e)=>{
        setOtp(e.target.value);
    }
    const passwordChanger=(e)=>{
        setPassword(e.target.value);
    }
    const confirmPasswordChanger=(e)=>{
        setconfirmPassword(e.target.value);
    }

    const resetPassword = async () => {
        try {
            if(password.length < 6) {
                window.alert("Password Too Short");
            } else if(confirmPassword !== password) {
                window.alert("Password and confirm Password Didn't match");
            } else {
                let res = await api.patch('/auth/resetPassword',{
                    otp: otp,
                    password: password
                });
                if(res.status === 201) {
                    window.alert("Password Reset SuccessFully");
                    history('/login');
                } else if(res.status === 401) {
                    window.alert("Otp is wrong");
                    history('/resetPassword');
                } else if(res.status === 402) {
                    window.alert("Otp has been Expired");
                    history('/resetPassword');
                } else {
                    window.alert("Internal Server Error");
                    history('/resetPassword');
                }
            }
        } catch(err) {
            window.alert(err.message);
            history('/resetPassword');
        }
    }
  return (
    <div>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col text-white">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-grey-600 border-1 border-white px-6 py-8 rounded shadow-md text-white w-full">
                    <h1 className="mb-8 text-3xl text-center">Reset Password</h1>
                    <input 
                        value = {otp}
                        onChange={otpChanger}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4 text-black"
                        name="otp"
                        placeholder="Enter Otp" />
                    <input 
                    value = {password}
                    onChange={passwordChanger}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4 text-black"
                        name="password"
                        placeholder="Password" />
                    <input 
                    value = {confirmPassword}
                    onChange={confirmPasswordChanger}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4 text-black"
                        name="confirm_password"
                        placeholder="Confirm Password" />
                    <button
                        onClick={resetPassword}
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                    >Change Password</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword