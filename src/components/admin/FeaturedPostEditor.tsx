'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, Star, Eye, EyeOff } from 'lucide-react';

interface FeaturedPost {
    enabled: boolean;
    title: string;
    badge: string;
    content: string;
    linkText: string;
    linkUrl: string;
}

export default function FeaturedPostEditor() {
    const [post, setPost] = useState<FeaturedPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(d => {
                setPost(d.featuredPost);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        if (!post) return;
        setSaving(true);
        try {
            const distinctRes = await fetch('/api/content');
            const fullData = await distinctRes.json();

            const mergedData = {
                ...fullData,
                featuredPost: post
            };

            const res = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mergedData)
            });

            if (res.ok) {
                alert('Featured post updated!');
            } else {
                alert('Failed to save');
            }
        } catch (e) {
            console.error(e);
            alert('Error saving');
        } finally {
            setSaving(false);
        }
    };

    if (loading || !post) return <div className="p-12 text-center text-slate-500">Loading editor...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Star className="text-yellow-400 fill-yellow-400" />
                        Featured Post Manager
                    </h2>
                    <p className="text-slate-400">Highlight special offers or announcements on the homepage.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-gradient px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
                >
                    {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            <div className="glass-card p-8 border-t-4 border-t-yellow-500/50">

                {/* Toggle Information */}
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${post.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                            {post.enabled ? <Eye /> : <EyeOff />}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Visibility Status</h3>
                            <p className="text-sm text-slate-400">
                                {post.enabled ? 'Currently visible on homepage' : 'Hidden from homepage'}
                            </p>
                        </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={post.enabled}
                            onChange={e => setPost({ ...post, enabled: e.target.checked })}
                        />
                        <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                        <span className="ml-3 text-sm font-medium text-slate-300">Enable</span>
                    </label>
                </div>

                <div className={`grid gap-6 transition-opacity duration-300 ${post.enabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm text-slate-400 mb-1">Post Title</label>
                            <input
                                type="text"
                                value={post.title}
                                onChange={e => setPost({ ...post, title: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-yellow-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Badge Text</label>
                            <input
                                type="text"
                                value={post.badge}
                                onChange={e => setPost({ ...post, badge: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-yellow-500 outline-none"
                                placeholder="e.g. NEW, HOT"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Content Description</label>
                        <textarea
                            rows={4}
                            value={post.content}
                            onChange={e => setPost({ ...post, content: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-yellow-500 outline-none resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Link/Button Text</label>
                            <input
                                type="text"
                                value={post.linkText}
                                onChange={e => setPost({ ...post, linkText: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-yellow-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Link URL</label>
                            <input
                                type="text"
                                value={post.linkUrl}
                                onChange={e => setPost({ ...post, linkUrl: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-yellow-500 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
