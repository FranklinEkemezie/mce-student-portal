<?php

namespace App\Http\Requests;

use App\Models\Course;
use App\Rules\CoursesExist;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Validator;

class StoreCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return ! auth('admin')->guest();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {

        $requestData = $this->all();
        $courses = array_values($requestData);

        // Share with other methods
        $this->merge(['courses' => $courses]);

        return [
            'courses'               => ['required', 'array', 'min:1'],

            'courses.*.title'       => ['required', 'string', 'max:255'],
            'courses.*.code'        => ['required', 'regex:/^[A-Z]{3} \d{3}$/'],
            'courses.*.unit'        => ['required', 'integer', 'min:1', 'max:10'],
            'courses.*.level'       => ['required', 'in:100,200,300,400,500,600,700,800,900'],
            'courses.*.semester'    => ['required', 'in:harmattan,rain'],
            'courses.*.department'  => ['required', 'exists:departments,code'],
            'courses.*.prerequisites'=> ['nullable', 'string', new CoursesExist()]
        ];
    }

    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw ValidationException::withMessages([
            'courseFormErrors' => [$this->mapErrorsToFormIds($validator)]
        ]);
    }

    public function withValidator(Validator $validator): void
    {

        $validator->after(function(Validator $validator) {

            $courses = $this->input('courses');
            foreach ($courses as $index => $course) {

                $courseCode = $course['code'];
                $courseCodeDigits = explode(' ', $courseCode)[1] ?? '';
                $lastDigit = intval(substr($courseCodeDigits, -1));

                $expectedLevel = intval(substr($courseCodeDigits, 0, 1)) * 100;
                $expectedSemester = $lastDigit % 2 === 0 ? 'rain' : 'harmattan';

                // Ensure level matches
                if ((int) $course['level'] !== $expectedLevel) {
                    $validator->errors()->add(
                        "courses.$index.level",
                        "Level does not match course code."
                    );
                }

                // Ensure semester matches
                if ($course['semester'] !== $expectedSemester) {
                    $validator->errors()->add(
                        "courses.$index.semester",
                        "Semester does not match course code."
                    );
                }

                // Ensure prerequisites courses (if provided) come before the current course
                if (! empty(trim($course['prerequisites']))) {

                    $prerequisitesCourses = explode(',', $course['prerequisites']);
                    $invalidPrerequisitesCourses = [];
                    foreach ($prerequisitesCourses as $prerequisitesCourseCode) {

                        $prerequisitesCourse = Course::query()
                            ->where('code', $prerequisitesCourseCode)
                            ->first();

                        if ($prerequisitesCourse->level > (int) $course['level']) {
                            $invalidPrerequisitesCourses[] = $prerequisitesCourseCode;
                        }

                        $semesterPriority = [
                            'harmattan' => 1,   // 'harmattan' semester comes first,
                            'rain'      => 2    // then followed by 'rain' semester
                        ];
                        if (
                            $prerequisitesCourse->level === (int) $course['level'] &&
                            // the logic is that, if the prerequisite course is taken in
                            // the same level, then it must be taken in the prior semester
                            $semesterPriority[$prerequisitesCourse->semester] >=
                            $semesterPriority[$course['semester']]
                        ) {
                            $invalidPrerequisitesCourses[] = $prerequisitesCourseCode;
                        }
                    }

                    if (! empty($invalidPrerequisitesCourses)) {
                        $validator->errors()->add(
                            "courses.$index.prerequisites",
                            "The following courses: " .
                            join(', ', $invalidPrerequisitesCourses) .
                            " cannot be prerequisites for $courseCode"
                        );
                    }
                }

            }
        });
    }

    public function mapErrorsToFormIds(Validator $validator): array
    {
        $errors = [];
        $messages = $validator->messages();
        $courseFormIds = array_keys($this->all());

        foreach ($messages->toArray() as $field => $fieldErrors) {

            preg_match('/^courses\.(\d+)\.(.+)$/', $field, $matches);

            $index = (int)$matches[1];
            $attribute = $matches[2];
            $courseFormId = $courseFormIds[$index];

            if (!isset($errors[$courseFormId])) {
                $errors[$courseFormId] = [];
            }

            $fieldError = str_replace("courses.$index.", '', $fieldErrors[0]);
            $errors[$courseFormId][$attribute] = $fieldError;
        }

        return $errors;
    }
}
