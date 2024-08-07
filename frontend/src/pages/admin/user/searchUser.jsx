import React from 'react'

const searchUser = ({ onSearch  }) => {
    const handleChange = (evt) => {
        onSearch(evt.target.value);
    };
    return (
        <div className="flex w-full">
            <input
                type="text"
                placeholder="Search users.."
                className="bg-[#f3f4f5] px-4 py-2 mr-6 w-full focus:outline-none focus:border border mb-4"
                onChange={handleChange}
            />
            
        </div>
    )
}

export default searchUser