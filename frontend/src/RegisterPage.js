import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    const checkStrength = (pwd) => {
        if (pwd.length < 6) return "Weak";
        if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.length >= 8) return "Strong";
        return "Medium";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        try {
            const res = await axios.post("http://localhost:5000/api/register", {
                email,
                password,
            });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="register-input"
                />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordStrength(checkStrength(e.target.value));
                    }}
                    required
                    className="register-input"
                />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="register-input"
                />
                <div style={{ textAlign: "left", marginBottom: "12px" }}>
                    <label style={{ fontSize: "15px", cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            style={{ marginRight: "8px" }}
                        />
                        Show Password
                    </label>
                    <span style={{
                        marginLeft: "16px",
                        color: passwordStrength === "Strong" ? "green" : passwordStrength === "Medium" ? "orange" : "red"
                    }}>
                        {password && `Strength: ${passwordStrength}`}
                    </span>
                </div>
                <button type="submit" className="register-button">
                    Register
                </button>
            </form>
            <p className="register-message">{message}</p>
        </div>
    );
};

export default RegisterPage;
