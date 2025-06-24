<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Admin extends Model
{
    //

    protected $fillable = [
        'level'
    ];

    public function user(): BelongsTo
    {
        $this->belongsTo(User::class);
    }
}
