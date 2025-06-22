<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    //

    protected $fillable = [
        'firstname',
        'lastname',
        'username',
        'reg_no',
        'email',
        'password'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


}
