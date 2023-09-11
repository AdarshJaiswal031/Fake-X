import React from 'react'
import styles from '../styles/HomeStyle.module.css';
import Link from 'next/link';

const HomeContent = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.block}>
                    <li className={styles.subImg}><img src="ethrocket.jpg" alt="" /></li>
                    <div className={styles.subBlock}>
                        <ul>
                            <li className={styles.smallTxt}>Welcome to</li>
                            <li className={styles.largeTxt}>FAKE-X</li>
                            <li className={styles.greyTxt}>A blockchain base fake content identification solution. Upload you content and get
                                remain original with us and decade's best technology Blockchain .
                            </li>
                            <li className={styles.liButton}><Link href="/Profile"><button>Get Started</button></Link></li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}

export default HomeContent