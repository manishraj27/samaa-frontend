import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const [loading, setLoading] = useState(true);
    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:3001/api/users/${param.id}/verify/${param.token}`;
                const response = await axios.get(url);
                const { data } = response;
                if (data.message === "Email verified successfully") {
                    setValidUrl(true);
                    navigate("/email-verification-success");
                } else {
                    setValidUrl(false);
                }
            } catch (error) {
                console.log("Error:", error);
                setValidUrl(false);
            } finally {
                setLoading(false);
            }
        };
        verifyEmailUrl();
    }, [param.id, param.token, navigate]);

    return (
        <div className="screen-container">
            {loading ? (
                <div className={styles.container}>
                    <h1>Loading...</h1>
                </div>
            ) : validUrl ? (
                <div className={styles.container}>
                    <img src="./verifimage.png" alt="success_img" />
                    <h1>Email verified successfully</h1>
                    <Link to="/userlogin">
                        <button className={styles.green_btn}>Login</button>
                    </Link>
                </div>
            ) : (
                <div className={styles.container}>
                    <h1>Verification not successful</h1>
                </div>
            )}
        </div>
    );
};

export default EmailVerify;
