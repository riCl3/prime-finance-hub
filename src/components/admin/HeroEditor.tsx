'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';

interface ContentData {
    hero: {
        tagline: string;
        titlePrefix: string;
        titleHighlight: string;
        description: string;
        primaryButtonText: string;
        secondaryButtonText: string;
    };
    stats: { id: string; value: string; label: string }[];
}

export default function HeroEditor() {
    const [data, setData] = useState<ContentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(d => {
                setData(d as ContentData);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        if (!data) return;
        setSaving(true);
        try {
            // We must fetch current full data first to not overwrite other sections (like featuredPost)
            // Or the API should handle merging. My API implementation overwrites the whole file with BODY.
            // So I need to fetch, merge, and save.
            // Actually, my current API implementation writes whatever is in the body to the file.
            // So the client must send THE FULL OBJECT.
            // To fix this, I should probably fetch the WHOLE state here, modify parts, and send it back.
            // For now, let's assume this component manages the whole content object or strict sections.
            // Let's re-fetch the latest full data, merge locally, and save.

            const distinctRes = await fetch('/api/content');
            const fullData = await distinctRes.json();

            const mergedData = {
                ...fullData,
                hero: data.hero,
                stats: data.stats
            };

            const res = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mergedData)
            });

            if (res.ok) {
                alert('Global content updated!');
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

    if (loading || !data) return <div className="p-12 text-center text-slate-500">Loading editor...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Hero & Global Stats</h2>
                    <p className="text-slate-400">Manage the main landing page text and statistics.</p>
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

            <div className="grid gap-8">
                {/* Hero Section */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-emerald-400 mb-4 border-b border-white/10 pb-2">Hero Section</h3>
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Tagline</label>
                            <input
                                type="text"
                                value={data.hero.tagline}
                                onChange={e => setData({ ...data, hero: { ...data.hero, tagline: e.target.value } })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Title Prefix</label>
                                <input
                                    type="text"
                                    value={data.hero.titlePrefix}
                                    onChange={e => setData({ ...data, hero: { ...data.hero, titlePrefix: e.target.value } })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Title Highlight (Gradient)</label>
                                <input
                                    type="text"
                                    value={data.hero.titleHighlight}
                                    onChange={e => setData({ ...data, hero: { ...data.hero, titleHighlight: e.target.value } })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Description</label>
                            <textarea
                                rows={3}
                                value={data.hero.description}
                                onChange={e => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none resize-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Primary Button Text</label>
                                <input
                                    type="text"
                                    value={data.hero.primaryButtonText}
                                    onChange={e => setData({ ...data, hero: { ...data.hero, primaryButtonText: e.target.value } })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Secondary Button Text</label>
                                <input
                                    type="text"
                                    value={data.hero.secondaryButtonText}
                                    onChange={e => setData({ ...data, hero: { ...data.hero, secondaryButtonText: e.target.value } })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-4 border-b border-white/10 pb-2">Global Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.stats.map((stat, idx) => (
                            <div key={stat.id} className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <div className="mb-2">
                                    <label className="block text-xs text-slate-500 mb-1">Value</label>
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={e => {
                                            const newStats = [...data.stats];
                                            newStats[idx].value = e.target.value;
                                            setData({ ...data, stats: newStats });
                                        }}
                                        className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white text-sm focus:border-cyan-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Label</label>
                                    <input
                                        type="text"
                                        value={stat.label}
                                        onChange={e => {
                                            const newStats = [...data.stats];
                                            newStats[idx].label = e.target.value;
                                            setData({ ...data, stats: newStats });
                                        }}
                                        className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white text-sm focus:border-cyan-500 outline-none"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
