import {CloseButton} from "@headlessui/react";
import React, {useEffect, useState} from "react";

/**
 *
 * @param type { "success" | "error" | "warning" }
 * @param message { {message: string, timestamp: int|string } | null }
 * @param className { string }
 * @param hide { number } Hide after number of seconds
 * @constructor
 */
export default function ToastMessage({ type, message, className, hide }) {

    const { message: content, timestamp: id } = message || {message: null, timestamp: null};

    const [showToast, setShowToast] = useState(!! content);

    useEffect(() => {

        if (! content) return ;

        setShowToast(true);

        let timeout;
        if (hide && typeof  hide === 'number') {
            const timeout = setTimeout(() => {
                setShowToast(false);
            }, hide * 1000);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        }
    }, [id]);

    let bgColour = 'bg-gray-500';
    if (type === 'success') { bgColour = 'bg-green-500' }
    else if (type === 'error') { bgColour = 'bg-red-500' }
    else if (type === 'warning') { bgColour = 'bg-yellow-500' }

    if (! showToast || ! content) return null;
    return (
        <div className={`${bgColour} shadow text-white rounded p-2 ${className}`}>
            <div className="flex items-center justify-between gap-x-8">
                {content}
                <div className="w-4 h-4 flex items-center justify-center ring-2 ring-white rounded-full">
                    <button
                        className="text-xs w-full h-full hover:bg-gray-700/20 rounded-full"
                        onClick={() => setShowToast(false)}
                    >X
                    </button>
                </div>

            </div>
        </div>
    )
}
