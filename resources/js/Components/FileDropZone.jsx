import {useRef, useState} from "react";

export default function FileDropZone({ onFileSelect, className, ...props }) {

    const fileInputRef = useRef();
    const [files, setFiles] = useState([]);

    const handleFiles = (selectedFiles) => {
        const fileArr = Array.from(selectedFiles);
        setFiles([...files, ...fileArr]);
        onFileSelect?.(fileArr);
    }

    const handleFileChange = (e) => {
        handleFiles(e.target.files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div>
            {/* Hidden input */}
            <input
                {...props}
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                onError={(e) => console.log('Error')}
            />
            <div
                className={`w-full border-2 border-dashed border-gray-300 rounded-xl p-12 text-center
            cursor-pointer hover:border-gray-400 transition ${className}`}
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <p className="text-gray-500">Drag and drop files here</p>
                <p className="text-gray-400 text-sm">or click to browse</p>
            </div>

            {files.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-2">
                    <p className="font-semibold text-gray-700 mb-2"></p>
                    <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
                        {files.map((file, idx) => (
                            <li key={idx}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
