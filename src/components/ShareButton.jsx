import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

export default function ShareButton({ title, text, url }) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: title || 'Ricetta Vegana',
            text: text || 'Guarda questa ricetta!',
            url: url || window.location.href,
        };

        // Try Native Share (Mobile / Supported Browsers)
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
                return; // Success, exit
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Error sharing:', err);
                }
                // If user aborted or error, we might fallback to copy, but usually abort is fine.
                return;
            }
        }

        // Fallback: Copy to Clipboard (Desktop)
        try {
            await navigator.clipboard.writeText(shareData.url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            onClick={handleShare}
            className="btn btn-share"
            aria-label="Condividi ricetta"
        >
            {copied ? <Check size={18} /> : (navigator.share ? <Share2 size={18} /> : <Copy size={18} />)}
            {copied ? 'Link Copiato!' : 'Condividi'}

            <style>{`
                .btn-share {
                   background-color: var(--color-accent); /* Orange for action */
                   margin-top: 16px;
                }
                .btn-share:hover {
                    background-color: #ba652e; /* Darker orange */
                }
            `}</style>
        </button>
    );
}
