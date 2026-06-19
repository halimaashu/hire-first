import { DashboardDrawer } from '@/components/dashboard/DashboardDroawer';
import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex ">
      <DashboardDrawer/>
     <div className="flex-1"> {children}</div>
    </div>
  );
};

export default DashboardLayout;