<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Course extends Model
{
    //


    protected $fillable = [
        'code',
        'title',
        'unit',
    ];

    public function getLevelAttribute(): int
    {
        return intval(explode(' ', $this->code)[1][0]) * 100;
    }

    public function getSemesterAttribute(): string
    {
        return (intval(explode(' ', $this->code)[1][-1]) % 2) === 0
            ? 'rain' : 'harmattan';
    }

    public function scopeForLevelAndSemester(Builder $query, int|string $level, string $semester): Builder
    {
        $semesterCondition = $semester === 'harmattan' ?
            'MOD(RIGHT(code, 1), 2) = 1' : 'MOD(RIGHT(code, 1), 2) = 0';

        return $query
            ->whereRaw('SUBSTRING(code, 5, 1) * 100 = ?', [$level])
            ->whereRaw($semesterCondition);
    }


    /**
     * The department in charge of the course
     *
     * @return BelongsTo
     */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function result(): HasOne
    {
        return $this->hasOne(Result::class);
    }

    public function prerequisites(): BelongsToMany
    {
        return $this->belongsToMany(Course::class,
            'course_prerequisites', 'course_id', 'prerequisite_id'
        );
    }

    public function requiredBy(): BelongsToMany
    {
        return $this->belongsToMany(Course::class,
            'course_prerequisites', 'prerequisite_id', 'course_id'
        );
    }

    public function registeredStudents(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'course_registrations')
            ->withPivot(['session']);
    }
}
