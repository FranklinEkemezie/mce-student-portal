import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import {Select} from "@/Components/SelectDropdown.jsx";
import React, {useEffect} from "react";
import {useForm} from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton.jsx";

export default function CreateCourseForm(
    {
        courseFormId,
        canDelete=true,
        handleDeleteButtonClick,
        courses,
        departments,
        updateCourseFormData
    }) {

    const {
        data, setData
    } = useForm({
        title: '',                  courseCodeName: '',
        courseCodeDigit: '',        unit: 1,
        level: 100,                 semester: '',
        department: '',             prerequisites: ''
    });

    const setCourseFormData = (key, value) => {
        let updatedData = {...data, [key]: value};

        setData(() => updatedData);
        updateCourseFormData(courseFormId, updatedData);
    }

    const getCourseFormInputId = (id) => `${courseFormId}-${id}`;

    return (
        <form>

            <div className="border-2 rounded-lg p-4">

                <div className="flex items-center justify-between my-2 py-2 border-b border-dashed">
                    <h5 className="text-lg font-semibold">
                        Course Form {data.title && `(${data.title})`}
                    </h5>
                    {canDelete && (
                        <DangerButton onClick={() => handleDeleteButtonClick(courseFormId)}>
                            Remove
                        </DangerButton>
                    )}
                </div>

                <div className="space-y-6">
                    <div>
                        <InputLabel htmlFor={getCourseFormInputId('title')} value="Course Title"/>

                        <TextInput
                            id={getCourseFormInputId('title')}
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setCourseFormData('title', e.target.value)}
                            placeholder="Engineering Mathematics I"
                            autoComplete="title"
                        />
                    </div>

                    <div className="grid md:grid-cols-4 gap-2">
                        <div>
                            <InputLabel htmlFor={getCourseFormInputId('code-name')} value="Course Code"/>

                            <div className="flex items-center space-x-2">
                                <TextInput
                                    id={getCourseFormInputId('code-name')}
                                    className="mt-1 block w-full"
                                    placeholder="ENG"
                                    value={data.courseCodeName}
                                    onChange={(e) => setCourseFormData(
                                        'courseCodeName', e.target.value.toUpperCase()
                                    )}
                                    autoComplete="title"
                                    maxLength={3}
                                    minLength={3}
                                />
                                <TextInput
                                    id="code-digit"
                                    className="mt-1 block w-full"
                                    value={data.courseCodeDigit}
                                    onChange={(e) => setCourseFormData(
                                        'courseCodeDigit', e.target.value
                                    )}
                                    placeholder="305"
                                    autoComplete="title"
                                    maxLength={3}
                                    minLength={3}
                                />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor={getCourseFormInputId('unit')} value="Course Unit"/>

                            <select
                                id={getCourseFormInputId('unit')}
                                className="border-gray-300 rounded-md w-full mt-1"
                                onChange={(e) => setCourseFormData(
                                    'unit', parseInt(e.target.value)
                                )}
                            >
                                {
                                    new Array(9).fill(null).map((e, i) => (
                                        <option key={i} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div>
                            <InputLabel htmlFor={getCourseFormInputId('level')} value="Level"/>

                            <select
                                id={getCourseFormInputId('level')}
                                className="border-gray-300 rounded-md w-full mt-1"
                                onChange={(e) => setCourseFormData(
                                    'level', parseInt(e.target.value)
                                )}
                            >
                                {
                                    new Array(9).fill(null).map((e, i) => (
                                        <option key={i} value={(i + 1) * 100}>
                                            {(i + 1) * 100}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div>
                            <InputLabel htmlFor={getCourseFormInputId('semester')} value="Semester"/>

                            <select
                                id={getCourseFormInputId('semester')}
                                className="border-gray-300 rounded-md w-full mt-1"
                                onChange={(e) => setCourseFormData(
                                    'semester', e.target.value
                                )}
                            >
                                {
                                    Object.entries({
                                        'harmattan': 'Harmattan Semester',
                                        'rain': 'Rain Semester'
                                    }).map(([key, value], i) => (
                                        <option key={key} value={value}>
                                            {value}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-2">
                        <div>
                            <InputLabel htmlFor={getCourseFormInputId('department')} value="Department"/>

                            <select
                                id={getCourseFormInputId('department')}
                                className="border-gray-300 rounded-md w-full mt-1"
                                onChange={(e) => setCourseFormData(
                                    'department', e.target.value
                                )}
                            >
                                {
                                    departments.map(({id, name, code}) => (
                                        <option key={id} value={code}>
                                            {`${code} - ${name}`}
                                        </option>
                                    ))
                                }
                            </select>

                        </div>

                        <div>
                            <InputLabel htmlFor={getCourseFormInputId('prerequisites')} value="Prerequisities"/>

                            <div
                                className="flex items-center justify-between border border-gray-300 rounded-md p-2 mt-1">
                                <div className="opacity-60">
                                    {data.prerequisites.replaceAll(',', ', ')}
                                </div>
                                <Select
                                    id={getCourseFormInputId('prerequisites')}
                                    className="w-full"
                                    options={courses.reduce((options, course) => {
                                        const {code, title} = course;
                                        return {...options, [code]: `${code} - ${title}`}
                                    }, {})}
                                    onChange={(selected) => setCourseFormData(
                                        'prerequisites', selected.join(',')
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    )
}
