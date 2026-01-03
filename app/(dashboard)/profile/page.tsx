'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Camera, Globe, Trash2, MapPin, Save, Loader2 } from 'lucide-react';

interface Profile {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    language: string;
    createdAt: string;
    _count: {
        trips: number;
        savedDestinations: number;
    };
}

interface SavedDestination {
    id: string;
    cityId: string;
    cityName: string;
    country: string;
    region: string;
    createdAt: string;
}

const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' },
    { code: 'ko', name: '한국어' },
    { code: 'ar', name: 'العربية' },
];

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [savedDestinations, setSavedDestinations] = useState<SavedDestination[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        fetchProfile();
        fetchSavedDestinations();
    }, []);

    async function fetchProfile() {
        try {
            const res = await fetch('/api/profile');
            if (res.ok) {
                const data = await res.json();
                setProfile(data);
                setName(data.name || '');
                setEmail(data.email || '');
                setPhoto(data.photo || '');
                setLanguage(data.language || 'en');
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchSavedDestinations() {
        try {
            const res = await fetch('/api/profile/saved-destinations');
            if (res.ok) {
                const data = await res.json();
                setSavedDestinations(data);
            }
        } catch (err) {
            console.error('Error fetching saved destinations:', err);
        }
    }

    async function handleSaveProfile(e: React.FormEvent) {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');
        setError('');

        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, photo, language })
            });

            if (res.ok) {
                setMessage('Profile updated successfully!');
                fetchProfile();
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to update profile');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setIsSaving(false);
            setTimeout(() => { setMessage(''); setError(''); }, 3000);
        }
    }

    async function handleDeleteAccount() {
        if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return;
        }
        if (!confirm('This will permanently delete all your trips and data. Continue?')) {
            return;
        }

        try {
            const res = await fetch('/api/profile', { method: 'DELETE' });
            if (res.ok) {
                router.push('/login');
            } else {
                setError('Failed to delete account');
            }
        } catch (err) {
            setError('An error occurred');
        }
    }

    async function handleRemoveDestination(id: string) {
        try {
            const res = await fetch(`/api/profile/saved-destinations/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setSavedDestinations(prev => prev.filter(d => d.id !== id));
            }
        } catch (err) {
            console.error('Error removing destination:', err);
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Profile Settings</h1>
                <p className="text-muted-foreground mt-2">Manage your account and preferences.</p>
            </div>

            {message && (
                <div className="bg-green-100 text-green-700 p-3 rounded-md text-sm">
                    {message}
                </div>
            )}

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
                    {error}
                </div>
            )}

            {/* Profile Form */}
            <form onSubmit={handleSaveProfile} className="bg-card border rounded-lg p-6 shadow-sm space-y-6">
                <h2 className="text-lg font-semibold">Personal Information</h2>

                {/* Photo */}
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-primary/20">
                        {photo ? (
                            <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="h-10 w-10 text-muted-foreground" />
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">
                            <Camera className="h-4 w-4 inline mr-1" />
                            Photo URL
                        </label>
                        <input
                            type="url"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            placeholder="https://example.com/photo.jpg"
                            className="w-full p-2 border rounded-md text-sm"
                        />
                    </div>
                </div>

                {/* Name */}
                <div className="grid gap-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                        <User className="h-4 w-4" />
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                {/* Email */}
                <div className="grid gap-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                {/* Language */}
                <div className="grid gap-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        Language Preference
                    </label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Save Changes
                    </button>
                </div>
            </form>

            {/* Account Stats */}
            <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Account Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold">{profile?._count.trips || 0}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Trips Created</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold">{profile?._count.savedDestinations || 0}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Saved Destinations</div>
                    </div>
                </div>
            </div>

            {/* Saved Destinations */}
            <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Saved Destinations</h2>
                {savedDestinations.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                        No saved destinations yet. Browse cities and save your favorites!
                    </p>
                ) : (
                    <ul className="space-y-2">
                        {savedDestinations.map(dest => (
                            <li key={dest.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <span className="font-medium">{dest.cityName}</span>
                                    <span className="text-sm text-muted-foreground">
                                        {dest.country} • {dest.region}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleRemoveDestination(dest.id)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                    title="Remove"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-red-700 mb-2">Danger Zone</h2>
                <p className="text-sm text-red-600 mb-4">
                    Once you delete your account, there is no going back. All your trips and data will be permanently removed.
                </p>
                <button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-red-700"
                >
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                </button>
            </div>
        </div>
    );
}
