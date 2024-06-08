import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/login.jpg";
import { login } from "../actions/Account.action";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await login(email, password);
        if (email === "" || password === "") {
            setError("Email and password must be filled");
            return;
        }
        if (response.success) {
            navigate("/teams");
        } else {
            setError(response.data.message);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
            <div className="hidden sm:block">
                <img className="w-full h-full object-cover" src={loginImg} alt="" />
            </div>

            <div className="bg-gray-100 flex flex-col justify-center">
                <form
                    className="max-w-[400px] w-full mx-auto bg-white p-4 rounded-lg shadow-md"
                    onSubmit={handleLogin}
                >
                    <h2 className="text-4xl font-bold text-center py-6">Welcome!</h2>
                    <div className="flex flex-col py-2">
                        <label>Email</label>
                        <input
                            className="border p-2 rounded-lg"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col py-2">
                        <label>Password</label>
                        <input
                            className="border p-2 rounded-lg"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="border w-full my-5 py-2 bg-black hover:bg-gray-600 text-white rounded-lg">
                        Log in
                    </button>
                    <div className="text-center mt-2 mb-4">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/register">
                                <strong>Register now</strong>
                            </Link>
                        </p>
                    </div>
                    {error && <div className="text-red-500 text-center">{error}</div>}
                </form>
            </div>
        </div>
    );
}
