import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversation from '../../hooks/useGetConversations'
import toast from 'react-hot-toast';

const SearchInput = () => {

  const [search, setSearch] = useState('')
  const { selectedConversation, setSelectedConversation } = useConversation();

  const { conversations } = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(!search) return

    if(search.length<3){
      return toast.error('Search query must be at least 3 characters long')
    }

    const conversation = conversations.find(c => c.fullName.toLowerCase().includes(search.toLowerCase()))

    if(conversation){
      setSelectedConversation(conversation)
      setSearch('')
    }
    else{
      toast.error('No conversation found')
    
    }

  }

  return (
    <form onSubmit={handleSubmit} className='flex item gap-2'>

    <input type="text" className="input input-bordered rounded-full" placeholder="Search.." 
     value={search} 
     onChange={(e) => setSearch(e.target.value)}
    />
    <button type='submit' className='btn btn-circle bg-sky-500 text-white'><IoSearchSharp/></button>
    </form>
  )
}

export default SearchInput