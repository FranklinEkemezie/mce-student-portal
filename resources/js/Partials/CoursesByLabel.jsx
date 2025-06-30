import React from "react";
import SecondaryLink from "@/Components/SecondaryLink.jsx";

/**
 *
 * @param activeGroupBy
 * @param coursesByLabels
 * @param selected
 * @param courses { Course[] }
 * @returns {{courses}|JSX.Element}
 * @constructor
 */
export default function CoursesByLabel({ activeGroupBy, coursesByLabels, selected, courses }) {

    const coursesByActiveLabel = coursesByLabels[activeGroupBy];

    /**
     *
     * @param course { Course }
     * @returns {boolean}
     */
    const shouldShowCourse = (course) => {
        let flag = true;
        for (const label in selected) {
            const [selectedLabelOptions, getKey] = selected[label];

            flag = flag && (
                selectedLabelOptions.length === 0 ||
                selectedLabelOptions.some(value => `${value}` === `${getKey(course)}`)
            );

            if (! flag) return false;
        }

        return true;
    }

    if (activeGroupBy === 'none') {
        return (
            <>
                {
                    courses.map((course, index) => (
                        <CourseRow key={course.id} sNo={index + 1} course={course} />
                    ))
                }
            </>
        );
    }

    return (
        <>
            {
                Object.entries(coursesByActiveLabel)
                    .map(([label, courses]) => (
                        <React.Fragment key={label}>
                            {
                                courses.some(course => shouldShowCourse(course)) && (
                                    <CourseGroupHeader label={label} />
                                )
                            }
                            {
                                courses.map((course, index) => (shouldShowCourse(course) && (
                                    <CourseRow key={course.id} sNo={index + 1} course={course} />
                                )))
                            }
                        </React.Fragment>
                    ))
            }
        </>
    )
}

/**
 *
 * @param sNo
 * @param course {Course}
 * @returns {JSX.Element}
 * @constructor
 */
function CourseRow({ sNo, course: { id, title, code, unit, department: { code: deptCode } } }) {

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="p-2">{sNo}</td>
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

}

function CourseGroupHeader({ label }) {

    return (
        <tr>
            <th
                className="border-b-2 hover:initial pt-8 text-lg text-start py-2"
                colSpan={6}
            >
                {label}
            </th>
        </tr>
    )
}
