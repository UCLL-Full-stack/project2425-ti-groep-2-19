import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import UserService from "@/services/UserService";
import {Role, StatusMessage} from "@/types";
import classNames from "classnames";

const RegisterForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role] = useState<Role>("player");

    const [emailError, setEmailError] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const router = useRouter();

    const validateForm = () => {
        setEmailError("");
        setNameError("");;
        setPasswordError("");
        setStatusMessages([]);

        let isValidForm = true;

        if (email === "" || email.trim() === "") {
            setEmailError("Email is required");
            isValidForm = false;
        }

        if (name === "" || name.trim() === "") {
            setNameError("First name is required");
            isValidForm = false;
        }

        if (password === "" || password.trim() === "") {
            setPasswordError("Password is required");
            isValidForm = false;
        }

        return isValidForm;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();


        if (validateForm()) {
            const user = { email, name, password, role};
            console.log(user)
            const response = await UserService.createUser(user);
            if (!response.ok) {
                setStatusMessages([
                    {
                        message: 'An error occurred. Please try again later.',
                        type: "error",
                    },
                ]);
            }
            setStatusMessages([
                {
                    message: 'User successfully registered. Redirecting to login...',
                    type: "success",
                },
            ]);
            router.push("/login");
        }
    };

    return (
        <>
            <h3 className="px-0">Login</h3>
            {statusMessages && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    "text-red-800": type === "error",
                                    "text-green-800": type === "success",
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
                <form onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">
                            Email:
                        </label>
                        <div className="block mb-2 text-sm font-medium">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {emailError && <div className="text-red-800">{emailError}</div>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="name"className="block mb-2 text-sm font-medium">
                                Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {nameError && <div className="text-red-800">{nameError}</div>}
                        </div>

                    <div className="mt-2">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium">
                            Password:
                        </label>
                        <div className="block mb-2 text-sm font-medium">
                            <input
                                type="password"
                                name="password"
                                id="pass"
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {passwordError && <div className="text-red-800">{passwordError}</div>}
                        </div>
                    </div>
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
        </>
    );
};

export default RegisterForm;