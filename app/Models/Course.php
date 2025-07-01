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
        'unit'
    ];

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
