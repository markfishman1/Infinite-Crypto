import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/reducers/user-reducer';
import { uiActions } from '../store/reducers/ui-reducer';
import CreateAcountModal from '../components/CreateAcountModal';
import Screen from '../components/UI/Screen';
function Register() {
    console.log('hello from authorization');
    const [isModalOpen, setModal] = useState(false);
    const dispatch = useDispatch();
    const [newAccountCreds, setNewAccountCreds] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    });
    const isScreenOn = useSelector((state) => state.ui.isScreenOn);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const screenRef = useRef();
    useEffect(() => {
        console.log('isScreenOn', isScreenOn);
    }, isScreenOn);
    const validateRegisterData = (data) => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (data.email.match(validRegex)) {
            console.log('email is valid');
        } else {
            console.log('email not valid');
            return false;
        }
        if (data.firstName.length !== 0 && data.lastName.length !== 0) {
            console.log('full name is valid');
        } else {
            console.log('first or last name must not be empty');
            return false;
        }
        if (data.password.length > 5) {
            console.log('password is valid');
        } else {
            console.log('password is too short');
            return false;
        }
        return true;
    };

    const submitRegisterHandler = (ev) => {
        ev.preventDefault();
        const registeredData = {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
            firstName: firstNameInputRef.current.value,
            lastName: lastNameInputRef.current.value,
        };
        ///MIMICS REGISTERING FOR FIRST TIME
        const dataIsValid = validateRegisterData(registeredData);
        console.log(dataIsValid, 'is valid data?');
        if (dataIsValid) {
            dispatch(userActions.register(registeredData));
            dispatch(uiActions.toggleScreen());
            setNewAccountCreds(registeredData);
            setTimeout(() => {
                setModal(true);
            }, 500);
        }
    };
    const closeModalHandler = () => {
        setModal(false);
    };

    return (
        <>
            {isModalOpen && (
                <CreateAcountModal
                    isModalOpen={isModalOpen}
                    closeModalHandler={closeModalHandler}
                    screenRef={screenRef}
                    accountCreds={newAccountCreds}
                ></CreateAcountModal>
            )}
            {isScreenOn && (
                <React.Fragment>
                    {ReactDom.createPortal(
                        <Screen class={isScreenOn ? 'screen screen-on' : 'screen'}></Screen>,
                        document.getElementById('screen-root')
                    )}
                </React.Fragment>
            )}
            <section className="authorization-section">
                {/* <div className="authorization-section-screen" ref={screenRef}></div> */}
                <div className="authorization-section-left">
                    <div>
                        <h1>Welcome To Infinite Crypto</h1>
                        <p>Enjoy trading your favorite coins with no risk</p>
                    </div>
                    <img src="/images/blockchain.png" alt="authorization vektor"></img>
                </div>
                <div className="authorization-section-right">
                    <h1>Create a new account</h1>
                    <form onSubmit={submitRegisterHandler}>
                        <div>
                            <label>Email</label>
                            <input type="email" ref={emailInputRef} className="search"></input>
                        </div>
                        <div>
                            <label>First Name</label>
                            <input type="text" ref={firstNameInputRef} className="search"></input>
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input type="text" ref={lastNameInputRef} className="search"></input>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" ref={passwordInputRef} className="search"></input>
                        </div>
                        <button>Sign Up</button>
                    </form>
                    <p>
                        Already Registered? <NavLink to="/login">Login</NavLink>
                    </p>
                </div>
            </section>
        </>
    );
}

export default Register;
