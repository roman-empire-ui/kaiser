import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import useConvo from "../../zustand/useConvo";
import useGetConvo from "../../hooks/useGetConvo";
import toast from "react-hot-toast";
const SearchInput = () => {
	const [search , setSearch] = useState('')
	const {setSelectedConversation} = useConvo() 
	const {convo} = useGetConvo()

	const hanSubmit = (e) => {
		e.preventDefault()
		if(!search) return 
		if(search.length < 3) return toast.error('search must be at least 3 characters')
		const searching = convo.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))
		
		if(searching) {
			setSelectedConversation(searching)
			setSearch('')

		} else toast.error('No user found')
	}
  return (
    <form className="flex items-center gap-2" onClick={hanSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
		value={search}
		onChange={(e)=> setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <FcSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
