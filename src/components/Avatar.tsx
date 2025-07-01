import { useState } from 'react';

type AvatarProps = {
    name: string;
    src?: string;
    size?: string; // e.g., "w-10 h-10"
};

const Avatar = ({ name, src, size = "w-10 h-10" }: AvatarProps) => {
    const [imageError, setImageError] = useState(false);

    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    return (
        <div
            className={`relative inline-flex items-center justify-center bg-gray-200 text-gray-700 font-semibold rounded-full ${size}`}
        >
            {src && !imageError ? (
                <img
                    src={src}
                    alt={name}
                    className={`object-cover rounded-full ${size}`}
                    onError={() => setImageError(true)}
                />
            ) : (
                <span className="text-sm">{initials}</span>
            )}
        </div>
    );
};

export default Avatar;
