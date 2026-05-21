import React, { useMemo } from 'react';
import { Employee } from '../types';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, Building2, GraduationCap } from 'lucide-react';

interface OverviewTabProps {
  employees: Employee[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export default function OverviewTab({ employees }: OverviewTabProps) {
  const stats = useMemo(() => {
    const total = employees.length;
    let male = 0;
    let female = 0;
    let partyMembers = 0;
    const deptCount: Record<string, number> = {};
    const eduCount: Record<string, number> = {};

    employees.forEach(emp => {
      if (emp.gender.toLowerCase() === 'nam') male++;
      else if (emp.gender.toLowerCase() === 'nữ') female++;

      if (emp.partyMember.trim() !== '') partyMembers++;

      const dept = emp.department || 'Khác';
      deptCount[dept] = (deptCount[dept] || 0) + 1;

      const edu = emp.educationLevel || 'Khác';
      eduCount[edu] = (eduCount[edu] || 0) + 1;
    });

    const genderData = [
      { name: 'Nam', value: male },
      { name: 'Nữ', value: female }
    ];

    const deptData = Object.entries(deptCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const eduData = Object.entries(eduCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return { total, partyMembers, genderData, deptData, eduData };
  }, [employees]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Tổng nhân sự</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-lg">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Đảng viên</p>
            <p className="text-2xl font-bold text-gray-900">{stats.partyMembers}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Phòng/Đội</p>
            <p className="text-2xl font-bold text-gray-900">{stats.deptData.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Trình độ đào tạo</p>
            <p className="text-2xl font-bold text-gray-900">{stats.eduData.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tỉ lệ Giới tính</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {stats.genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Nhân sự theo Phòng/Đội</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.deptData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
