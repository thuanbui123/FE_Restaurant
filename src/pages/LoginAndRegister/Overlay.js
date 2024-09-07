import classNames from 'classnames/bind';
import styles from '~/pages/LoginAndRegister/styles.module.scss';

const cx = classNames.bind(styles);

function Overlay({ onRegisterClick, onLoginClick }) {
    return (
        <div className={cx('overlay-container')}>
            <div className={cx('overlay')}>
                <div className={cx('overlay-panel', 'overlay-left')}>
                    <h1 className={cx('title')}>
                        Hello <br /> friends
                    </h1>
                    <p>If your have an account, login here and have fun</p>
                    <button className={cx('ghost')} id="login" onClick={onLoginClick}>
                        Login
                        <i className={classNames('lni', 'lni-arrow-left', cx('login'))}></i>
                    </button>
                </div>
                <div className={cx('overlay-panel', 'overlay-right')}>
                    <h1 className={cx('title')}>
                        Start your <br /> journey now
                    </h1>
                    <p>If you don't have an account yet, join us and start your journey.</p>
                    <button className={cx('ghost')} id="register" onClick={onRegisterClick}>
                        Register
                        <i className={classNames('lni', 'lni-arrow-right', cx('register'))}></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Overlay;
