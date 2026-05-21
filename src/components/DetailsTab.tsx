import React, { useState, useMemo } from 'react';
import { Employee } from '../types';
import EmployeeModal from './EmployeeModal';
import { Search, Filter } from 'lucide-react';

interface DetailsTabProps {
  employees: Employee[];
}

export default function DetailsTab({ employees }: DetailsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [isPartyMember, setIsPartyMember] = useState(false);
  const [genderFilter, setGenderFilter] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const departments = useMemo(() => {
    const depts = new Set(employees.map(e => e.department).filter(Boolean));
    return Array.from(depts).sort();
  }, [employees]);

  const filteredAndSortedEmployees = useMemo(() => {
    let result = employees;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(e => 
        e.fullName.toLowerCase().includes(lowerSearch) || 
        e.msnv.toLowerCase().includes(lowerSearch)
      );
    }

    if (selectedDept) {
      result = result.filter(e => e.department === selectedDept);
    }

    if (isPartyMember) {
      result = result.filter(e => e.partyMember.trim() !== '');
    }

    if (genderFilter) {
      result = result.filter(e => e.gender.toLowerCase() === genderFilter.toLowerCase());
    }

    // Sort by: Mã Phòng Đội -> Mã chức vụ -> Cơ sở
    result.sort((a, b) => {
      if (a.deptCode !== b.deptCode) return a.deptCode.localeCompare(b.deptCode);
      if (a.roleCode !== b.roleCode) return a.roleCode.localeCompare(b.roleCode);
      return a.base.localeCompare(b.base);
    });

    return result;
  }, [employees, searchTerm, selectedDept, isPartyMember, genderFilter]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc MSNV..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="">Tất cả Phòng/Đội</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">Giới tính (Tất cả)</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={isPartyMember}
              onChange={(e) => setIsPartyMember(e.target.checked)}
            />
            <span className="text-sm text-gray-700">Đảng viên</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6">
        {filteredAndSortedEmployees.map((employee) => (
          <div
            key={employee.msnv}
            onClick={() => setSelectedEmployee(employee)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
              {employee.avatarUrl ? (
                <img
                  src={employee.avatarUrl}
                  alt={employee.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(employee.fullName) + '&background=random&size=200';
                  }}
                />
              ) : (
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(employee.fullName)}&background=random&size=200`}
                  alt={employee.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                {employee.partyMember && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    Đảng
                  </span>
                )}
              </div>
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate" title={employee.fullName}>
                {employee.fullName}
              </h3>
              <p className="text-xs sm:text-sm text-blue-600 font-medium truncate mt-0.5" title={employee.role}>
                {employee.role}
              </p>
              <div className="mt-1.5 sm:mt-2 space-y-0.5 sm:space-y-1">
                <p className="text-[10px] sm:text-xs text-gray-500 truncate" title={employee.department}>
                  {employee.department}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400 truncate">
                  MSNV: {employee.msnv} • {employee.base}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedEmployees.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">Không tìm thấy nhân sự nào phù hợp với điều kiện lọc.</p>
        </div>
      )}

      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}
