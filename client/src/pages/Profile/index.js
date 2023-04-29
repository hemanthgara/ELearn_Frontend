import React from 'react'
import { useSelector } from 'react-redux';

import { FaUserCheck, FaRegUser } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { BsGenderTrans } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';
import { AiOutlineContacts } from 'react-icons/ai';

import "../../style/helpdesk.css";


const Profile = () => {

  const {user} = useSelector((state) => state.authReducer);

  return (
    <>
      <div className='p-5' style={{ minHeight: '91vh', marginTop: '43px' }}>

        <div className="container rounded bg-white pt-1">
          <div className="row">
            <div className="col-md-12 border-right">
              <div className="d-flex flex-column align-items-center text-center pb-5">
                <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                <span className="fs-4">{user.first_name + ' ' + user.last_name}</span>
                <span className="text-primary opacity-75 fw-bold fs-5">{user.email}</span><span> </span></div>
            </div>

            <div className="profile col-md-12">
              <h3 className="px-5 text-secondary fw-bold">Profile Settings</h3>

              <div className=" py-5">

                <div className="d-flex justify-content-center align-items-end fs-3 mb-4">
                  <FaUserCheck className='text-primary' />
                  <div className='d-flex flex-column  w-75 mx-3'>
                    <span className='opacity-50 my-2 fs-5'>Name</span>
                    <div className='border-bottom'>{user.first_name}</div>
                  </div>
                </div>

                <div className="d-flex justify-content-center align-items-end fs-3 mb-4">
                  <FaRegUser className='text-primary' />
                  <div className='d-flex flex-column  w-75 mx-3'>
                    <span className='opacity-50 my-2 fs-5'>Surname</span>
                    <div className='border-bottom'>{user.last_name}</div>
                  </div>
                </div>

                <div className="d-flex justify-content-center align-items-end fs-3 mb-4">
                  <FiMail className='text-primary' />
                  <div className='d-flex flex-column  w-75 mx-3'>
                    <span className='opacity-50 my-2 fs-5'>Email ID</span>
                    <div className='border-bottom'>{user.email}</div>
                  </div>
                </div>

                {user.gender && <div className="d-flex justify-content-center align-items-end fs-3 mb-4">
                  <BsGenderTrans className='text-primary' />
                  <div className='d-flex flex-column  w-75 mx-3'>
                    <span className='opacity-50 my-2 fs-5'>Gender</span>
                    <div className='border-bottom'>{user.gender}</div>
                  </div>
                </div>}

                <div className="d-flex justify-content-center align-items-end fs-3 mb-4">
                  <FiLogIn className='text-primary' />
                  <div className='d-flex flex-column  w-75 mx-3'>
                    <span className='opacity-50 my-2 fs-5'>Login Id</span>
                    <div className='border-bottom'>{user.loginId}</div>
                  </div>
                </div>


                {user.contact && <div className="d-flex justify-content-center align-items-end fs-3 mb-4">
                  <AiOutlineContacts className='text-primary' />
                  <div className='d-flex flex-column  w-75 mx-3'>
                    <span className='opacity-50 my-2 fs-5'>Contact</span>
                    <div className='border-bottom'>{user.contact}</div>
                  </div>
                </div>}

              </div>



            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Profile