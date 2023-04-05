import React from 'react'
import { useState } from 'react'
import api from '../../utility';
import { useNavigate } from 'react-router-dom'
function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const updateEmail = (e) => {
        setEmail(e.target.value);
    }
    const sendOtp = async (emaili) => {
        let flag = false;
        setLoading(true);
        try {
            let res = await api.post('auth/forgotpassword', {
                email: emaili
            });
            if (res) {
                flag = true;
                setLoading(false);
                window.alert("Otp Has Been Send to your email id");
            }
        } catch (err) {
            setLoading(false);
            window.alert(err.message);
        }
        while (loading);
        return flag;
    }

    const otpSender = async (e) => {
        e.preventDefault();
        try {
            let isSend = await sendOtp(email);
            console.log(isSend);
            while (loading);
            if (loading === false) {
                if (isSend) {
                    history('../resetpassword', { replace: true });
                } else {
                    history('../forgotpassword', { replace: true });
                }
            }
        } catch (err) {
            window.alert(err.message);
            history('../forgotpassword', { replace: true });
        }
    }
    return (
        <div>
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Forgot Password
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="post">
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onChange={updateEmail} value={email} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <button
                                    type="submit"
                                    class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={otpSender}>Send OTP</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ForgotPassword