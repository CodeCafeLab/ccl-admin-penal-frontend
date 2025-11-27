'use client';

import React from 'react';
import Sidebar from './Sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  adminName?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, adminName = 'Admin' }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar adminName={adminName} />
      <main className="flex-1 overflow-y-auto ml-64">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 