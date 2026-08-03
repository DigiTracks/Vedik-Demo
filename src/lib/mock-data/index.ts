import {
  Student,
  Teacher,
  Staff,
  Attendance,
  Class,
  Subject,
  Exam,
  Mark,
  Fee,
  Transaction,
  Homework,
  Book,
  Transport,
  Hostel,
  InventoryItem,
  Message,
  Leave,
  Payroll,
  Certificate,
  SchoolSettings,
} from "@/types";

export const schoolSettings: SchoolSettings = {
  name: "VEDIK School",
  address: "123 Education Lane, Knowledge City, India",
  phone: "+91 98765 43210",
  email: "admin@vedikschool.edu.in",
  website: "www.vedikschool.edu.in",
  academicYear: "2026-2026",
  timezone: "Asia/Kolkata",
};

export const students: Student[] = [
  { id: "S001", name: "Aarav Patel", email: "aarav@vedik.edu.in", phone: "9876543210", class: "Class 10", section: "A", rollNumber: "01", admissionDate: "2024-04-15", dateOfBirth: "2010-05-20", gender: "Male", address: "45 MG Road, Mumbai", parentName: "Rajesh Patel", parentPhone: "9876543211", feeStatus: "Paid", status: "Active" },
  { id: "S002", name: "Diya Sharma", email: "diya@vedik.edu.in", phone: "9876543212", class: "Class 10", section: "A", rollNumber: "02", admissionDate: "2024-04-15", dateOfBirth: "2010-08-12", gender: "Female", address: "78 Park Street, Delhi", parentName: "Vikram Sharma", parentPhone: "9876543213", feeStatus: "Pending", status: "Active" },
  { id: "S003", name: "Rohan Gupta", email: "rohan@vedik.edu.in", phone: "9876543214", class: "Class 10", section: "B", rollNumber: "01", admissionDate: "2024-04-15", dateOfBirth: "2010-03-25", gender: "Male", address: "12 Nehru Nagar, Bangalore", parentName: "Anil Gupta", parentPhone: "9876543215", feeStatus: "Paid", status: "Active" },
  { id: "S004", name: "Ananya Singh", email: "ananya@vedik.edu.in", phone: "9876543216", class: "Class 9", section: "A", rollNumber: "05", admissionDate: "2023-04-10", dateOfBirth: "2011-01-30", gender: "Female", address: "34 Gandhi Road, Chennai", parentName: "Suresh Singh", parentPhone: "9876543217", feeStatus: "Partial", status: "Active" },
  { id: "S005", name: "Vivaan Mehta", email: "vivaan@vedik.edu.in", phone: "9876543218", class: "Class 9", section: "A", rollNumber: "06", admissionDate: "2023-04-10", dateOfBirth: "2011-07-14", gender: "Male", address: "56 Lake View, Pune", parentName: "Kiran Mehta", parentPhone: "9876543219", feeStatus: "Paid", status: "Active" },
  { id: "S006", name: "Ishita Verma", email: "ishita@vedik.edu.in", phone: "9876543220", class: "Class 9", section: "B", rollNumber: "03", admissionDate: "2023-04-10", dateOfBirth: "2011-11-05", gender: "Female", address: "89 Civil Lines, Jaipur", parentName: "Manoj Verma", parentPhone: "9876543221", feeStatus: "Paid", status: "Active" },
  { id: "S007", name: "Aditya Kumar", email: "aditya@vedik.edu.in", phone: "9876543222", class: "Class 8", section: "A", rollNumber: "10", admissionDate: "2022-04-12", dateOfBirth: "2012-02-18", gender: "Male", address: "23 Station Road, Hyderabad", parentName: "Pradeep Kumar", parentPhone: "9876543223", feeStatus: "Overdue", status: "Active" },
  { id: "S008", name: "Sneha Reddy", email: "sneha@vedik.edu.in", phone: "9876543224", class: "Class 8", section: "A", rollNumber: "11", admissionDate: "2022-04-12", dateOfBirth: "2012-06-22", gender: "Female", address: "67 Jubilee Hills, Hyderabad", parentName: "Ramesh Reddy", parentPhone: "9876543225", feeStatus: "Paid", status: "Active" },
  { id: "S009", name: "Kabir Joshi", email: "kabir@vedik.edu.in", phone: "9876543226", class: "Class 7", section: "A", rollNumber: "15", admissionDate: "2021-04-08", dateOfBirth: "2013-09-10", gender: "Male", address: "45 Baner Road, Pune", parentName: "Deepak Joshi", parentPhone: "9876543227", feeStatus: "Paid", status: "Active" },
  { id: "S010", name: "Myra Nair", email: "myra@vedik.edu.in", phone: "9876543228", class: "Class 7", section: "B", rollNumber: "08", admissionDate: "2021-04-08", dateOfBirth: "2013-04-03", gender: "Female", address: "12 Marine Drive, Kochi", parentName: "Sunil Nair", parentPhone: "9876543229", feeStatus: "Pending", status: "Active" },
  { id: "S011", name: "Arjun Das", email: "arjun@vedik.edu.in", phone: "9876543230", class: "Class 6", section: "A", rollNumber: "20", admissionDate: "2020-04-05", dateOfBirth: "2014-12-25", gender: "Male", address: "78 Salt Lake, Kolkata", parentName: "Bijoy Das", parentPhone: "9876543231", feeStatus: "Paid", status: "Active" },
  { id: "S012", name: "Tara Iyer", email: "tara@vedik.edu.in", phone: "9876543232", class: "Class 6", section: "A", rollNumber: "21", admissionDate: "2020-04-05", dateOfBirth: "2014-07-19", gender: "Female", address: "34 Anna Nagar, Chennai", parentName: "Karthik Iyer", parentPhone: "9876543233", feeStatus: "Paid", status: "Active" },
  { id: "S013", name: "Reyansh Joshi", email: "reyansh@vedik.edu.in", phone: "9876543234", class: "Class 10", section: "B", rollNumber: "05", admissionDate: "2024-04-15", dateOfBirth: "2010-10-08", gender: "Male", address: "90 CP, New Delhi", parentName: "Ajay Joshi", parentPhone: "9876543235", feeStatus: "Paid", status: "Active" },
  { id: "S014", name: "Aanya Desai", email: "aanya@vedik.edu.in", phone: "9876543236", class: "Class 9", section: "A", rollNumber: "07", admissionDate: "2023-04-10", dateOfBirth: "2011-05-15", gender: "Female", address: "56 FC Road, Pune", parentName: "Hitesh Desai", parentPhone: "9876543237", feeStatus: "Pending", status: "Active" },
  { id: "S015", name: "Vihaan Malhotra", email: "vihaan@vedik.edu.in", phone: "9876543238", class: "Class 8", section: "B", rollNumber: "12", admissionDate: "2022-04-12", dateOfBirth: "2012-08-30", gender: "Male", address: "78 Lajpat Nagar, Delhi", parentName: "Ravi Malhotra", parentPhone: "9876543239", feeStatus: "Paid", status: "Active" },
];

