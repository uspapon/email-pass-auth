import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth'
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const auth = getAuth(app);
    const [submit, setSubmit] = useState();
    const handleSubmit = (event) => {
        //  prevent page refresh
        event.preventDefault();
        setSuccess('');
        setError('');

        // collect form data
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(name, email, password);

        // validate
        if(!/(?=.*[A-Z])/.test(password)){
            setError("Please add atleast one uppercase");
            return;
        }else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('Please add atleast two numbers');
            return;
        }else if(password.length<6){
            setError('Please add at least 6 characters in your password')
            return;
        }

        // create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result);
            const loggedUser = result.user;
            console.log(loggedUser);
            event.target.reset();
            setError('');
            setSuccess('User has been registered successfully')
            sendVarificationEmail(loggedUser);
            updateUserData(loggedUser, name)
            
        })
        .catch(error => {
            console.log('Error: ', error.message);
            setError(error.message)
        })
    }

    const sendVarificationEmail = (user) => {
        sendEmailVerification(user)
        .then(result => {
            console.log(result);
            alert('please varify your email address');
        })
    }

    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
        .then(() => {
            console.log('user name updated')
        }) 
        .catch(error => {
            setError(error.message);
        })
    }

    /*-----------------------------------------------
    *   first time code for learning purpose
     ------------------------------------------------*/ 
    const [email, setEmail] = useState('');
    const handleEmailChange = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
    }

    const [password, setPassword] = useState('');
    const handlePasswordBlur = (event) => {
        console.log(event.target.value);
        setPassword(event.target.value);
    }

    return (
        <div className='w-50 mx-auto mt-5'>
            <h2>Please Register</h2>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded ps-2' type="text" name="name" id="name" required placeholder='Your Name' />
                <br />
                <input className='w-50 mb-4 rounded ps-2' onChange={handleEmailChange} type="email" name="email" id="email" required placeholder='Your Email' />
                <br />
                <input className='w-50 mb-4 rounded ps-2' onBlur={handlePasswordBlur} type="password" name="password" id="password" required placeholder='Your Password' />
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p><small>Already have an account? Please <Link to='/login'>login.</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;