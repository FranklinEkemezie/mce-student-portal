import {Head, Link, useForm} from '@inertiajs/react'
import AdminLayout from "@/Layouts/AdminLayout";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import FileDropZone from "@/Components/FileDropZone.jsx";
import {useState} from "react";
import Modal from "@/Components/Modal.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

/**
 *
 * @param courses { Course[] }
 * @returns {JSX.Element}
 * @constructor
 */
export default function Create({ courses }) {

    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful
    } = useForm({
        session: '',
        course: '',
        semester: ''
    });

    const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        setShowSubmitConfirmModal(true);
    }

    const getSemesterFromCourseCode = (courseCode) => {
        const last2CourseCodeDigits = Number.parseInt(courseCode.split(' ')[1].substring(1));
        const semester = (last2CourseCodeDigits % 2 === 0) ? 'Rain' : 'Harmattan';
        return `${semester} Semester`;
    }

    const submitForm = () => {
        setShowSubmitConfirmModal(false); // close the modal

        // Submit form
        alert('Submitting data...');
    }

    return (
        <AdminLayout
            header="Upload Result"
        >
            <Head title="Publish Result"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">

                        <form
                            encType="multipart/form-data"
                            className="mt-6 space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <InputLabel htmlFor="title" value="Title"/>

                                <TextInput
                                    id="title"
                                    className="mt-1 block w-full"
                                    value={data.session && data.course && (
                                        `${data.course} Results for ${data.session} (${getSemesterFromCourseCode(data.course)}) Academic Session`
                                    )}
                                    placeholder="Choose a course and session to automatically display the title"
                                    autoComplete="title"
                                    disabled={true}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 space-y-2 md:space-y-0 gap-2">
                                <div>
                                    <InputLabel htmlFor="session" value="Session"/>

                                    <SelectInput
                                        name="session"
                                        id="session"
                                        options={{
                                            // value: display label
                                            '2022-2023': '2022/2022',
                                            '2023-2024': '2023/2024',
                                            '2024-2025': '2024/2025'
                                        }}
                                        className="mt-1 w-full"
                                        onChange={(e) => setData('session', e.target.value)}
                                    />

                                    <InputError className="mt-2" message={errors.session}/>
                                </div>

                                <div>
                                    <InputLabel htmlFor="semester" value="Semester"/>

                                    <TextInput
                                        name="semester"
                                        id="semester"
                                        placeholder="Choose a course to to automatically display the semester"
                                        disabled
                                        className="mt-1 w-full"
                                        value={data.course && getSemesterFromCourseCode(data.course)}
                                    />

                                    <InputError className="mt-2" message={errors.session}/>
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="course" value="Course"/>

                                <SelectInput
                                    name="course"
                                    id="course"
                                    options={courses.reduce((options, {code, title}) => (
                                        {...options, [code]: `${code} - ${title}`}
                                    ), {})}
                                    className="mt-1"
                                    onChange={(e) => setData('course', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="result" value="Result File" />
                                <div className="text-sm opacity-75 my-2">
                                    Kindly note that only valid CSV files are allowed.
                                    A file is considered valid if:
                                    <ul className="list-disc list-inside">
                                        <li>It is a Comma Separated Values (CSV) file.</li>
                                        <li>It contains columns with the following headers:
                                            <strong>REG. NO.</strong>,&nbsp;
                                            <strong>LAB</strong>, &nbsp;
                                            <strong>TEST</strong>, &nbsp;
                                            <strong>EXAM</strong>, &nbsp;
                                            <strong>TOTAL</strong>.
                                        </li>
                                    </ul>
                                </div>

                                <FileDropZone
                                    className="mt-1"
                                    accept="text/csv"
                                    multiple={false}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton
                                    disabled={processing}
                                    type="submit"
                                >
                                    Publish Result
                                </PrimaryButton>

                                <Modal show={showSubmitConfirmModal}>
                                    <div className="p-4 mx-auto w-full">
                                        <div className="border-b pb-2">
                                            <h3 className="font-semibold text-lg">Confirm Submission</h3>
                                        </div>
                                        <div className="py-4">
                                            <p>Are you sure you want to submit?</p>
                                        </div>
                                        <hr/>
                                        <div className="py-2 flex items-center justify-between md:justify-end space-x-2">
                                            <PrimaryButton
                                                onClick={submitForm}
                                            >
                                                Continue
                                            </PrimaryButton>
                                            <DangerButton
                                                onClick={(e) => setShowSubmitConfirmModal(false)}
                                            >Cancel</DangerButton>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </form>

                    </div>

                </div>
            </div>


        </AdminLayout>
    )
}
