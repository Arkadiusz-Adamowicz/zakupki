import React from 'react';

const Confirm = ({ clearTask }) => {
  return (
    // <div className='hidden max-w-[350px] mt-2 mx-auto  rounded-xl text-center relative confirm'>
    <div className='hidden confirm'>
      <div className='flex justify-around p-2'>
        <button className='text-black bg-white py-2 px-5 rounded-md'>
          Nie
        </button>
        <button
          className='text-black bg-white py-2 px-5 rounded-md'
          onClick={clearTask}
        >
          Tak
        </button>
      </div>
    </div>
    // </div>
  );
};

export default Confirm;
