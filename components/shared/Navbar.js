import Link from 'next/link'
import React from 'react'
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js"
import { getServerSession } from "next-auth/next"
import NavLinks from './NavLinks'
import Image from 'next/image'

const Navbar = async () => {

  const session = await getServerSession(authOptions);
  const userID = session?.user?._id;
  
  return (
    <nav className='w-full bg-gray-900 border-b border-gray-800 relative'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-6 py-4'>
        
        {/* Logo Section */}
        <Link href='/' className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
          <img
            src='/algologo.png'
            alt='AlgoPath Logo'
            className='w-10 h-10 object-contain'
          />
          <span className='text-white text-xl font-bold tracking-wide'>
            AlgoPath
          </span>
        </Link>
        
        {/* Navigation Links */}
        <NavLinks user={userID} />

        {/* Auth Section */}
        <div className='flex items-center gap-4'>
          {userID ? (
            <Link 
              href='/profile'
              className='flex items-center gap-2 text-gray-300 hover:text-white transition-colors'
            >
              <img 
                src='/profile.png'
                alt='Profile'
                className='w-8 h-8 object-contain rounded-full'
              />
              <span className='hidden sm:block text-sm font-medium'>Profile</span>
            </Link>
          ) : (
            <>
              <Link 
                href='/login'
                className='text-gray-300 hover:text-white transition-colors px-4 py-2 text-sm font-medium'
              >
                Login
              </Link>
              <Link 
                href='/register'
                className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors'
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar