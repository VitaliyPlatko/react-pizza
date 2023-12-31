
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>😕</span><br/>
                Нічого не знайдено
            </h1>
            <p className={styles.description}>Нажаль дана сторінка відсутня в нашому інтернет магазині :(</p>
        </div>
    );
}
