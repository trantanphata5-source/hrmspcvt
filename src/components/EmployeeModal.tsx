import React from 'react';
import { Employee } from '../types';
import { X, Phone, Mail, MapPin, Building, GraduationCap, Users } from 'lucide-react';

interface EmployeeModalProps {
  employee: Employee | null;
  onClose: () => void;
}

export default function EmployeeModal({ employee, onClose }: EmployeeModalProps) {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">Chi tiết nhân sự</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                {employee.avatarUrl ? (
                  <img
                    src={employee.avatarUrl}
                    alt={employee.fullName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(employee.fullName) + '&background=random&size=200';
                    }}
                  />
                ) : (
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(employee.fullName)}&background=random&size=200`}
                    alt={employee.fullName}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-gray-900">{employee.fullName}</h3>
                <p className="text-blue-600 font-medium mt-1">{employee.role}</p>
                <p className="text-gray-500 text-sm mt-1">MSNV: {employee.msnv}</p>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2">Thông tin cá nhân</h4>
                
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-gray-400"><Users size={18} /></div>
                  <div>
                    <p className="text-sm text-gray-500">Giới tính / Ngày sinh</p>
                    <p className="font-medium text-gray-900">{employee.gender} • {employee.birthDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-gray-400"><Phone size={18} /></div>
                  <div>
                    <p className="text-sm text-gray-500">Điện thoại</p>
                    <p className="font-medium text-gray-900">{employee.phone || 'Chưa cập nhật'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-gray-400"><Mail size={18} /></div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{employee.email || 'Chưa cập nhật'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-gray-400"><MapPin size={18} /></div>
                  <div>
                    <p className="text-sm text-gray-500">Địa chỉ thường trú</p>
                    <p className="font-medium text-gray-900">{employee.address || 'Chưa cập nhật'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2">Công tác & Đào tạo</h4>
                
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-gray-400"><Building size={18} /></div>
                  <div>
                    <p className="text-sm text-gray-500">Phòng/Đội</p>
                    <p className="font-medium text-gray-900">{employee.department}</p>
                    {employee.team && <p className="text-sm text-gray-600 mt-0.5">{employee.team}</p>}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-gray-400"><MapPin size={18} /></div>
                  <div>
                    <p className="text-sm text-gray-500">Cơ sở</p>
                    <p className="font-medium text-gray-900">{employee.base}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-gray-400"><GraduationCap size={18} /></div>
                  <div>
                    <p className="text-sm text-gray-500">Trình độ đào tạo</p>
                    <p className="font-medium text-gray-900">{employee.educationLevel || 'Chưa cập nhật'}</p>
                    {employee.educationMajor && <p className="text-sm text-gray-600 mt-0.5">{employee.educationMajor}</p>}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-gray-400"><Users size={18} /></div>
                  <div>
                    <p className="text-sm text-gray-500">Đoàn thể</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {employee.partyMember && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Đảng viên
                        </span>
                      )}
                      {employee.unionMember && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Công đoàn
                        </span>
                      )}
                      {employee.youthUnionMember && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Đoàn thanh niên
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
