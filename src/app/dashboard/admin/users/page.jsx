import { getAllUsers } from '@/lib/actions/users';
// import React from 'react';

const page =async () => {
    const res=await getAllUsers()
    const users=res?.data;
    console.log(users,"from the admin users pages")
    return (
        <div>
            users page from admin dashboard
        </div>
    );
};

export default page;