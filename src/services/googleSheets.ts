import Papa from 'papaparse';
import { Employee } from '../types';

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1yq0gdP808kg0Pw6rcVcxB_LyEUccm1Q_itFqwnQrmXc/export?format=csv&gid=0';

export async function fetchEmployees(): Promise<Employee[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(SHEET_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as any[];
        const employees: Employee[] = data.map((row) => ({
          stt: row['Stt'] || '',
          msnv: row['MSNV'] || '',
          avatarUrl: row['Link ảnh'] || '',
          fullName: row['Họ và tên'] || '',
          birthDate: row['Ngày sinh'] || '',
          phone: row['Điện thoại'] || '',
          email: row['Email'] || '',
          gender: row['Giới tính'] || '',
          deptCode: row['Mã Phòng Đội'] || '',
          deptShort: row['Phòng Đội viết tắt'] || '',
          department: row['Phòng Đội'] || '',
          team: row['Phòng ban/Tổ nhóm'] || '',
          roleCode: row['Mã chức vụ'] || '',
          role: row['Chức vụ'] || '',
          educationLevel: row['Trình độ đào tạo'] || '',
          educationMajor: row['Ngành nghề đào tạo'] || '',
          partyBranch: row['Sinh hoạt tại chi bộ'] || '',
          partyMember: row['Đảng'] || '',
          unionMember: row['Công đoàn'] || '',
          youthUnionMember: row['Đoàn'] || '',
          base: row['Cơ sở'] || '',
          oldBase: row['Cơ sở cũ'] || '',
          address: row['Địa chỉ thường trú'] || '',
        }));
        resolve(employees);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}
