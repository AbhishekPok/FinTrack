import { useState, useEffect } from 'react';
import { Trash2, Search, Shield, User, AlertTriangle, UserPlus, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import styles from './admin.module.css';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null); // ID of user to delete
    const [showAddModal, setShowAddModal] = useState(false);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await authService.getAllUsers();
            setUsers(data);
        } catch (err) {
            setError('Failed to load users. You might not have permission.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await authService.deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
            setDeleteConfirm(null);
        } catch (err) {
            alert('Failed to delete user.');
            console.error(err);
        }
    };

    const handleStatusToggle = async (user) => {
        try {
            const updatedUser = await authService.updateUser(user.id, { is_active: !user.is_active });
            setUsers(users.map(u => u.id === user.id ? updatedUser : u));
        } catch (err) {
            alert('Failed to update user status.');
            console.error(err);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await authService.createUser(newUser);
            setShowAddModal(false);
            setNewUser({ username: '', email: '', password: '', first_name: '', last_name: '' });
            fetchUsers(); // Refresh list
            alert('User created successfully!');
        } catch (err) {
            alert('Failed to create user: ' + (err.response?.data?.detail || JSON.stringify(err.response?.data) || 'Unknown error'));
        }
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.first_name + ' ' + user.last_name).toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className={styles.loading}>Loading users...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <button className={styles.backBtn} onClick={() => navigate('/home')}>
                        <ArrowLeft size={24} />
                    </button>
                    <Shield className={styles.adminIcon} />
                    <h1>Admin Dashboard</h1>
                </div>
                <div className={styles.actions}>
                    <div className={styles.searchBox}>
                        <Search className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <button className={styles.addUserBtn} onClick={() => setShowAddModal(true)}>
                        <UserPlus size={20} />
                        Add User
                    </button>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <div className={styles.userInfo}>
                                        <div className={styles.avatar}>
                                            {user.first_name ? user.first_name[0] : user.username[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <div className={styles.name}>
                                                {user.first_name} {user.last_name}
                                            </div>
                                            <div className={styles.username}>@{user.username}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    {user.is_superuser ? (
                                        <span className={styles.badgeAdmin}>Admin</span>
                                    ) : (
                                        <span className={styles.badgeUser}>User</span>
                                    )}
                                </td>
                                <td>
                                    <button
                                        className={user.is_active ? styles.statusActive : styles.statusInactive}
                                        onClick={() => !user.is_superuser && handleStatusToggle(user)}
                                        disabled={user.is_superuser}
                                        title={user.is_superuser ? "Cannot deactivate admin" : "Toggle Status"}
                                    >
                                        {user.is_active ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                                <td>
                                    {!user.is_superuser && (
                                        <button
                                            className={styles.deleteBtn}
                                            onClick={() => setDeleteConfirm(user.id)}
                                            title="Delete User"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <AlertTriangle className={styles.warningIcon} />
                        <h2>Delete User?</h2>
                        <p>Are you sure you want to delete this user? This action cannot be undone.</p>
                        <div className={styles.modalActions}>
                            <button
                                className={styles.cancelBtn}
                                onClick={() => setDeleteConfirm(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className={styles.confirmBtn}
                                onClick={() => handleDelete(deleteConfirm)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add User Modal */}
            {showAddModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalForm}>
                        <h2>Add New User</h2>
                        <form onSubmit={handleCreateUser}>
                            <div className={styles.formGroup}>
                                <label>Username</label>
                                <input
                                    type="text"
                                    required
                                    value={newUser.username}
                                    onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    required
                                    value={newUser.email}
                                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </div>
                            <div className={styles.nameRow}>
                                <div className={styles.formGroup}>
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        value={newUser.first_name}
                                        onChange={e => setNewUser({ ...newUser, first_name: e.target.value })}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        value={newUser.last_name}
                                        onChange={e => setNewUser({ ...newUser, last_name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Password</label>
                                <input
                                    type="password"
                                    required
                                    value={newUser.password}
                                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                />
                            </div>
                            <div className={styles.modalActions}>
                                <button
                                    type="button"
                                    className={styles.cancelBtn}
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={styles.submitBtn}
                                >
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
