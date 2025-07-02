import AdminLayout from '@/Layouts/AdminLayout'
import {Head} from '@inertiajs/react'
import PrimaryLink from "@/Components/PrimaryLink.jsx";
import React, {useState} from "react";
import {Select} from "@/Components/SelectDropdown.jsx";
import {useCourse} from "@/hooks/useCourse.js";
import CoursesByLabel from "@/Partials/CoursesByLabel.jsx";
import SelectInput from "@/Components/SelectInput.jsx";


/**
 *
 * @param courses {Course[]}
 * @returns {JSX.Element}
 * @constructor
 */
export default function Courses({ courses }) {

    const [displayedCourses, setDisplayedCourses] = useState(courses);
    const [activeGroupBy, setActiveGroupBy] = useState('level');
    const [searchInputValue, setSearchInputValue] = useState('');

    // Selected options
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedUnits, setSelectedUnits] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedSemesters, setSelectedSemesters] = useState([]);

    const { searchCoursesByKeyword, groupCoursesByLabel } = useCourse();

    const groupKeys = {
        department: (course) => course.department.code,
        unit: course => course.unit,
        level: course => `${course.code.split(' ')[1][0]}00`,
        semester: course => {
            const last2CourseCodeDigits = Number.parseInt(course.code.split(' ')[1].substring(1));
            return (last2CourseCodeDigits % 2 === 0) ? 'RAIN' : 'HARMATTAN';
        }
    }

    const coursesByLabels = {};
    for (const label in groupKeys) {
        coursesByLabels[label] = groupCoursesByLabel(displayedCourses, groupKeys[label]);
    }

    // Options
    const departmentOptions = Object.entries(coursesByLabels.department)
        .reduce((prev, [dept, courses]) => (
            {...prev, [dept]: courses[0].department.name}
        ), {});
    const unitOptions = Object.entries(coursesByLabels.unit)
        .reduce((prev, [unit, courses]) => (
            {...prev, [unit]: `${unit} Unit`}
        ), {});
    const levelOptions = Object.entries(coursesByLabels.level)
        .reduce((prev, [level]) => (
            {...prev, [level]: `${level} Level`}
        ), {});
    const semesterOptions = {
        'HARMATTAN': 'Harmattan Semester',
        'RAIN': 'Rain Semester'
    }

    const selectedLabels = {
        department: [selectedDepartments, groupKeys.department],
        unit: [selectedUnits, groupKeys.unit],
        level: [selectedLevels, groupKeys.level],
        semester: [selectedSemesters, groupKeys.semester]
    }

    const handleSearchInputChange = (event) => {

        const keyword = event.target.value.trim();
        setSearchInputValue(keyword);

        // Search by course title, course code or department
        const searchResults = searchCoursesByKeyword(courses, keyword, (course) => {
            const {
                title, code,
                department: deptCode, name: deptName
            } = course;

            return [title, code, deptCode, deptName];
        });

        setDisplayedCourses(searchResults);
    }

    return (
        <AdminLayout
            header="Courses"
        >
            <Head title="Admin | Courses"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6 text-gray-900 space-y-4">
                            <div className="flex items-center justify-between pb-4 border-b">
                                <h2 className="text-xl font-bold">Courses ({displayedCourses.length})</h2>
                                <div className="flex items-center space-x-2">
                                    <div className="hidden md:block">
                                        <input
                                            type="search"
                                            className="py-2 border text-sm border-gray-300 rounded-md min-w-80"
                                            placeholder="Search courses by title, code or department"
                                            onChange={handleSearchInputChange}
                                            value={searchInputValue}
                                        />
                                    </div>
                                    <PrimaryLink href={route('admin.courses.create')}>Add Courses</PrimaryLink>
                                </div>
                            </div>

                            <div className="md:hidden flex items-center justify-center">
                                <input
                                    type="search"
                                    className="py-2 border text-sm border-gray-300 rounded-md w-full"
                                    placeholder="Search courses by title, code or department"
                                    onChange={handleSearchInputChange}
                                    value={searchInputValue}
                                />
                            </div>

                            <div>

                                {/* Group By */}
                                <div>
                                    <label htmlFor="group-by-select" className="me-2 font-medium">Group By: </label>
                                    <SelectInput
                                        id="group-by-select"
                                        className="border border-gray-300 rounded-md text-sm"
                                        options={{
                                            'department': 'Department',
                                            'unit': 'Unit',
                                            'level': 'Level',
                                            'semester': 'Semester',
                                            'none': 'None'
                                        }}
                                        onChange={(e) => setActiveGroupBy(e.target.value)}
                                        value={activeGroupBy}
                                    />
                                </div>

                            </div>

                            <div className="mt-6 overflow-y-auto min-h-screen">

                                <table className="table-auto w-full">
                                    <thead>
                                    <tr className="font-bold bg-gray-100">
                                        <th className="text-start px-2 py-2 border-r">S/N</th>
                                        <th className="text-start px-2 py-4 border-r">
                                            <div className="flex items-center justify-between">
                                                Title
                                                <button className="p-1 rounded hover:bg-gray-200">&uarr;</button>
                                            </div>
                                        </th>
                                        <th className="text-start px-2 py-4 border-r">
                                            <div className="flex items-center justify-between">
                                                Course Code
                                                <Select
                                                    options={[
                                                        semesterOptions,
                                                        levelOptions
                                                    ]}
                                                    onChange={(selectedOption) => {
                                                        const selectedSemesters = [];
                                                        const selectedLevels = [];

                                                        selectedOption.forEach((option) => {
                                                            if (Object.keys(semesterOptions).includes(option)) {
                                                                selectedSemesters.push(option);
                                                            } else  {
                                                                selectedLevels.push(option);
                                                            }
                                                        });

                                                        setSelectedSemesters(selectedSemesters);
                                                        setSelectedLevels(selectedLevels);
                                                    }}
                                                    className="font-normal"
                                                />
                                            </div>
                                        </th>
                                        <th className="text-start px-2 py-4 border-r">
                                            <div className="flex items-center justify-between">
                                                Unit
                                                <Select
                                                    options={unitOptions}
                                                    onChange={(selectedUnits) => setSelectedUnits((selectedUnits))}
                                                    className="font-normal"
                                                />
                                            </div>
                                        </th>
                                        <th className="text-start px-2 py-4 border-r">
                                            <div className="flex items-center justify-between">
                                                Department
                                                <Select
                                                    options={departmentOptions}
                                                    onChange={(selectedDepartments) => setSelectedDepartments((selectedDepartments))}
                                                    className="font-normal"
                                                />
                                            </div>
                                        </th>
                                        <th className="text-start px-2 py-4 border-r">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        <CoursesByLabel
                                            activeGroupBy={activeGroupBy}
                                            coursesByLabels={coursesByLabels}
                                            selected={selectedLabels}
                                            courses={displayedCourses}
                                        />
                                    }
                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
