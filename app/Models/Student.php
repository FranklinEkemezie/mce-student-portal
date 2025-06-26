<?php

namespace App\Models;


use App\Traits\BelongsToUser;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model implements Authenticatable
{
    //

    use BelongsToUser;

    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'reg_no'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    /*
     * Authenticatable Interface method implementation
     */

    public function getAuthIdentifierName(): string
    {
        return 'id';
    }

    public function getAuthIdentifier()
    {
        return $this->getAttribute($this->getAuthIdentifierName());
    }

    public function getAuthPasswordName(): string
    {
        return 'password';
    }

    public function getAuthPassword()
    {
        return $this->user->password ?? null;
    }

    public function getRememberToken()
    {
        return $this->user->getRememberToken();
    }

    public function setRememberToken($value): void
    {
        if ($this->user ?? null) {
            $this->user->setRememberToken($value);
            $this->user->save();
        }
    }

    public function getRememberTokenName()
    {
        return $this->user?->rememberTokenName();
    }
}
