<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Department extends Model
{
    //

    protected $fillable = [
        'name', // Mechatronics Engineering
        'code', // MCE, TCE, BTC
    ];

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }
}
