<?php

namespace App\Http\Requests;

use App\Models\Course;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class RegisterCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return ! auth('student')->guest();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'courses'   => ['required', 'array'],
            'courses.*' => ['required', 'exists:courses,code'],
            'semester'  => ['required', 'in:harmattan,rain'],
            'session'   => ['required', 'regex:/^\d{4}-\d{4}$/']
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $courseCodes = $this->input('courses');

            // Ensure that the total course unit point is
            // within the acceptable range (min. 21 and max. 24)
            $totalGradePoint = collect($courseCodes)->reduce(function (int $total, string $courseCode) {
                $course = Course::query()->where('code', $courseCode)->first();
                return $total + (int) $course->unit;
            }, 0);

            [$minTotalGradePoint, $maxTotalGradePoint] = [18, 24];
            if ($totalGradePoint < $minTotalGradePoint) {
                $validator->errors()->add('courses',
                    "Total grade point [$totalGradePoint] is below minimum grade point of $minTotalGradePoint"
                );
            }

            if ($totalGradePoint > $maxTotalGradePoint) {
                $validator->errors()->add('courses',
                    "Total grade point [$totalGradePoint] is above maximum grade point of $maxTotalGradePoint"
                );

            }

            // Ensure that the user has not registered any of the course before
            $studentId  = $this->user('student')->id;
            $session    = $this->input('session');
            $courseIds  = Course::query()
                ->whereIn('code', $courseCodes)
                ->pluck('id', 'code'); // [code => id]

            $alreadyRegisteredCourses = [];
            foreach ($courseCodes as $courseCode) {
                $courseId = $courseIds[$courseCode];
                if (DB::table('course_registrations')
                    ->where('student_id', $studentId)
                    ->where('course_id', $courseId)
                    ->where('session', $session)
                    ->exists()
                ) {
                    $alreadyRegisteredCourses[] = $courseCode;
                }
            }
            if (! empty($alreadyRegisteredCourses)) {
                $validator->errors()->add('courses',
                    "You have already registered the following courses: " .
                    implode(', ', $alreadyRegisteredCourses)
                );
            }

        });
    }
}
