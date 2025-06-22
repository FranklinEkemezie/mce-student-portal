<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

class ResultController extends Controller
{
    //

    public function index(Request $request)
    {
        $student = $request->user()->student;

        $file = Storage::disk('local')->readStream('MCE_2022_DATA_CSV.csv');

        $results = collect();

        $title = fgetcsv($file);
        while ($line = fgetcsv($file)) {

            [, , $regNo] = $line;

            if ($regNo !== $student->reg_no) continue;

            $result = array_combine($title, $line);
            if ($result) {
                $result['year'] = 2022;
            }

            $results[] = $result;
        }

        return $results;
    }
}
