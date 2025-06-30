import SecondaryLink from "@/Components/SecondaryLink.jsx";
import React, {useState} from "react";
import {Select} from "@/Components/SelectDropdown.jsx";
import {useCourse} from "@/hooks/useCourse.js";

/**
 *
 * @param courses {Course[]}
 * @returns {JSX.Element}
 * @constructor
 */
export default function CoursesByLevel({ courses }) {

    const [selectedOptions, setSelectedOptions] = useState([]);
    const { groupCoursesByLabel } = useCourse();

    const coursesByLevel = groupCoursesByLabel((course) => {
        return `${course.code.split(' ')[1][0]}00`;
    });

    return (
        <div className="mt-6 overflow-y-auto min-h-screen">

            <table className="table-auto w-full">
                <thead>
                <tr className="font-bold bg-gray-100 ">
                    <th className="text-start px-2 py-4">S/N</th>
                    <th className="text-start px-2 py-4">Title</th>
                    <th className="text-start px-2 py-4">Course Code</th>
                    <th className="text-start px-2 py-4">Unit</th>
                    <th className="text-start px-2 py-4">Department</th>
                    <th className="text-start px-2 py-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    Object.entries(coursesByLevel)
                        .map(([level, courses]) => (
                            (selectedOptions.length === 0 || selectedOptions.includes(level)) && (
                                <React.Fragment key={level}>
                                    <tr key={level}>
                                        <th
                                            key={level}
                                            className="border-b-2 hover:initial pt-8 text-lg text-start py-2"
                                            colSpan={6}
                                        >
                                            {level} level ({courses.length})
                                        </th>
                                    </tr>
                                    {
                                        courses.map((course, index) => {
                                            const {
                                                id, title, code, unit,
                                                department: {code: deptCode}
                                            } = course;

                                            return (
                                                <tr key={id} className="border-b hover:bg-gray-50">
                                                    <td className="p-2">{index + 1}</td>
                                                    <td className="p-2">{title}</td>
                                                    <td className="p-2">{code}</td>
                                                    <td className="p-2">{unit}</td>
                                                    <td className="p-2">{deptCode}</td>
                                                    <td className="p-2 space-x-2">
                                                        <SecondaryLink href={`/courses/${id}`}>
                                                            View
                                                        </SecondaryLink>
                                                        <SecondaryLink href={`/courses/${id}`}>
                                                            Edit
                                                        </SecondaryLink>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </React.Fragment>
                            )
                        ))
                }
                </tbody>
            </table>
        </div>
    )
}
