<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Translation\PotentiallyTranslatedString;

class CoursesExist implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
        $courses = explode(',', $value);
        foreach ($courses as $course) {
            $course = trim($course);
            $validator = Validator::make(['code' => $course], [
                'code' => 'exists:courses,code'
            ]);

            $invalidCourses = implode(', ', $validator->invalid());
            if ($invalidCourses) {
                $fail("The courses '$invalidCourses' does not exist");
            }
        }
    }
}
