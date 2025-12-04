import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { User, Mail, Calendar, Shield } from 'lucide-react';
import authService from '../../services/authService';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await authService.getProfile();
                setUser(data);
                setFormData({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email
                });
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await authService.updateProfile(formData);
            setUser(updatedUser);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    if (loading) return <div className="p-6">Loading profile...</div>;

    if (!user) return <div className="p-6">Failed to load profile.</div>;

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
                    <p className="text-slate-600 mt-1">Manage your account settings and preferences</p>
                </div>
                {!isEditing && (
                    <Button onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </Button>
                )}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-green-600" />
                        Personal Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center text-2xl font-bold text-green-600">
                            {user.first_name ? user.first_name[0].toUpperCase() : user.email[0].toUpperCase()}
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-slate-900">
                                {user.first_name || 'User'} {user.last_name}
                            </h3>
                            <p className="text-slate-500">@{user.username}</p>
                        </div>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">First Name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="grid gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-500">Full Name</label>
                                    <div className="flex items-center gap-2 p-2 border rounded-md bg-white">
                                        <User className="h-4 w-4 text-slate-400" />
                                        <span className="text-slate-900">{user.first_name} {user.last_name}</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-500">Email Address</label>
                                    <div className="flex items-center gap-2 p-2 border rounded-md bg-white">
                                        <Mail className="h-4 w-4 text-slate-400" />
                                        <span className="text-slate-900">{user.email}</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-500">Date Joined</label>
                                    <div className="flex items-center gap-2 p-2 border rounded-md bg-white">
                                        <Calendar className="h-4 w-4 text-slate-400" />
                                        <span className="text-slate-900">
                                            {new Date(user.date_joined).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-500">Account Status</label>
                                    <div className="flex items-center gap-2 p-2 border rounded-md bg-white">
                                        <Shield className="h-4 w-4 text-green-500" />
                                        <span className="text-green-700 font-medium">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
