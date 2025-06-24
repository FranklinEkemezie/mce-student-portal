export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block pb-1 font-medium text-gray-700 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
