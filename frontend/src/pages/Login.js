import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/user.actions';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        const registeredData = {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
        };
        dispatch(login(registeredData));
        navigate('/profile');
    };
    return (
        <section className="authorization-section">
            <div className="authorization-section-left">
                <div>
                    <h1>Welcome To Infinite Crypto</h1>
                    <p>Enjoy trading your favorite coins with no risk</p>
                </div>
                <img src="/images/blockchain.png" alt="authorization vektor"></img>
            </div>
            <div className="authorization-section-right">
                <h1>Infinite Crpyto Account Login</h1>
                <form onSubmit={submitHandler}>
                    <div>
                        <label>Email</label>
                        <input type="email" ref={emailInputRef} className="search"></input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" ref={passwordInputRef} className="search"></input>
                    </div>
                    <button>Log In</button>
                </form>
                <p>
                    Dont have an acoount? <NavLink to="/register">Register now</NavLink>
                </p>
            </div>
        </section>
    );
}
{
    /* <div className=""></div>
<h1>CryptoSomething Account Login</h1>
<form>
    <div>
        <label>Email</label>
        <input type="email"></input>
    </div>
    <div>
        <label>Password</label>
        <input type="password"></input>
    </div>
</form>
<div>
    <h1>-----Or-----</h1>
    <h2>Login with google</h2>
</div>
<p>
    Dont have an acoount? <NavLink to="/register">Register now</NavLink>
</p> */
}

export default Login;
