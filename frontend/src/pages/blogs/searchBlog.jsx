import React from 'react';

const SearchBlog = ({ search, onSearchChange }) => {
    return (
        <div className="flex w-full">
            <input
                type="text"
                value={search}
                onChange={onSearchChange}
                placeholder="Search name or category.."
                className="bg-[#f3f4f5] px-4 py-2 mr-6 w-full focus:outline-none border"
            />
        </div>
    );
};

export default SearchBlog;
