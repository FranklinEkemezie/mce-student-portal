
export default function SelectInput({ name, id, options, className, ...props }) {

    return (
        <select
            {...props}
            name={name}
            id={id}
            className={`rounded-md border-gray-300 shadow-sm
            focus:border-indigo-500 focus:ring-indigo-500 ${className}`}
        >
            {
                Object.entries(options).map(([ value, label ]) => (
                    <option key={value} value={value}>{label}</option>
                ))
            }
        </select>
    );
}
