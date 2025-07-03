import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import {Select} from "@/Components/SelectDropdown.jsx";
import React from "react";
import DangerButton from "@/Components/DangerButton.jsx";
import InputError from "@/Components/InputError.jsx";

export default function CreateCourseForm(
    {
        courseFormId,
        courseFormData,
        canDelete=true,
        handleDeleteButtonClick,
        courses,
        departments,
        updateCourseFormData,
        courseFormErrors
    }) {

    const {
        title, unit, code, level, semester,
        department, prerequisites
    } = courseFormData;

    const setCourseFormData = (key, value) => {
        updateCourseFormData(courseFormId, key, value);
    }

    const setCourseCodeName = (courseCodeName) => {
        const newCourseCode = [courseCodeName.toUpperCase(), code.split(' ')[1] || ''];
        setCourseFormData('code', newCourseCode.join(' '))
    }

    const setCourseCodeDigits = (courseCodeDigits) => {
        const newCourseCode = [(code.split(' ')[0] || '').toUpperCase(), courseCodeDigits];
        setCourseFormData('code', newCourseCode.join(' '));
    }

    const getCourseFormInputId = (id) => `${courseFormId}-${id}`;

    return (
        <form>

            <div className="border-2 rounded-lg p-4">

                <div className="flex items-center justify-between my-2 py-2 border-b border-dashed">
                    <h5 className="text-lg font-semibold">
                        Course Form {title && `(${title})`}
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
                            value={title}
                            onChange={(e) => setCourseFormData('title', e.target.value)}
                            placeholder="Engineering Mathematics I"
                            autoComplete="title"
                        />

                        <InputError message={courseFormErrors?.title} className="mt-2" />
                    </div>

                    <div className="grid md:grid-cols-4 gap-2">
                        <div>
                            <InputLabel htmlFor={getCourseFormInputId('code-name')} value="Course Code"/>

                            <div className="flex items-center space-x-2">
                                <TextInput
                                    id={getCourseFormInputId('code-name')}
                                    className="mt-1 block w-full"
                                    placeholder="ENG"
                                    value={code.split(' ')[0] || ''}
                                    onChange={(e) => setCourseCodeName(e.target.value)}
                                    autoComplete="number"
                                    maxLength={3}
                                    minLength={3}
                                />
                                <TextInput
                                    id="code-digits"
                                    className="mt-1 block w-full"
                                    value={code.split(' ')[1] || ''}
                                    onChange={(e) => setCourseCodeDigits(e.target.value)}
                                    placeholder="305"
                                    autoComplete="title"
                                    maxLength={3}
                                    minLength={3}
                                />
                            </div>

                            <InputError message={courseFormErrors?.code} className="mt-2" />
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

                            <InputError message={courseFormErrors?.unit} className="mt-2" />

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

                            <InputError message={courseFormErrors?.level} className="mt-2" />
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
                                    }).map(([key, value]) => (
                                        <option key={key} value={key}>
                                            {value}
                                        </option>
                                    ))
                                }
                            </select>

                            <InputError message={courseFormErrors?.semester} className="mt-2" />
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

                            <InputError message={courseFormErrors?.department} className="mt-2" />

                        </div>

                        <div>
                            <InputLabel htmlFor={getCourseFormInputId('prerequisites')} value="Prerequisities"/>

                            <div
                                className="flex items-center justify-between border border-gray-300 rounded-md p-2 mt-1">
                                <div className="opacity-60">
                                    {prerequisites.replaceAll(',', ', ')}
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

                            <InputError message={courseFormErrors?.prerequisites} className="mt-2" />

                        </div>
                    </div>
                </div>

            </div>
        </form>
    )
}
