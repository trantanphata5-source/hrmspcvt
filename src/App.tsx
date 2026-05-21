import React, { useEffect, useState } from 'react';
import { fetchEmployees } from './services/googleSheets';
import { Employee } from './types';
import OverviewTab from './components/OverviewTab';
import DetailsTab from './components/DetailsTab';
import { Users, LayoutDashboard, Loader2 } from 'lucide-react';

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');

  useEffect(() => {
    fetchEmployees()
      .then(data => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching employees:', err);
        setError('Không thể tải dữ liệu từ Google Sheets. Vui lòng kiểm tra lại quyền truy cập hoặc kết nối mạng.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Đang tải dữ liệu nhân sự...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 max-w-md w-full text-center">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-xl font-bold">!</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Lỗi tải dữ liệu</h2>
          <p className="text-gray-600 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <Users size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 leading-tight">PCVT HR</h1>
                  <p className="text-xs text-gray-500 font-medium">Quản lý nhân sự</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <LayoutDashboard size={18} />
                  Tổng quan
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                    activeTab === 'details'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Users size={18} />
                  Chi tiết nhân sự
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' ? (
          <OverviewTab employees={employees} />
        ) : (
          <DetailsTab employees={employees} />
        )}
      </main>
    </div>
  );
}
