import { CheckShapeFill } from '@gravity-ui/icons';
import React from 'react';

const page = () => {
    return (
        <div className='sm:w-1/2 mx-auto  h-screen flex justify-center items-center flex-col shadow-2xl'>
           
            <div className="rounded-full h-10 w-10 border-2 bg-[#007c01] flex justify-center items-center mx-auto mt-10">
                <CheckShapeFill size={100}  className='w-2xl text-white border-none'/>

            </div>
             <h1 className='text-3xl font-bold text-white text-center m-5'>Thanks For join with us</h1>
            <p className='font-bold  text-center text-whiten '>Your Payment is Success full</p>

        </div>
    );
};

export default page;