export const teachers: Teacher[] = [
  { id: "T001", name: "Mrs. Priya Sharma", email: "priya@vedik.edu.in", phone: "9876500001", subject: "Mathematics", qualification: "M.Sc. Mathematics, B.Ed.", experience: "12 years", salary: 55000, joinDate: "2013-06-15", status: "Active", classesAssigned: ["Class 10", "Class 9"] },
  { id: "T002", name: "Mr. Amit Verma", email: "amit@vedik.edu.in", phone: "9876500002", subject: "Physics", qualification: "M.Sc. Physics, B.Ed.", experience: "8 years", salary: 50000, joinDate: "2017-04-01", status: "Active", classesAssigned: ["Class 10", "Class 11"] },
  { id: "T003", name: "Mrs. Neha Gupta", email: "neha@vedik.edu.in", phone: "9876500003", subject: "English", qualification: "M.A. English, B.Ed.", experience: "10 years", salary: 48000, joinDate: "2015-07-20", status: "Active", classesAssigned: ["Class 9", "Class 8"] },
  { id: "T004", name: "Mr. Rahul Deshmukh", email: "rahul@vedik.edu.in", phone: "9876500004", subject: "Chemistry", qualification: "M.Sc. Chemistry, B.Ed.", experience: "6 years", salary: 45000, joinDate: "2019-06-01", status: "On Leave", classesAssigned: ["Class 10", "Class 9"] },
  { id: "T005", name: "Mrs. Sunita Patil", email: "sunita@vedik.edu.in", phone: "9876500005", subject: "Biology", qualification: "M.Sc. Biology, B.Ed.", experience: "15 years", salary: 58000, joinDate: "2010-04-15", status: "Active", classesAssigned: ["Class 10", "Class 8"] },
  { id: "T006", name: "Mr. Deepak Joshi", email: "deepak@vedik.edu.in", phone: "9876500006", subject: "History", qualification: "M.A. History, B.Ed.", experience: "9 years", salary: 46000, joinDate: "2016-07-10", status: "Active", classesAssigned: ["Class 9", "Class 7"] },
  { id: "T007", name: "Mrs. Kavita Singh", email: "kavita@vedik.edu.in", phone: "9876500007", subject: "Computer Science", qualification: "MCA, B.Ed.", experience: "7 years", salary: 52000, joinDate: "2018-04-01", status: "Active", classesAssigned: ["Class 10", "Class 9", "Class 8"] },
  { id: "T008", name: "Mr. Suresh Kumar", email: "suresh@vedik.edu.in", phone: "9876500008", subject: "Physical Education", qualification: "M.P.Ed.", experience: "5 years", salary: 40000, joinDate: "2020-06-15", status: "Active", classesAssigned: ["All Classes"] },
];

export const staff: Staff[] = [
  { id: "ST001", name: "Ramesh Yadav", email: "ramesh@vedik.edu.in", phone: "9876510001", position: "Accountant", department: "Finance", salary: 35000, joinDate: "2015-03-01", status: "Active" },
  { id: "ST002", name: "Suresh Pai", email: "suresh.p@vedik.edu.in", phone: "9876510002", position: "Librarian", department: "Library", salary: 32000, joinDate: "2016-06-15", status: "Active" },
  { id: "ST003", name: "Ganesh Khot", email: "ganesh@vedik.edu.in", phone: "9876510003", position: "Lab Assistant", department: "Science Lab", salary: 28000, joinDate: "2018-04-01", status: "Active" },
  { id: "ST004", name: "Lakshmi Bhat", email: "lakshmi@vedik.edu.in", phone: "9876510004", position: "Receptionist", department: "Admin", salary: 25000, joinDate: "2019-07-10", status: "Active" },
  { id: "ST005", name: "Vinod Shetty", email: "vinod@vedik.edu.in", phone: "9876510005", position: "Driver", department: "Transport", salary: 22000, joinDate: "2017-01-15", status: "Active" },
  { id: "ST006", name: "Anita Kulkarni", email: "anita@vedik.edu.in", phone: "9876510006", position: "Clerk", department: "Admin", salary: 24000, joinDate: "2020-08-01", status: "On Leave" },
  { id: "ST007", name: "Mohammed Ali", email: "mohammed@vedik.edu.in", phone: "9876510007", position: "Peon", department: "Admin", salary: 18000, joinDate: "2014-11-01", status: "Active" },
  { id: "ST008", name: "Prakash Nair", email: "prakash@vedik.edu.in", phone: "9876510008", position: "Security Guard", department: "Security", salary: 20000, joinDate: "2016-02-15", status: "Active" },
];

export const classes: Class[] = [
  { id: "C001", name: "Class 6", sections: ["A", "B", "C"], classTeacher: "Mr. Deepak Joshi", totalStudents: 120 },
  { id: "C002", name: "Class 7", sections: ["A", "B"], classTeacher: "Mrs. Kavita Singh", totalStudents: 85 },
  { id: "C003", name: "Class 8", sections: ["A", "B"], classTeacher: "Mrs. Neha Gupta", totalStudents: 80 },
  { id: "C004", name: "Class 9", sections: ["A", "B"], classTeacher: "Mrs. Priya Sharma", totalStudents: 75 },
  { id: "C005", name: "Class 10", sections: ["A", "B"], classTeacher: "Mr. Amit Verma", totalStudents: 70 },
];

export const subjects: Subject[] = [
  { id: "SUB001", name: "Mathematics", code: "MATH10", class: "Class 10", teacher: "Mrs. Priya Sharma", type: "Theory" },
  { id: "SUB002", name: "Physics", code: "PHY10", class: "Class 10", teacher: "Mr. Amit Verma", type: "Theory" },
  { id: "SUB003", name: "Chemistry", code: "CHM10", class: "Class 10", teacher: "Mr. Rahul Deshmukh", type: "Theory" },
  { id: "SUB004", name: "Biology", code: "BIO10", class: "Class 10", teacher: "Mrs. Sunita Patil", type: "Theory" },
  { id: "SUB005", name: "English", code: "ENG10", class: "Class 10", teacher: "Mrs. Neha Gupta", type: "Theory" },
  { id: "SUB006", name: "Hindi", code: "HIN10", class: "Class 10", teacher: "Mrs. Kavita Singh", type: "Theory" },
  { id: "SUB007", name: "Computer Science", code: "CS10", class: "Class 10", teacher: "Mrs. Kavita Singh", type: "Practical" },
  { id: "SUB008", name: "Physical Education", code: "PE10", class: "Class 10", teacher: "Mr. Suresh Kumar", type: "Practical" },
  { id: "SUB009", name: "Mathematics", code: "MATH9", class: "Class 9", teacher: "Mrs. Priya Sharma", type: "Theory" },
  { id: "SUB010", name: "Science", code: "SCI9", class: "Class 9", teacher: "Mr. Amit Verma", type: "Theory" },
  { id: "SUB011", name: "English", code: "ENG9", class: "Class 9", teacher: "Mrs. Neha Gupta", type: "Theory" },
  { id: "SUB012", name: "Social Studies", code: "SST9", class: "Class 9", teacher: "Mr. Deepak Joshi", type: "Theory" },
  { id: "SUB013", name: "Mathematics", code: "MATH8", class: "Class 8", teacher: "Mrs. Priya Sharma", type: "Theory" },
  { id: "SUB014", name: "Science", code: "SCI8", class: "Class 8", teacher: "Mrs. Sunita Patil", type: "Theory" },
  { id: "SUB015", name: "English", code: "ENG8", class: "Class 8", teacher: "Mrs. Neha Gupta", type: "Theory" },
];

export const exams: Exam[] = [
  { id: "E001", name: "Mid-Term Examination", type: "Mid-Term", startDate: "2026-09-15", endDate: "2026-09-25", class: "All Classes", status: "Upcoming" },
  { id: "E002", name: "Unit Test 1", type: "Unit Test", startDate: "2026-07-28", endDate: "2026-07-30", class: "All Classes", status: "Ongoing" },
  { id: "E003", name: "Final Examination", type: "Final", startDate: "2026-12-01", endDate: "2026-12-15", class: "All Classes", status: "Upcoming" },
  { id: "E004", name: "Unit Test 2", type: "Unit Test", startDate: "2026-10-20", endDate: "2026-10-22", class: "Class 9, 10", status: "Upcoming" },
  { id: "E005", name: "Half Yearly Exam", type: "Mid-Term", startDate: "2026-06-10", endDate: "2026-06-20", class: "All Classes", status: "Completed" },
];

export const marks: Mark[] = [
  { id: "MK001", studentId: "S001", studentName: "Aarav Patel", examId: "E005", examName: "Half Yearly Exam", subject: "Mathematics", marksObtained: 85, totalMarks: 100, grade: "A1", class: "Class 10" },
  { id: "MK002", studentId: "S001", studentName: "Aarav Patel", examId: "E005", examName: "Half Yearly Exam", subject: "Physics", marksObtained: 78, totalMarks: 100, grade: "A2", class: "Class 10" },
  { id: "MK003", studentId: "S001", studentName: "Aarav Patel", examId: "E005", examName: "Half Yearly Exam", subject: "Chemistry", marksObtained: 82, totalMarks: 100, grade: "A1", class: "Class 10" },
  { id: "MK004", studentId: "S002", studentName: "Diya Sharma", examId: "E005", examName: "Half Yearly Exam", subject: "Mathematics", marksObtained: 92, totalMarks: 100, grade: "A1", class: "Class 10" },
  { id: "MK005", studentId: "S002", studentName: "Diya Sharma", examId: "E005", examName: "Half Yearly Exam", subject: "Physics", marksObtained: 88, totalMarks: 100, grade: "A1", class: "Class 10" },
  { id: "MK006", studentId: "S002", studentName: "Diya Sharma", examId: "E005", examName: "Half Yearly Exam", subject: "Chemistry", marksObtained: 75, totalMarks: 100, grade: "A2", class: "Class 10" },
  { id: "MK007", studentId: "S003", studentName: "Rohan Gupta", examId: "E005", examName: "Half Yearly Exam", subject: "Mathematics", marksObtained: 68, totalMarks: 100, grade: "B1", class: "Class 10" },
  { id: "MK008", studentId: "S003", studentName: "Rohan Gupta", examId: "E005", examName: "Half Yearly Exam", subject: "Physics", marksObtained: 72, totalMarks: 100, grade: "A2", class: "Class 10" },
  { id: "MK009", studentId: "S004", studentName: "Ananya Singh", examId: "E005", examName: "Half Yearly Exam", subject: "Mathematics", marksObtained: 95, totalMarks: 100, grade: "A1", class: "Class 9" },
  { id: "MK010", studentId: "S004", studentName: "Ananya Singh", examId: "E005", examName: "Half Yearly Exam", subject: "Science", marksObtained: 89, totalMarks: 100, grade: "A1", class: "Class 9" },
];

export const fees: Fee[] = [
  { id: "F001", studentId: "S001", studentName: "Aarav Patel", class: "Class 10", feeType: "Tuition Fee", amount: 45000, paidAmount: 45000, dueDate: "2026-06-30", status: "Paid", paidDate: "2026-06-15" },
  { id: "F002", studentId: "S002", studentName: "Diya Sharma", class: "Class 10", feeType: "Tuition Fee", amount: 45000, paidAmount: 22500, dueDate: "2026-06-30", status: "Partial" },
  { id: "F003", studentId: "S003", studentName: "Rohan Gupta", class: "Class 10", feeType: "Tuition Fee", amount: 45000, paidAmount: 45000, dueDate: "2026-06-30", status: "Paid", paidDate: "2026-06-10" },
  { id: "F004", studentId: "S004", studentName: "Ananya Singh", class: "Class 9", feeType: "Tuition Fee", amount: 40000, paidAmount: 20000, dueDate: "2026-06-30", status: "Partial" },
  { id: "F005", studentId: "S005", studentName: "Vivaan Mehta", class: "Class 9", feeType: "Tuition Fee", amount: 40000, paidAmount: 40000, dueDate: "2026-06-30", status: "Paid", paidDate: "2026-06-05" },
  { id: "F006", studentId: "S007", studentName: "Aditya Kumar", class: "Class 8", feeType: "Tuition Fee", amount: 35000, paidAmount: 0, dueDate: "2026-05-31", status: "Overdue" },
  { id: "F007", studentId: "S001", studentName: "Aarav Patel", class: "Class 10", feeType: "Lab Fee", amount: 5000, paidAmount: 5000, dueDate: "2026-06-30", status: "Paid", paidDate: "2026-06-15" },
  { id: "F008", studentId: "S002", studentName: "Diya Sharma", class: "Class 10", feeType: "Lab Fee", amount: 5000, paidAmount: 0, dueDate: "2026-06-30", status: "Pending" },
  { id: "F009", studentId: "S006", studentName: "Ishita Verma", class: "Class 9", feeType: "Tuition Fee", amount: 40000, paidAmount: 40000, dueDate: "2026-06-30", status: "Paid", paidDate: "2026-06-12" },
  { id: "F010", studentId: "S008", studentName: "Sneha Reddy", class: "Class 8", feeType: "Tuition Fee", amount: 35000, paidAmount: 35000, dueDate: "2026-06-30", status: "Paid", paidDate: "2026-06-08" },
];

export const transactions: Transaction[] = [
  { id: "TX001", date: "2026-07-01", description: "Tuition Fee Collection - June", category: "Fees", amount: 850000, type: "Income", paymentMethod: "Bank Transfer" },
  { id: "TX002", date: "2026-07-05", description: "Teacher Salaries - June", category: "Salary", amount: 394000, type: "Expense", paymentMethod: "Bank Transfer" },
  { id: "TX003", date: "2026-07-05", description: "Staff Salaries - June", category: "Salary", amount: 204000, type: "Expense", paymentMethod: "Bank Transfer" },
  { id: "TX004", date: "2026-07-10", description: "Electricity Bill", category: "Utilities", amount: 45000, type: "Expense", paymentMethod: "Online" },
  { id: "TX005", date: "2026-07-12", description: "Lab Equipment Purchase", category: "Equipment", amount: 120000, type: "Expense", paymentMethod: "Cheque" },
  { id: "TX006", date: "2026-07-15", description: "Donation from Alumni", category: "Donation", amount: 200000, type: "Income", paymentMethod: "Bank Transfer" },
  { id: "TX007", date: "2026-07-18", description: "Sports Equipment", category: "Equipment", amount: 35000, type: "Expense", paymentMethod: "Online" },
  { id: "TX008", date: "2026-07-20", description: "Library Book Purchase", category: "Books", amount: 28000, type: "Expense", paymentMethod: "Online" },
  { id: "TX009", date: "2026-07-22", description: "Bus Fee Collection", category: "Transport", amount: 150000, type: "Income", paymentMethod: "Cash" },
  { id: "TX010", date: "2026-07-25", description: "Canteen Supplies", category: "Maintenance", amount: 18000, type: "Expense", paymentMethod: "Cash" },
];

export const homework: Homework[] = [
  { id: "HW001", subject: "Mathematics", class: "Class 10", section: "A", title: "Quadratic Equations Worksheet", description: "Complete exercise 4.3 from NCERT textbook. Solve all problems.", dueDate: "2026-07-30", assignedBy: "Mrs. Priya Sharma", status: "Pending" },
  { id: "HW002", subject: "Physics", class: "Class 10", section: "A", title: "Newton's Laws Lab Report", description: "Write a lab report on the experiment conducted in class.", dueDate: "2026-07-29", assignedBy: "Mr. Amit Verma", status: "Pending" },
  { id: "HW003", subject: "English", class: "Class 9", section: "A", title: "Essay Writing", description: "Write a 500-word essay on 'Environmental Pollution'.", dueDate: "2026-07-28", assignedBy: "Mrs. Neha Gupta", status: "Submitted" },
  { id: "HW004", subject: "Chemistry", class: "Class 10", section: "B", title: "Periodic Table Revision", description: "Memorize first 30 elements and their properties.", dueDate: "2026-08-01", assignedBy: "Mr. Rahul Deshmukh", status: "Pending" },
  { id: "HW005", subject: "Biology", class: "Class 10", section: "A", title: "Diagram Practice", description: "Draw and label the human digestive system.", dueDate: "2026-07-31", assignedBy: "Mrs. Sunita Patil", status: "Pending" },
  { id: "HW006", subject: "Computer Science", class: "Class 10", section: "A", title: "Python Programming", description: "Write a Python program to find Fibonacci series.", dueDate: "2026-07-28", assignedBy: "Mrs. Kavita Singh", status: "Graded" },
];

export const books: Book[] = [
  { id: "B001", title: "NCERT Mathematics Class 10", author: "NCERT", isbn: "978-8174506344", category: "Textbook", totalCopies: 50, availableCopies: 42, location: "Section A - Shelf 1", },
  { id: "B002", title: "Science - NCERT Class 10", author: "NCERT", isbn: "978-8174505026", category: "Textbook", totalCopies: 50, availableCopies: 38, location: "Section A - Shelf 2", },
  { id: "B003", title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", isbn: "978-0747532743", category: "Fiction", totalCopies: 10, availableCopies: 7, location: "Section B - Shelf 1", },
  { id: "B004", title: "Wings of Fire", author: "A.P.J. Abdul Kalam", isbn: "978-8173706011", category: "Biography", totalCopies: 8, availableCopies: 5, location: "Section B - Shelf 2", },
  { id: "B005", title: "The Discovery of India", author: "Jawaharlal Nehru", isbn: "978-8172110383", category: "History", totalCopies: 5, availableCopies: 4, location: "Section C - Shelf 1", },
  { id: "B006", title: "H.C. Verma Concepts of Physics", author: "H.C. Verma", isbn: "978-8174091796", category: "Reference", totalCopies: 15, availableCopies: 10, location: "Section A - Shelf 3", },
  { id: "B007", title: "RD Sharma Mathematics", author: "R.D. Sharma", isbn: "978-8177099577", category: "Reference", totalCopies: 20, availableCopies: 15, location: "Section A - Shelf 4", },
  { id: "B008", title: "Pride and Prejudice", author: "Jane Austen", isbn: "978-0141439518", category: "Fiction", totalCopies: 6, availableCopies: 6, location: "Section B - Shelf 3", },
];

export const transport: Transport[] = [
  { id: "TR001", vehicleNumber: "MH-01-AB-1234", type: "Bus", route: "Route A - Andheri to School", driver: "Vinod Shetty", capacity: 50, assignedStudents: 42, status: "Active" },
  { id: "TR002", vehicleNumber: "MH-01-CD-5678", type: "Bus", route: "Route B - Borivali to School", driver: "Rajesh Kumar", capacity: 50, assignedStudents: 38, status: "Active" },
  { id: "TR003", vehicleNumber: "MH-01-EF-9012", type: "Van", route: "Route C - Malad to School", driver: "Sunil Patil", capacity: 12, assignedStudents: 10, status: "Active" },
  { id: "TR004", vehicleNumber: "MH-01-GH-3456", type: "Bus", route: "Route D - Thane to School", driver: "Mohan Das", capacity: 50, assignedStudents: 45, status: "Maintenance" },
  { id: "TR005", vehicleNumber: "MH-01-IJ-7890", type: "Auto", route: "Local Drop - School Vicinity", driver: "Kumar Singh", capacity: 3, assignedStudents: 2, status: "Active" },
];

export const hostels: Hostel[] = [
  { id: "H001", name: "Ganga Boys Hostel", type: "Boys", warden: "Mr. Prakash Nair", totalRooms: 60, occupiedRooms: 48, capacity: 120, occupancy: 80 },
  { id: "H002", name: "Yamuna Girls Hostel", type: "Girls", warden: "Mrs. Anita Kulkarni", totalRooms: 50, occupiedRooms: 42, capacity: 100, occupancy: 84 },
  { id: "H003", name: "Saraswati Boys Hostel", type: "Boys", warden: "Mr. Mohammed Ali", totalRooms: 40, occupiedRooms: 30, capacity: 80, occupancy: 75 },
];

export const inventory: InventoryItem[] = [
  { id: "I001", name: "Chalk Boxes", category: "Stationery", quantity: 200, unitPrice: 50, totalValue: 10000, status: "In Stock", lastRestocked: "2026-06-15" },
  { id: "I002", name: "Whiteboard Markers", category: "Stationery", quantity: 15, unitPrice: 30, totalValue: 450, status: "Low Stock", lastRestocked: "2026-05-20" },
  { id: "I003", name: "A4 Paper Reams", category: "Stationery", quantity: 50, unitPrice: 250, totalValue: 12500, status: "In Stock", lastRestocked: "2026-07-01" },
  { id: "I004", name: "Projector Bulbs", category: "Electronics", quantity: 3, unitPrice: 2500, totalValue: 7500, status: "Low Stock", lastRestocked: "2026-04-10" },
  { id: "I005", name: "Science Lab Chemicals", category: "Lab Equipment", quantity: 25, unitPrice: 500, totalValue: 12500, status: "In Stock", lastRestocked: "2026-06-28" },
  { id: "I006", name: "Sports Balls", category: "Sports", quantity: 0, unitPrice: 300, totalValue: 0, status: "Out of Stock", lastRestocked: "2026-03-15" },
  { id: "I007", name: "Classroom Furniture Sets", category: "Furniture", quantity: 8, unitPrice: 15000, totalValue: 120000, status: "In Stock", lastRestocked: "2026-01-20" },
  { id: "I008", name: "First Aid Kits", category: "Medical", quantity: 10, unitPrice: 800, totalValue: 8000, status: "In Stock", lastRestocked: "2026-05-10" },
];

export const messages: Message[] = [
  { id: "MSG001", title: "Annual Day Celebration", content: "We are pleased to announce that the Annual Day Celebration will be held on 15th August 2026. All students are expected to participate.", sender: "Principal", recipients: "All Students & Parents", date: "2026-07-20", type: "Announcement", priority: "High" },
  { id: "MSG002", title: "Holiday Notice - Raksha Bandhan", content: "School will remain closed on 19th August 2026 on account of Raksha Bandhan.", sender: "Admin Office", recipients: "All", date: "2026-07-18", type: "Notice", priority: "Medium" },
  { id: "MSG003", title: "PTM Scheduled", content: "Parent-Teacher Meeting is scheduled for 25th July 2026. Parents are requested to attend.", sender: "Principal", recipients: "All Parents", date: "2026-07-15", type: "Circular", priority: "High" },
  { id: "MSG004", title: "Sports Day Practice", content: "Students participating in Sports Day are requested to practice daily from 4:00 PM to 5:30 PM.", sender: "Sports Department", recipients: "All Students", date: "2026-07-12", type: "Notice", priority: "Low" },
  { id: "MSG005", title: "Fee Payment Reminder", content: "This is a reminder that the last date for fee payment is 30th July 2026. Please clear all dues.", sender: "Accounts Dept", recipients: "All Parents", date: "2026-07-10", type: "Circular", priority: "High" },
];

export const leaves: Leave[] = [
  { id: "L001", staffId: "T004", staffName: "Mr. Rahul Deshmukh", type: "Sick", startDate: "2026-07-22", endDate: "2026-07-26", reason: "Medical treatment", status: "Approved", appliedOn: "2026-07-20" },
  { id: "L002", staffId: "ST006", staffName: "Anita Kulkarni", type: "Casual", startDate: "2026-07-28", endDate: "2026-07-29", reason: "Personal work", status: "Pending", appliedOn: "2026-07-25" },
  { id: "L003", staffId: "T001", staffName: "Mrs. Priya Sharma", type: "Earned", startDate: "2026-08-05", endDate: "2026-08-08", reason: "Family vacation", status: "Pending", appliedOn: "2026-07-26" },
  { id: "L004", staffId: "ST005", staffName: "Vinod Shetty", type: "Sick", startDate: "2026-07-10", endDate: "2026-07-12", reason: "Fever", status: "Approved", appliedOn: "2026-07-09" },
];

export const payroll: Payroll[] = [
  { id: "PY001", staffId: "T001", staffName: "Mrs. Priya Sharma", position: "Teacher", basicSalary: 45000, allowances: 12000, deductions: 2000, netSalary: 55000, month: "July", year: 2026, status: "Paid" },
  { id: "PY002", staffId: "T002", staffName: "Mr. Amit Verma", position: "Teacher", basicSalary: 40000, allowances: 11000, deductions: 1000, netSalary: 50000, month: "July", year: 2026, status: "Paid" },
  { id: "PY003", staffId: "T003", staffName: "Mrs. Neha Gupta", position: "Teacher", basicSalary: 38000, allowances: 11000, deductions: 1000, netSalary: 48000, month: "July", year: 2026, status: "Processing" },
  { id: "PY004", staffId: "T004", staffName: "Mr. Rahul Deshmukh", position: "Teacher", basicSalary: 36000, allowances: 10000, deductions: 1000, netSalary: 45000, month: "July", year: 2026, status: "Pending" },
  { id: "PY005", staffId: "ST001", staffName: "Ramesh Yadav", position: "Accountant", basicSalary: 28000, allowances: 8000, deductions: 1000, netSalary: 35000, month: "July", year: 2026, status: "Paid" },
  { id: "PY006", staffId: "ST002", staffName: "Suresh Pai", position: "Librarian", basicSalary: 25000, allowances: 8000, deductions: 1000, netSalary: 32000, month: "July", year: 2026, status: "Paid" },
];

export const certificates: Certificate[] = [
  { id: "CERT001", type: "Transfer", studentName: "Aarav Patel", studentId: "S001", issueDate: "2026-06-30", issuedBy: "Principal" },
  { id: "CERT002", type: "Bonafide", studentName: "Diya Sharma", studentId: "S002", issueDate: "2026-07-15", issuedBy: "Principal" },
  { id: "CERT003", type: "Study", studentName: "Rohan Gupta", studentId: "S003", issueDate: "2026-07-20", issuedBy: "Principal" },
  { id: "CERT004", type: "Character", studentName: "Ananya Singh", studentId: "S004", issueDate: "2026-07-10", issuedBy: "Principal" },
  { id: "CERT005", type: "Fee", studentName: "Vivaan Mehta", studentId: "S005", issueDate: "2026-07-05", issuedBy: "Accounts Dept" },
];

export const attendanceData: Attendance[] = [
  { id: "A001", studentId: "S001", studentName: "Aarav Patel", date: "2026-07-25", status: "Present", class: "Class 10", section: "A" },
  { id: "A002", studentId: "S002", studentName: "Diya Sharma", date: "2026-07-25", status: "Present", class: "Class 10", section: "A" },
  { id: "A003", studentId: "S003", studentName: "Rohan Gupta", date: "2026-07-25", status: "Absent", class: "Class 10", section: "B" },
  { id: "A004", studentId: "S004", studentName: "Ananya Singh", date: "2026-07-25", status: "Late", class: "Class 9", section: "A" },
  { id: "A005", studentId: "S005", studentName: "Vivaan Mehta", date: "2026-07-25", status: "Present", class: "Class 9", section: "A" },
  { id: "A006", studentId: "S006", studentName: "Ishita Verma", date: "2026-07-25", status: "Present", class: "Class 9", section: "B" },
  { id: "A007", studentId: "S007", studentName: "Aditya Kumar", date: "2026-07-25", status: "Half Day", class: "Class 8", section: "A" },
  { id: "A008", studentId: "S008", studentName: "Sneha Reddy", date: "2026-07-25", status: "Present", class: "Class 8", section: "A" },
  { id: "A009", studentId: "S009", studentName: "Kabir Joshi", date: "2026-07-25", status: "Present", class: "Class 7", section: "A" },
  { id: "A010", studentId: "S010", studentName: "Myra Nair", date: "2026-07-25", status: "Absent", class: "Class 7", section: "B" },
];
