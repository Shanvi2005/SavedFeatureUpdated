import { useState } from "react";

type Props = {
    onClose: () => void;
    onCreate: (folder: Folder) => void;
};

export type Folder = {
    name: string;
    description: string;
    hashtags: string[];
};


const CreateFolderModal = ({ onClose, onCreate }: Props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [hashtags, setHashtags] = useState("");

    const handleSubmit = () => {
        const folder: Folder = {
            name,
            description,
            hashtags: hashtags.split(",").map(tag => tag.trim()),
        };
        onCreate(folder);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Create New Folder</h2>

                <input
                    type="text"
                    placeholder="Folder name"
                    className="w-full border p-2 rounded mb-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    className="w-full border p-2 rounded mb-3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Hashtags (comma-separated)"
                    className="w-full border p-2 rounded mb-4"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                />

                <div className="flex justify-end gap-2">
                    <button className="px-4 py-2 text-gray-500" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleSubmit}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateFolderModal;
