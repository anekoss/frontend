import React from "react";
import styles from './MyHeader.module.css'
import Logout from "./Logout/Logout";

const MyHeader = (props) => {
    const logout = () => {
        if (localStorage.getItem("userRSWebLab4")) {
            return (
                <div className={styles.header}>
                    <div className={styles.aboutInfo}>
                        <a>Чернова Анна P32301 Var:4578</a>
                    </div>
                    <div className={styles.user_container}>
                        <div
                            className={styles.userSign}>Пользователь: {JSON.parse(localStorage.getItem("userRSWebLab4")).username}</div>

                        <Logout onClick={props.logout}/>
                    </div>
                </div>

            )
        }
    }
    return (
        <div>
            {
                logout()
            }
        </div>
    )
}

export default MyHeader