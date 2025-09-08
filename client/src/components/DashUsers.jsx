import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

const DashUsers = () => {
  const {currentUser} = useSelector((state)=>state.user);
  const [users, setUsers] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState('')

  useEffect(()=>{
    const fetchUsers = async()=>{
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if(res.ok){
          setUsers(data.users)
          if(data.users.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if(currentUser.rest.isAdmin){
      fetchUsers();
    }
  },[currentUser.rest._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `/api/user/getusers?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteUser = ()=>{};
//   const handleDeleteUser = async()=>{
//     setShowModal(false);
//     try {
//       const res = await fetch(
//         `/api/user/deleteuser/${userIdToDelete}/${currentUser.rest._id}`,
//         {
//           method: 'DELETE',
//         }
//       );
//       const data = await res.json();
//       if (!res.ok) {
//         console.log(data.message);
//       } else {
//         setUserPosts((prev) =>
//           prev.filter((post) => post._id !== postIdToDelete)
//         );
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.rest.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <TableHead>
              <TableRow>
                <TableHeadCell>Date Created</TableHeadCell>
                <TableHeadCell>User Image</TableHeadCell>
                <TableHeadCell>Username</TableHeadCell>
                <TableHeadCell>Username</TableHeadCell>
                <TableHeadCell>Admin</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableRow>
            </TableHead>
            
            <TableBody className='divide-y'>
              {users.map((user)=>(
                  <TableRow key={user._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                      />
                    </TableCell>
                    <TableCell>
                      {user.username}
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    <TableCell>{user.isAdmin ?( <FaCheck color='green'/>): (<FaTimes color='red'/>)}</TableCell>
                    <TableCell>
                      <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(post._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                      >
                      Delete
                      </span>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
          {
            showMore && (
              <div className="flex justify-center text-teal-500 text-sm py-7">
                <button onClick={handleShowMore}>show more</button>
              </div>
            )
          }
        </>
      ) : (
        <p>You have no users yet</p>
      )}
            <Modal show={showModal} size='md' popup={true} onClose={() => setShowModal(false)}>
              <ModalHeader/>
              <ModalBody>
                <div className='text-center'>
                  <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                  <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                    Are you sure you want to delete this user?
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
  )
}

export default DashUsers