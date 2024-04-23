import React from 'react'
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

export default function EmailVerificationSuccessfullPage() {
    return (
        <div className='screen-container'>
            <div className={styles.container}>
                {/* <img src="./verifimage.png" alt="success_img" /> */}
                <h1>Email verified successfully</h1>
                <Link to="/userlogin">
                    <button className={styles.green_btn}>Login</button>
                </Link>
            </div>

        </div>
    )
}
