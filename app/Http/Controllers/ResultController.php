<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\Student;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ResultController extends Controller
{

    public function index()
    {

        /**
         * @var Student $student The authenticated student
         */
        $student = auth('student')->user();

        $results = Result::query()
            ->with('course')
            ->get();

        $studentResults = [
            // [course, result]
        ];
        foreach ($results as $result) {
            $resultFilename = $result->filename;
            $resultFile = Storage::readStream($resultFilename);

            // Read off header
            $headers = fgetcsv($resultFile);

            //
            $shouldSearch = true;
            while ($shouldSearch && $line = fgetcsv($resultFile)) {

                $resultRow = array_combine($headers, $line);
                [
                    'REG. NO.' => $regNo
                ] = $resultRow;

                if ($regNo === $student->reg_no) {
                    $studentResults[] = [$result->course, $resultRow];
                    $shouldSearch = false;
                }
            }

        }

        return inertia('Student/Result/Index', [
            'results' => $studentResults
        ]);
    }
}
