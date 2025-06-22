<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    //

    protected $fillable = [
        'name', // Mechatronics Engineering
        'code', // MCE, TCE, BTC
    ];
}
