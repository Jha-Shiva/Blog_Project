import { Alert, Button, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

const DashProfile = () => {
  const {currentUser, error, loading} = useSelector((state)=> state.user)
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef()
  const [formData, setFormData] = useState({})
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setImageFile(e.target.files[0]);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
      if (Object.keys(formData).length === 0) {
        setUpdateUserError("No changes made");
        return;
      }
      // if (imageFileUploading) {
      //   setUpdateUserError("Please wait for image to upload");
      //   return;
      // }
      try {
        dispatch(updateStart());
        const res = await fetch(`/api/user/update/${currentUser.rest._id || currentUser.user._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message);
        } else {
          dispatch(updateSuccess(data));
          setUpdateUserSuccess("User's profile updated successfully");
        }
      } catch (error) {
        dispatch(updateFailure(error.message));
        setUpdateUserError(error.message);
      }
    };
    const handleDeleteUser = async () => {
      setShowModal(false);
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser.rest._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(deleteUserFailure(data.message));
        } else {
          dispatch(deleteUserSuccess(data));
          navigate("/sign-up");
        }
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    };

    const handleSignout = async () => {
      try {
        const res = await fetch("/api/user/signout", {
          method: "POST",
        });
        const data = await res.json();
        if (res.status === 401) {
          dispatch(signoutSuccess());
          navigate("/sign-in");
          return;
        }
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
          navigate("/sign-in");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

  return (
    <div className="max-w-lg mx-auto p-4 w-full">
      <h1 className="my-7 text-center font-semibold roboto text-3xl">
        Profile
      </h1>
      <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className={`w-34 h-32 self-center cursor-pointer shadow-lg shadow-gray-400 dark:shadow-cyan-500/50  rounded-full overflow-hidden`}
          onClick={()=> filePickerRef.current.click()}>
          <img
            src={imageFileUrl || currentUser.rest.profilePicture || currentUser.user.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.rest.username || currentUser.user.username} onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.rest.email || currentUser.user.email} onChange={handleChange}
        />
        <TextInput type="password" id="password" placeholder="password"  onChange={handleChange}/>
        <button disabled={loading} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            {loading ? 'Updating...' : 'Update Profile'}
          </span>
        </button>

        {currentUser.rest.isAdmin && (
          <Link to={'/create-post'}>
          <button className=" w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Create a Post
            </span>
          </button>
          </Link>
        )}

      </form>
      <div className="text-red-500 mt-5 flex justify-between">
        <span className='cursor-pointer' onClick={() => setShowModal(true)}>Delete Account</span>
        <span className='cursor-pointer' onClick={handleSignout}>Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5' onDismiss={() => setUpdateUserSuccess()}>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5' onDismiss={() => setUpdateUserError(null)}>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5' onDismiss={() => dispatch(updateFailure(null))}>
          {error}
        </Alert>
      )}

      <Modal show={showModal} size='md' popup={true} onClose={() => setShowModal(false)}>
        <ModalHeader/>
        <ModalBody>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='red' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

    </div>
  );
}

export default DashProfile