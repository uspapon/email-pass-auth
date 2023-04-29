import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();
    const passwordRef = useRef();


    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // strong password validation
        setError('');
        setSuccess('');

        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError("Please add at least two uppercases.");
            return
        }else if (!/(?=.*[!@#$&*])/.test(password)){
            setError("please use at least one special charecter to the password")
            return
        }else if (password.length<6){
            setError("Password mus be 6 characters long.")
            return
        }

            // login with firebase
            signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                if(!loggedUser.emailVerified){
                    alert("This account has not been varified. Please varify with your email. ")
                   return 
                }
                setSuccess("Usere login successful!")
                setError('');
                console.log(loggedUser);

            })
            .catch(error => {
                setError(error.message);
                console.log("Error: ", error.message);
            })
    }

    const handleResetPassword = event => {
       const email = emailRef.current.value;
       if(!email){
        alert("Please provide your email address to reset password")
        return;
    }

       sendPasswordResetEmail(auth, email)
       .then( () => {
            alert('Please check your email.')
       })
       .catch(error => {
            setError(error.message);
            console.log(error);
       })
    }

    const handleShowPassword = event => {
        const password = passwordRef.current;
        // console.log("here i am",password);
        console.log(password);
        password.type = 'text';
    }


    return (
        <div className='w-50 mx-auto mt-5'>
            <h2>Please login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" ref={emailRef} name='email' required className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" ref={passwordRef} name='password' required className="form-control" id="password" placeholder="Password" />
                </div>
                <div className="form-group mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="remember-me" />
                    <label className="form-check-label" htmlFor="remember-me">Remember me</label>
                </div>
                <div className="form-group mb-3 form-check">
                    <input onClick={handleShowPassword} type="checkbox" className="form-check-input" id="show-password" />
                    <label className="form-check-label" htmlFor="show-password">Show password</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p><small>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>
            <p><small>New to this website? Please <Link to='/register'>register</Link></small></p>
            
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;