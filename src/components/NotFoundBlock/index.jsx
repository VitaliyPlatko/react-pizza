import React from 'react'

import styles from './NotFoundBlock.module.scss'

function NotFoundBlock () {
    return (
        <div className={styles.root}>
            <h1 >
                <span>😕</span><br/>
                <h1>Нічого не знайдено </h1>
                <p className={styles.description}>Нажаль дана сторінка відсутня в нашому інтернет магазині :(</p>
            </h1>
        </div>
    )
}

export default NotFoundBlock