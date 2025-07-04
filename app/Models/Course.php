<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Course extends Model
{
    //


    protected $fillable = [
        'code',
        'title',
        'unit',
        'prerequisites'
    ];

    public function getLevelAttribute(): int
    {
        return intval(explode(' ', $this->code)[1][0]) * 100;
    }

    public function getSemesterAttribute(): string
    {
        return (intval(explode(' ', $this->code)[1][-1]) % 2) === 0 ? 'rain' : 'harmattan';
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
}
