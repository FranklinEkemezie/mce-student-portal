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
export default function CoursesByDepartment({ courses }) {

    const [selectedOptions, setSelectedOptions] = useState([]);
    const { groupCoursesByLabel } = useCourse();

    const coursesByDepartment = groupCoursesByLabel(
        (course) => course.department.code
    );

    return (
        <div className="mt-6 overflow-y-auto min-h-screen">

            <table className="table-auto w-full">
                <thead>
                <tr className="font-bold bg-gray-100 ">
                    <th className="text-start px-2 py-4">S/N</th>
                    <th className="text-start px-2 py-4">Title</th>
                    <th className="text-start px-2 py-4">Course Code</th>
                    <th className="text-start px-2 py-4">Unit</th>
                    <th className="text-start px-2 py-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    Object.entries(coursesByDepartment)
                        .map(([dept, courses]) => (
                            (selectedOptions.length === 0 || selectedOptions.includes(dept)) && (
                                <React.Fragment key={dept}>
                                    <tr key={dept}>
                                        <th
                                            key={dept}
                                            className="border-b-2 hover:initial pt-8 text-lg text-start py-2"
                                            colSpan={6}
                                        >
                                            {dept} - {courses[0].department.name} ({courses.length})
                                        </th>
                                    </tr>
                                    {
                                        courses.map((course, index) => {
                                            const {
                                                id, title, code, unit,
                                            } = course;

                                            return (
                                                <tr key={id} className="border-b hover:bg-gray-50">
                                                    <td className="p-2">{index + 1}</td>
                                                    <td className="p-2">{title}</td>
                                                    <td className="p-2">{code}</td>
                                                    <td className="p-2">{unit}</td>
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
