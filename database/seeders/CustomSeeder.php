<?php

namespace Database\Seeders;

use Exception;
use Generator;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
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

        $trimCSVLine = fn (array $line): array => (
            Arr::map($line, fn(string $col) => trim($col))
        );

        $headers = fgetcsv($file);
        if (! $headers) {
            throw new \InvalidArgumentException(
                "Invalid CSV file. No headers could be read.
                Missing required columns: " . implode(', ', $requiredHeaders)
            );
        }

        $headers = $trimCSVLine($headers);
        $missing = array_diff($requiredHeaders, $headers);

        if (! empty($missing)) {
            throw new \InvalidArgumentException(
                'Missing required columns: [' . implode(', ', $missing) .
                 '] in [' . implode(', ', $headers) . '] at' . storage_path($path)
            );
        }

        while ($line = fgetcsv($file)) {
            $data = [];

            $line = $trimCSVLine($line);
            $csvData = array_combine($headers, $line);
            foreach ($requiredHeaders as $header) {
                $data[$header] = $csvData[$header];
            }

            yield $data;
        }
    }

    /**
     * Load seed data from a directory containing CSV files
     * @return Generator
     * @throws FileNotFoundException
     */
    protected static function loadSeedDataFromCSVDir(
        string $dirPath,
        array $requiredHeaders,
        ?string $filenamePattern=null,
        ?string $sampleFileName=null
    ): Generator
    {
        if (! Storage::exists($dirPath)) {
            throw new FileNotFoundException(
                "Directory path: $dirPath not found"
            );
        }

        foreach (Storage::files($dirPath) as $file) {

            if (preg_match($filenamePattern, $file, $matches) === false) {
                throw new \InvalidArgumentException(
                    "Unacceptable filename format: $file.
                    Filename must name according to the pattern: $filenamePattern. " .
                    $sampleFileName ? "e.g. $sampleFileName" : ''
                );
            }

            $csvFileRows = self::loadSeedDataFromCSV($file, $requiredHeaders);
            foreach ($csvFileRows as $row) {

                yield [
                    'matches'   => $matches,
                    'row'       => $row
                ];
            }
        }
    }

}
