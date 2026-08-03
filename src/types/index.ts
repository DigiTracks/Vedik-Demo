export type Role = "master_admin" | "school_admin" | "teacher";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  section: string;
  rollNumber: string;
  admissionDate: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  address: string;
  parentName: string;
  parentPhone: string;
  feeStatus: "Paid" | "Pending" | "Partial" | "Overdue";
  status: "Active" | "Inactive" | "Graduated";
  avatar?: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  experience: string;
  salary: number;
  joinDate: string;
  status: "Active" | "On Leave" | "Inactive";
  classesAssigned: string[];
  avatar?: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  joinDate: string;
  status: "Active" | "On Leave" | "Inactive";
}

export interface Attendance {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: "Present" | "Absent" | "Late" | "Half Day";
  class: string;
  section: string;
}

export interface Class {
  id: string;
  name: string;
  sections: string[];
  classTeacher: string;
  totalStudents: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  class: string;
  teacher: string;
  type: "Theory" | "Practical" | "Lab";
}

export interface Exam {
  id: string;
  name: string;
  type: "Mid-Term" | "Final" | "Unit Test" | "Quiz";
  startDate: string;
  endDate: string;
  class: string;
  status: "Upcoming" | "Ongoing" | "Completed";
}

export interface Mark {
  id: string;
  studentId: string;
  studentName: string;
  examId: string;
  examName: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  class: string;
}

export interface Fee {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  feeType: string;
  amount: number;
  paidAmount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Partial" | "Overdue";
  paidDate?: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "Income" | "Expense";
  paymentMethod: string;
}

export interface Homework {
  id: string;
  subject: string;
  class: string;
  section: string;
  title: string;
  description: string;
  dueDate: string;
  assignedBy: string;
  status: "Pending" | "Submitted" | "Graded";
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  location: string;
}

export interface Transport {
  id: string;
  vehicleNumber: string;
  type: "Bus" | "Van" | "Auto";
  route: string;
  driver: string;
  capacity: number;
  assignedStudents: number;
  status: "Active" | "Maintenance" | "Inactive";
}

export interface Hostel {
  id: string;
  name: string;
  type: "Boys" | "Girls";
  warden: string;
  totalRooms: number;
  occupiedRooms: number;
  capacity: number;
  occupancy: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastRestocked: string;
}

export interface Message {
  id: string;
  title: string;
  content: string;
  sender: string;
  recipients: string;
  date: string;
  type: "Announcement" | "Circular" | "Notice";
  priority: "High" | "Medium" | "Low";
}

export interface Leave {
  id: string;
  staffId: string;
  staffName: string;
  type: "Sick" | "Casual" | "Earned" | "Maternity" | "Paternity";
  startDate: string;
  endDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  appliedOn: string;
}

export interface Payroll {
  id: string;
  staffId: string;
  staffName: string;
  position: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  month: string;
  year: number;
  status: "Paid" | "Pending" | "Processing";
}

export interface Certificate {
  id: string;
  type: "Transfer" | "Bonafide" | "Study" | "Character" | "Fee";
  studentName: string;
  studentId: string;
  issueDate: string;
  issuedBy: string;
}

export interface SchoolSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo?: string;
  academicYear: string;
  timezone: string;
}
