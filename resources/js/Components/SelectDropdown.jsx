import React, {useState} from "react";

export function Option({ name, value, selected, onChange, children }) {

    return (
        <div className="space-x-2 hover:bg-gray-300 cursor-pointer px-3 py-1.5 flex items-center">
            <input
                type="checkbox"
                name={value}
                id={value}
                className="border border-gray-300 rounded"
                onChange={(e) => onChange(name, e.target.checked)}
                checked={selected}
            />
            <label htmlFor={value} className="w-full">{children}</label>
        </div>
    )
}

/**
 *
 * @param options { object[]|object }
 * @param onChange
 * @param className
 * @returns {JSX.Element}
 * @constructor
 */
export function Select({ options, onChange, className }) {

    const optionsArr = Array.isArray(options) ? options : [options];

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const updateSelectedOptions = function (name, isSelected) {

        let updatedValue = null;
        if (isSelected) {
            updatedValue = [...new Set([...selectedOptions, name])];

            setSelectedOptions(updatedValue);
        } else {
            const optionIndex = selectedOptions.indexOf(name);
            selectedOptions.splice(optionIndex, 1);

            updatedValue = [...selectedOptions];
            setSelectedOptions(updatedValue);
        }

        onChange(updatedValue);
    }

    return (
        <div className="inline-block space-y-2 relative">
            <button
                type="button"
                className="inline-flex p-1 rounded space-x-8 cursor-default hover:bg-gray-200 text-sm"
                onClick={() => {setShowDropdown((prevState) => ! prevState)}}
            >
                &#9660;
            </button>
            {showDropdown && (
                <div className={`shadow-lg rounded-md py-2 space-y-0 border start-0 absolute
                bg-white min-w-40 max-h-80 overflow-y-auto overscroll-y-auto ${className}`}>
                    {
                        optionsArr.map((options, index) => (
                            <React.Fragment key={index}>
                                {index !== 0 && <hr/>}
                                {
                                    Object.entries(options).map(([value, text]) => (
                                        <Option
                                            key={value}
                                            name={value}
                                            value={value}
                                            selected={selectedOptions.includes(value)}
                                            onChange={updateSelectedOptions}
                                        >
                                            {text}
                                        </Option>
                                    ))
                                }
                            </React.Fragment>
                        ))
                    }
                    {}
                </div>
            )}
        </div>
    )

}
