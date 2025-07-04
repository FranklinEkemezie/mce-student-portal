import Layout from '@/Layouts/StudentLayout'
import {Head, useForm} from '@inertiajs/react'
import DangerLink from "@/Components/DangerLink.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import React from "react";
import Toast from "@/Components/Toast.jsx";
import ToastMessage from "@/Components/ToastMessage.jsx";

export default function Register({ courses, semester, session }) {

    const { data, setData, post, errors, processing } = useForm({
        courses: courses.filter(course => course.is_registered).map(course => course.code),
        semester,
        session
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('registered-courses.store'))
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

    console.log(errors);

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
                                    <DangerLink href={route('registered-courses.create')}>Cancel</DangerLink>
                                </div>
                            </div>

                            <div className="mt-6">

                                {errors.courses && (
                                    <div className="py-2 text-red-500">
                                        {errors.courses}
                                    </div>
                                )}

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
                                                    courses.map(({ code, title, unit, is_registered }, index) => {

                                                        return (
                                                            <tr key={code} className="border-b hover:bg-gray-50">
                                                                <td className="p-2 py-3">{index + 1}</td>
                                                                <td className="p-2">
                                                                    <input
                                                                        type="checkbox"
                                                                        value={code}
                                                                        className="rounded-sm"
                                                                        onChange={handleCourseSelectCheckbox}
                                                                        checked={data.courses.includes(code)}
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
