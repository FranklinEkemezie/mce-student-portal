<?php

namespace Database\Seeders;

use Exception;
use Generator;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class CustomSeeder extends Seeder
{

    /**
     * @throws FileNotFoundException
     * @throws Exception
     */
    protected static function loadSeedDataFromCSV(
        string $path,
        array $requiredHeaders
    ): Generator
    {

        // Ensure the file exists
        if (! Storage::exists($path)) {
            throw new FileNotFoundException(
                'CSV file not found at: ' . storage_path("app/private/$path")
            );
        }

        // Ensure it is a valid CSV file
        $mime = Storage::mimeType($path);
        if (! str_ends_with($path, '.csv') || ! in_array($mime, ['text/plain', 'text/csv'])) {
            throw new \InvalidArgumentException('File is not a CSV');
        }

        // Ensure it includes required columns
        $file = Storage::disk('local')->readStream($path);
        if (! $file) {
            throw new Exception('Could not read file');
        }

        $headers = fgetcsv($file);
        $missing = array_diff($requiredHeaders, $headers);

        if (! empty($missing)) {
            throw new \InvalidArgumentException(
                'Missing required columns: ' . implode(', ', $missing)
            );
        }

        while ($line = fgetcsv($file)) {
            $data = [];

            $csvData = array_combine($headers, $line);
            foreach ($requiredHeaders as $header) {
                $data[$header] = $csvData[$header];
            }

            yield $data;
        }
    }

}
