import Layout from '@/Layouts/StudentLayout'
import {Head, useForm} from '@inertiajs/react'
import DangerLink from "@/Components/DangerLink.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import React from "react";

export default function Register({ courses }) {

    const { data, setData, processing } = useForm({
        courses: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(data);
    }

    const getTotalSelectedCourseUnits = () => {

        return courses.filter(course => data.courses.includes(course.code))
            .reduce(function (total, course) {
                return total + (parseInt(course.unit))
            }, 0);
    }

    const handleCourseSelectCheckbox = (event) => {

        if (event.target.checked) {
            setData('courses', [...data.courses, event.target.value]);
        } else {
            setData((previousData) => {
               const updatedCourses = previousData.courses
                   .filter(courseCode => courseCode !== event.target.value);

               return {...previousData, courses: [...updatedCourses]};
            });
        }
    }

    return (
        <Layout
            header="Register Courses"
        >
            <Head title="Course Registration"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6 text-gray-">
                            <div className="flex items-center justify-between border-b pb-4">
                                <h2 className="text-xl font-bold">
                                    📝 Select Courses
                                    ({getTotalSelectedCourseUnits()} of 24 units)
                                </h2>
                                <div>
                                    <DangerLink href={route('courses.register')}>Cancel</DangerLink>
                                </div>
                            </div>

                            <div className="mt-6">

                                <form onSubmit={handleSubmit}>

                                    <div className="space-y-6">

                                        <div className="overflow-y-auto">
                                            <table className="table-auto w-full">
                                                <thead>
                                                <tr className="font-bold bg-gray-100 ">
                                                    <th className="text-start px-2 py-4">S/N</th>
                                                    <th className="text-start px-2 py-4">Register</th>
                                                    <th className="text-start px-2 py-4">Course Code</th>
                                                    <th className="text-start px-2 py-4">Course Title</th>
                                                    <th className="text-start px-2 py-4">Course Unit</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    courses.map(({ code, title, unit }, index) => {

                                                        return (
                                                            <tr key={code} className="border-b hover:bg-gray-50">
                                                                <td className="p-2 py-3">{index + 1}</td>
                                                                <td className="p-2">
                                                                    <input
                                                                        type="checkbox"
                                                                        value={code}
                                                                        className="rounded-sm"
                                                                        onChange={handleCourseSelectCheckbox}
                                                                    />
                                                                </td>
                                                                <td className="p-2">{code}</td>
                                                                <td className="p-2">{title}</td>
                                                                <td className="p-2">{unit}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>

                                        <div>
                                            <PrimaryButton disabled={processing} type="submit">
                                                Submit
                                            </PrimaryButton>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </Layout>
    )
}
