import { Alert, Button, Label, Spinner, TextInput, Toast } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTelegramPlane } from 'react-icons/fa';
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value.trim()});
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage("All fields are required");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      //send data to server
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      
      const data = await res.json()

      //handle server errors
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message || "Signup failed");
      }
      // handle success message
      if(data.success === true){
        setLoading(false);
        setSuccessMessage(data.message || "Signup successful");
        navigate('/sign-in');
        return;
      }
      
      setLoading(false);

    } catch (error) {
      setErrorMessage(error.message || "An error occurred") 
      setLoading(false); 
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
            This is a blog project. You can sign up with your email and password
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
              <Label htmlFor="username">Your username</Label>
              <TextInput
                id="username"
                type="text"
                name="username"
                placeholder="username"
                // required
                onChange={handleChange}
              />
            </div>

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
                placeholder="password"
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
                    <span className="pl-2">Signing Up...</span>
                  </>
              ) 
                : 
                ('Sign Up') 
              }
            </Button>
            <OAuth/>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account ?</span>
            <Link to={"/sign-in"} className="text-blue-600">
              Sign In
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
                Successfully signed up!
              </div>
            </Toast>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp