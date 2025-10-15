import React, { useState } from 'react';

// Sample data - In a real application, this would come from a database
const users = {
    // Faculty users (14 departments)
    'fac001': { password: 'faculty123', role: 'faculty', name: 'Dr. Smith', department: 'Computer Science' },
    'fac002': { password: 'faculty123', role: 'faculty', name: 'Prof. Johnson', department: 'Electronics' },
    'fac003': { password: 'faculty123', role: 'faculty', name: 'Dr. Williams', department: 'Mechanical' },
    'fac004': { password: 'faculty123', role: 'faculty', name: 'Prof. Brown', department: 'Civil' },
    'fac005': { password: 'faculty123', role: 'faculty', name: 'Dr. Davis', department: 'Chemical' },
    'fac006': { password: 'faculty123', role: 'faculty', name: 'Prof. Miller', department: 'Physics' },
    'fac007': { password: 'faculty123', role: 'faculty', name: 'Dr. Wilson', department: 'Mathematics' },
    'fac008': { password: 'faculty123', role: 'faculty', name: 'Prof. Moore', department: 'Chemistry' },
    'fac009': { password: 'faculty123', role: 'faculty', name: 'Dr. Taylor', department: 'Library' },
    'fac010': { password: 'faculty123', role: 'faculty', name: 'Prof. Anderson', department: 'Sports' },
    'fac011': { password: 'faculty123', role: 'faculty', name: 'Dr. Thomas', department: 'Hostel' },
    'fac012': { password: 'faculty123', role: 'faculty', name: 'Prof. Jackson', department: 'Transport' },
    'fac013': { password: 'faculty123', role: 'faculty', name: 'Dr. White', department: 'Canteen' },
    'fac014': { password: 'faculty123', role: 'faculty', name: 'Prof. Harris', department: 'Administration' },
    
    // Student users
    'std001': { password: 'student123', role: 'student', name: 'John Doe', department: 'Computer Science' },
    'std002': { password: 'student123', role: 'student', name: 'Jane Smith', department: 'Electronics' },
    'std003': { password: 'student123', role: 'student', name: 'Mike Johnson', department: 'Mechanical' },
    'std004': { password: 'student123', role: 'student', name: 'Sarah Williams', department: 'Civil' },
    'std005': { password: 'student123', role: 'student', name: 'David Brown', department: 'Computer Science' },
    'std006': { password: 'student123', role: 'student', name: 'Emma Davis', department: 'Electronics' },
    'std007': { password: 'student123', role: 'student', name: 'Alex Wilson', department: 'Mechanical' },
    'std008': { password: 'student123', role: 'student', name: 'Lisa Miller', department: 'Civil' }
};

const initialStudentDues = {
    'std001': {
        'Computer Science': 120,
        'Library': 500,
        'Sports': 120,
        'Hostel': 1220,
        'Transport': 200,
        'Canteen': 110,
        'Administration':10,
        'Laboratory': 10
    },
    'std002': {
        'Electronics': 10,
        'Library': 110,
        'Sports': 300,
        'Hostel': 1500,
        'Transport': 120,
        'Canteen': 250,
        'Administration': 0,
        'Laboratory': 0
    },
    'std003': {
        'Mechanical': 110,
        'Library': 110,
        'Sports': 120,
        'Hostel': 1210,
        'Transport': 120,
        'Canteen': 200,
        'Administration': 10,
        'Laboratory': 800
    },
    'std004': {
        'Civil': 1000,
        'Library': 300,
        'Sports': 1220,
        'Hostel': 2120,
        'Transport': 150,
        'Canteen': 120,
        'Administration': 2120,
        'Laboratory': 2120
    },
    'std005': {
        'Computer Science': 10,
        'Library': 110,
        'Sports': 120,
        'Hostel': 2000,
        'Transport': 120,
        'Canteen': 100,
        'Administration': 1220,
        'Laboratory': 120
    },
    'std006': {
        'Electronics': 750,
        'Library': 200,
        'Sports': 120,
        'Hostel': 1200,
        'Transport': 300,
        'Canteen': 150,
        'Administration': 1220,
        'Laboratory': 500
    },
    'std007': {
        'Mechanical': 120,
        'Library': 120,
        'Sports': 200,
        'Hostel': 10,
        'Transport': 120,
        'Canteen': 120,
        'Administration':1220,
        'Laboratory': 120
    },
    'std008': {
        'Civil': 100,
        'Library':10,
        'Sports': 10,
        'Hostel': 800,
        'Transport': 100,
        'Canteen': 75,
        'Administration': 10,
        'Laboratory': 10
    }
};

// CSS Styles (Converted from Tailwind)
const styles = `
    :root {
        --color-bg-dark: #121212;
        --color-bg-medium: #1e1e1e;
        --color-dark-brown: #2e2520;
        --color-separator: #5e493b;
        --color-accent-light: #d4a867; /* Bright Brown/Gold */
        --color-accent-dark: #8d6a44; /* Darker Brown/Gold */
        --color-text-light: #f3f4f6;
        --color-text-medium: #d1d5db;
        --color-text-dark: #9ca3af;
        --color-success-bg: #065f46;
        --color-success-text: #a7f3d0;
        --color-danger-bg: #991b1b;
        --color-danger-text: #fca5a5;
        --color-green-500: #10b981;
        --color-red-500: #ef4444;
        --color-list-hover: #282828;
    }

    .app-root {
        font-family: 'Inter', sans-serif;
    }

    /* === General Layout === */
    .min-h-screen {
        min-height: 100vh;
    }
    .flex {
        display: flex;
    }
    .flex-col {
        flex-direction: column;
    }
    .justify-center {
        justify-content: center;
    }
    .items-center {
        align-items: center;
    }
    .p-4 {
        padding: 1rem;
    }
    .p-6 {
        padding: 1.5rem;
    }
    .p-8 {
        padding: 2rem;
    }
    .mb-8 {
        margin-bottom: 2rem;
    }
    .mt-1 {
        margin-top: 0.25rem;
    }
    .mx-auto {
        margin-left: auto;
        margin-right: auto;
    }
    .w-full {
        width: 100%;
    }
    /* Login Card Width */
    .max-w-md {
        max-width: 36rem; /* 576px */
    }
    .max-w-6xl {
        max-width: 72rem;
    }
    .shadow-lg {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
    }
    .rounded-xl {
        border-radius: 0.75rem;
    }
    .rounded-2xl {
        border-radius: 1rem;
    }
    .rounded-3xl {
        border-radius: 1.5rem;
    }
    .rounded-lg {
        border-radius: 0.5rem;
    }
    .rounded-full {
        border-radius: 9999px;
    }
    .transition-all {
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    .overflow-hidden {
        overflow: hidden;
    }
    .text-center {
        text-align: center;
    }
    .space-y-6 > * + * {
        margin-top: 1.5rem;
    }
    .gap-4 {
        gap: 1rem;
    }
    .gap-6 {
        gap: 1.5rem;
    }

    /* === Login Screen === */
    .login-container {
        background: linear-gradient(to bottom right, var(--color-dark-brown), black);
    }
    .login-card {
        background-color: var(--color-bg-dark);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
        transform: scale(1);
    }
    .login-card:hover {
        transform: scale(1.02);
    }
    .logo-img {
        height: 5rem;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 1rem;
    }
    .portal-title {
        font-size: 2.25rem; /* text-4xl */
        font-weight: 700; /* font-bold */
        color: white;
        margin-bottom: 0.5rem;
    }
    .portal-subtitle {
        color: var(--color-text-dark);
        font-size: 1.125rem; /* text-lg */
    }

    /* Controls the width of the input fields within the login card */
    .login-form-content {
        max-width: 24rem; /* 384px (Tailwind max-w-sm equivalent) */
        margin-left: auto;
        margin-right: auto;
    }
    /* END NEW */

    .input-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
    }

    .input-label {
        display: block;
        font-size: 0.875rem; /* text-sm */
        font-weight: 600; /* font-semibold */
        color: var(--color-text-medium);
        margin-bottom: 0.5rem;
    }
    .input-field {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 2px solid var(--color-separator);
        border-radius: 0.75rem;
        background-color: var(--color-dark-brown);
        color: var(--color-text-medium);
        caret-color: var(--color-accent-light);
    }
    .input-field::placeholder {
        color: var(--color-text-dark);
    }
    .input-field:focus {
        border-color: var(--color-accent-light);
        box-shadow: 0 0 0 3px rgba(212, 168, 103, 0.4);
        outline: none;
    }
    .input-field:disabled {
        opacity: 0.6;
    }

    /* === LOGIN BUTTON STYLES (MODIFIED) === */
    .login-button {
        width: 50%;
        /* Adjusted gradient direction to focus on the brighter color */
        background: linear-gradient(to top left, var(--color-accent-dark) 0%, var(--color-accent-light) 100%);
        color: white;
        padding: 10px;
        border-radius: 0.75rem;
        font-weight: 600;
        font-size: 1.125rem;
        cursor: pointer;
        border: none;
        margin-left:100px;
        /* Enhanced shadow for a lifted, brighter effect */
        box-shadow: 0 6px 15px rgba(212, 168, 103, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    }
    .login-button:hover {
        /* Brighter, more extensive hover shadow */
        box-shadow: 0 12px 35px rgba(212, 168, 103, 0.6); 
        transform: translateY(-2px); /* Slightly lift the button */
    }
    /* === END LOGIN BUTTON STYLES === */

    .error-message {
        background-color: #450a0a; /* red-900 */
        border: 1px solid #7f1d1d; /* red-700 */
        color: #fca5a5; /* red-300 */
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        text-align: center;
    }

    /* === Dashboard General === */
    .dashboard-container {
        background: linear-gradient(to bottom right, var(--color-bg-dark), var(--color-dark-brown));
        color: var(--color-text-medium); /* text-gray-200 */
    }
    .dashboard-header {
        background: linear-gradient(to right, var(--color-separator), var(--color-dark-brown));
        color: white;
        border-radius: 1rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
    }
    .dashboard-header .title {
        font-size: 1.875rem; /* md:text-3xl */
        font-weight: 700;
    }
    .dashboard-header .subtitle {
        color: var(--color-text-dark);
    }

    .logout-button {
        background-color: rgba(255, 255, 255, 0.1);
        border: 2px solid #9ca3af; /* gray-400 */
        color: white;
        padding: 10px;
        border-radius: 0.5rem;
        font-weight: 600;
        margin-left:630px;
    }
    .logout-button:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    /* === Info Card and List Card === */
    .card-base {
        background-color: var(--color-bg-medium);
        border-radius: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
        border: 1px solid #2e2e2e;
        overflow: hidden;
    }
    .card-title {
        font-size: 1.25rem; /* text-xl */
        font-weight: 700;
        color: var(--color-text-light);
    }
    .card-list .header {
        background: linear-gradient(to right, var(--color-separator), var(--color-dark-brown));
        color: white;
    }

    /* Student Info Card Details */
    .info-grid > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
    .info-grid > div:not(:last-child) {
        border-bottom: 1px solid #2e2e2e;
    }
    .info-grid .label {
        font-weight: 600;
        color: var(--color-text-medium);
    }
    .info-grid .value {
        color: var(--color-text-dark);
    }

    /* Dues Status Badge */
    .status-badge {
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 600;
    }
    .status-badge.clear {
        background-color: var(--color-success-bg);
        color: var(--color-success-text);
    }
    .status-badge.pending {
        background-color: var(--color-danger-bg);
        color: var(--color-danger-text);
    }

    /* Dues Breakdown List */
    .dues-list-item {
        padding: 1rem;
        cursor: default;
        transition-property: background-color;
        transition-duration: 200ms;
        border-top: 1px solid #2e2e2e; /* Added default border to ensure list divider */
    }
    .dues-list-item:hover {
        background-color: var(--color-list-hover);
    }
    .dues-list-item-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .dues-list-item-amount {
        font-size: 1.125rem;
        font-weight: 600;
    }
    .text-green {
        color: var(--color-green-500);
    }
    .text-red {
        color: var(--color-red-500);
    }

    /* === Faculty Dashboard === */
    .success-message {
        padding: 1rem;
        background-color: #064e3b; /* green-900 */
        color: #a7f3d0; /* green-300 */
        text-align: center;
        font-weight: 500;
    }

    /* Select Field Styling (Faculty Filter) */
    .select-field {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 2px solid var(--color-separator);
        border-radius: 0.75rem;
        background-color: var(--color-dark-brown);
        color: var(--color-text-medium);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        cursor: pointer;
    }
    .select-field:focus {
        border-color: var(--color-accent-light);
        box-shadow: 0 0 0 3px rgba(212, 168, 103, 0.4);
        outline: none;
    }
    .select-field option {
        background-color: var(--color-dark-brown);
    }

    /* Student Card List Item */
    .student-card-item {
        padding: 1.5rem;
        border-bottom: 1px solid #2e2e2e;
    }
    .student-card-item:hover {
        background-color: var(--color-list-hover);
    }
    .student-card-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
    }
    .student-card-info {
      flex-grow: 1;
    }
    .student-card-info .name {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--color-text-light);
    }
    .student-card-info .id {
        color: var(--color-text-dark);
        font-size: 0.875rem;
    }
    .student-card-info .dept {
        color: var(--color-accent-light);
        font-size: 0.75rem;
        margin-top: 0.25rem;
    }
    .student-card-due {
      text-align: left; /* Default for mobile */
    }
    .student-card-due .amount {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
    }
    .student-card-due .total {
        font-size: 0.75rem;
        color: var(--color-text-dark);
    }
    
    .approve-button {
        background-color: #059669; /* green-700 */
        color: white;
        padding: 0.25rem 0.75rem;
        font-size: 0.875rem;
        border-radius: 0.5rem;
        cursor: pointer;
        border: none;
    }
    .approve-button:hover {
        background-color: #047857; /* green-800 */
    }

    .empty-state {
        padding: 3rem;
        text-align: center;
    }
    .empty-state .icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        opacity: 0.3;
    }
    .empty-state .text {
        font-size: 1.125rem;
        color: var(--color-text-dark);
    }

    /* Responsive adjustments (md breakpoint equivalent) */
    @media (min-width: 768px) {
        .md-flex-row {
            flex-direction: row;
        }
        .md-items-center {
            align-items: center;
        }
        .student-card-content {
            flex-direction: row;
            align-items: center;
        }
        .student-card-due {
            text-align: right;
        }
        .dashboard-header .title {
            font-size: 2.25rem; /* text-3xl */
        }
    }
`;


// Login Component
const LoginForm = ({ onLogin }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setError('');
        setIsLoading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (users[userId] && users[userId].password === password) {
            const user = { id: userId, ...users[userId] };
            onLogin(user);
        } else {
            setError('Invalid User ID or Password');
        }
        
        setIsLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && userId && password) {
            handleSubmit();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center login-container app-root p-4">
            <div className="login-card rounded-3xl overflow-hidden w-full max-w-md mx-auto transition-all">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <img src="https://upload.wikimedia.org/wikipedia/en/e/e5/Official_logo_of_VNRVJIET.png" alt="VNR VJIET College Logo" className="logo-img" />
                        <div className="portal-title">VNR VJIET PORTAL</div>
                        <div className="portal-subtitle">No Dues Management System</div>
                    </div>
                    
                    {/* Applying the new dedicated CSS class for input width control */}
                    <div className="login-form-content space-y-6">
                        <div className="input-group">
                            <label className="input-label">
                                User ID
                            </label>
                            <input
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="Enter your User ID"
                                disabled={isLoading}
                                onKeyPress={handleKeyPress}
                                className="input-field"
                            />
                        </div>
                        
                        <div className="input-group">
                            <label className="input-label">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your Password"
                                disabled={isLoading}
                                onKeyPress={handleKeyPress}
                                className="input-field"
                            />
                        </div>
                        
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading || !userId || !password}
                            className="login-button transition-all"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                        
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Student Dashboard Component
const StudentDashboard = ({ user, studentDues, onLogout }) => {
    const dues = studentDues[user.id] || {};
    const totalPending = Object.values(dues).reduce((sum, amount) => sum + amount, 0);
    
    // Departments list for display (ensures all are shown even if a student has 0 due)
    const departments = [
        'Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Chemical',
        'Physics', 'Mathematics', 'Chemistry', 'Library', 'Sports',
        'Hostel', 'Transport', 'Canteen', 'Administration', 'Laboratory'
    ];

    return (
        <div className="min-h-screen dashboard-container app-root">
            <div className="max-w-6xl mx-auto p-6">
                {/* Header */}
                <div className="dashboard-header rounded-2xl p-6 mb-8 shadow-lg">
                    <div className="flex flex-col md-flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="title">Student Dashboard</h1>
                            <p className="subtitle mt-1">Welcome, {user.name}</p>
                        </div>
                        <button
                            onClick={onLogout}
                            className="logout-button transition-all "
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Student Info Card */}
                <div className="card-base p-6 mb-8">
                    <h2 className="card-title mb-6">Personal Information</h2>
                    <div className="info-grid flex flex-col gap-4">
                        <div>
                            <span className="label">Student Name:</span>
                            <span className="value">{user.name}</span>
                        </div>
                        <div>
                            <span className="label">Student ID:</span>
                            <span className="value">{user.id}</span>
                        </div>
                        <div>
                            <span className="label">Department:</span>
                            <span className="value">{user.department}</span>
                        </div>
                        <div>
                            <span className="label">Total Pending Amount:</span>
                            <span className="value" style={{ fontWeight: '600' }}>₹{totalPending}</span>
                        </div>
                        <div style={{borderBottom: 'none'}}>
                            <span className="label">No Dues Status:</span>
                            <span className={`status-badge ${
                                totalPending === 0 ? 'clear' : 'pending'
                            }`}>
                                {totalPending === 0 ? 'No Dues Clear' : `Pending: ₹${totalPending}`}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Dues Breakdown */}
                <div className="card-base card-list">
                    <div className="header p-6">
                        <h2 className="card-title">Department-wise Dues Breakdown</h2>
                    </div>
                    <div style={{ borderCollapse: 'collapse' }}>
                        {departments.map(dept => {
                            // Safely get the amount, defaulting to 0 if the student or department key is missing
                            const amount = dues[dept] || 0; 
                            return (
                                <div key={dept} className="dues-list-item">
                                    <div className="dues-list-item-content">
                                        <span className="font-medium">{dept}</span>
                                        <span className={`dues-list-item-amount ${
                                            amount === 0 ? 'text-green' : 'text-red'
                                        }`}>
                                            {amount === 0 ? 'Clear' : `₹${amount}`}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Faculty Dashboard Component
const FacultyDashboard = ({ user, studentDues, setStudentDues, onLogout }) => {
    // Set the initial filter to 'pending'
    const [statusFilter, setStatusFilter] = useState('pending');
    const [successMessage, setSuccessMessage] = useState('');

    // Filter students: only include IDs that belong to the 'student' role.
    const allStudents = Object.keys(users).filter(userId => users[userId].role === 'student');

    // Filter students based on status within the faculty's department
    const filteredStudents = allStudents.filter(studentId => {
        const dues = studentDues[studentId] || {};
        const facultyDeptDue = dues[user.department] || 0;
        const studentHasPendingDueInThisDept = facultyDeptDue > 0;

        // If 'all' is selected, include all students.
        if (statusFilter === '') return true;

        if (statusFilter === 'pending' && !studentHasPendingDueInThisDept) {
            return false;
        }
        if (statusFilter === 'clear' && studentHasPendingDueInThisDept) {
            return false;
        }
        return true;
    });

    const handleToggleStatus = (studentId) => {
        // Mark the due for this faculty's department as cleared (0)
        const updatedDues = {
            ...studentDues,
            [studentId]: {
                ...studentDues[studentId],
                [user.department]: 0,
            },
        };
        setStudentDues(updatedDues);
        
        setSuccessMessage(`Dues for ${users[studentId].name} have been approved successfully for ${user.department}!`);
        // Clear message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const StudentCard = ({ studentId }) => {
        const student = users[studentId];
        const dues = studentDues[studentId] || {};
        const totalPending = Object.values(dues).reduce((sum, amount) => sum + amount, 0);
        // The due amount relevant to this faculty's department
        const facultyDeptDue = dues[user.department] || 0; 
        const studentStatus = facultyDeptDue === 0 ? 'clear' : 'pending';

        return (
            <div className="student-card-item transition-colors">
                <div className="student-card-content">
                    <div className="student-card-info">
                        <h3 className="name">{student.name}</h3>
                        <p className="id">{studentId}</p>
                        <p className="dept">
                          Primary Department: {student.department}
                        </p>
                    </div>
                    
                    <div className="student-card-due">
                        <div className={`amount ${
                            studentStatus === 'clear' ? 'text-green' : 'text-red'
                        }`}>
                            {studentStatus === 'clear' ? 'No Dues' : `₹${facultyDeptDue}`}
                        </div>
                        <div className="total">Total Pending: ₹{totalPending}</div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className={`status-badge ${
                            studentStatus === 'clear' ? 'clear' : 'pending'
                        }`}>
                            {studentStatus === 'clear' ? 'Approved' : 'Pending'}
                        </div>
                        {/* Only show 'Mark as Approved' button if there is a pending due */}
                        {facultyDeptDue > 0 && (
                            <button
                                onClick={() => handleToggleStatus(studentId)}
                                className="approve-button transition-colors"
                            >
                                Mark as Approved
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen dashboard-container app-root">
            <div className="max-w-6xl mx-auto p-6">
                {/* Header */}
                <div className="dashboard-header rounded-2xl p-6 mb-8 shadow-lg">
                    <div className="flex flex-col md-flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="title">Faculty Dashboard</h1>
                            <p className="subtitle mt-1">{user.name} - {user.department}</p>
                        </div>
                        <button
                            onClick={onLogout}
                            className="logout-button transition-all"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="card-base p-6 mb-8">
                    <div>
                        <div>
                            <label className="input-label">
                                Filter by Status in **{user.department}** Department
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="select-field transition-all"
                            >
                                <option value="" style={{ backgroundColor: '#2e2520' }}>All Students</option>
                                <option value="clear" style={{ backgroundColor: '#2e2520' }}>No Dues Clear</option>
                                <option value="pending" style={{ backgroundColor: '#2e2520' }}>Pending Dues</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Students List */}
                <div className="card-base card-list">
                    <div className="header p-6">
                        <h2 className="card-title">
                            Students List - {user.department} Department ({filteredStudents.length} students)
                        </h2>
                    </div>
                    {successMessage && (
                        <div className="success-message">
                            {successMessage}
                        </div>
                    )}
                    
                    {filteredStudents.length === 0 ? (
                        <div className="empty-state">
                            <div className="icon">✅</div>
                            <div className="text">
                                {statusFilter === 'pending' 
                                    ? 'All students have cleared dues in your department.' 
                                    : 'No students match the current filter criteria.'
                                }
                            </div>
                        </div>
                    ) : (
                        <div style={{ borderCollapse: 'collapse' }}>
                            {filteredStudents.map(studentId => (
                                <StudentCard key={studentId} studentId={studentId} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Main App Component
const App = () => {
    // Note: The use of initialStudentDues here acts as the 'database' state.
    const [user, setUser] = useState(null);
    const [studentDues, setStudentDues] = useState(initialStudentDues);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <>
            {/* Inject all styles into the head of the document */}
            <style>
                {styles}
            </style>
            {!user ? (
                <LoginForm onLogin={handleLogin} />
            ) : user.role === 'student' ? (
                <StudentDashboard 
                    user={user} 
                    studentDues={studentDues} 
                    onLogout={handleLogout} 
                />
            ) : (
                <FacultyDashboard 
                    user={user} 
                    studentDues={studentDues} 
                    setStudentDues={setStudentDues} 
                    onLogout={handleLogout} 
                />
            )}
        </>
    );
};

export default App;