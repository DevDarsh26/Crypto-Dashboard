import React from 'react';

const SearchBar = ({ query, setQuery, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className='flex gap-2 mb-6 w-full sm:w-auto'>
      <input
        type="text"
        placeholder='Search Coin...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleKeyPress}
        className='px-4 py-2 border rounded-md flex-1 outline-none'
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
