<?php

namespace App\Traits;

use App\Models\User;

trait BelongsToUser
{
    //

    public function getUser(): User
    {
        return $this->user?->load('student', 'admin');
    }
}
