import React from 'react'
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className='flex item gap-2'>

    <input type="text" className="input input-bordered rounded-full" placeholder="Search.." />
    <button type='submit' className='btn btn-circle bg-sky-500 text-white'><IoSearchSharp/></button>
    </form>
  )
}

export default SearchInput