import { Alert, Button, Label, Spinner, TextInput, Toast } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTelegramPlane } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [successMessage, setSuccessMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value.trim()});
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if( !formData.email || !formData.password){
      return dispatch(signInFailure("All fields are required"));
    }
    try {
      dispatch(signInStart());
      setSuccessMessage(null);

      //send data to server
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      
      const data = await res.json()

      //handle server errors
      if (data.success === false) {
        return dispatch(signInFailure(data.message || "Login failed"));
      }
      // handle success message
      if(data.success === true){
        setSuccessMessage(data.message || "Login successful");
        dispatch(signInSuccess(data));
        navigate('/');
        return;
      }

    } catch (error) {
      dispatch(signInFailure(error.message || "An error occurred")); 
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1 ">
          <Link
            to="/"
            className="font-bold dark:text-white text-4xl"
            id="blog-name"
          >
            <span className="px-3 py-1 bg-gradient-to-r from-red-500 via-amber-600 border-t-rose-700 rounded-lg text-white/70 hover:text-white ">
              Echo
            </span>{" "}
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a blog project. You can sign in with your email and password
            or with Google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1 shadow-xl p-6 rounded-xl">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >

            <div>
              <Label htmlFor="email">Your email</Label>
              <TextInput
                id="email"
                type="email"
                name="email"
                placeholder="example@gmail.com"
                // required
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="password">Your password</Label>
              <TextInput
                id="password"
                type="password"
                name="password"
                placeholder="********"
                // required
                onChange={handleChange}
              />
            </div>

            <Button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800"
              type="submit"
              disabled={loading}
            >
              {
                loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className="pl-2">Loging In...</span>
                  </>
              ) 
                : 
                ('Log In') 
              }
            </Button>
            <OAuth/>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Does not have an account ?</span>
            <Link to={"/sign-up"} className="text-blue-600">
              Sign Up
            </Link>
          </div>

          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Toast>
              <FaTelegramPlane className="h-5 w-5 text-cyan-600 dark:text-cyan-500" />
              <div className="pl-4 text-sm font-normal">
                Successfully Login!
              </div>
            </Toast>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn