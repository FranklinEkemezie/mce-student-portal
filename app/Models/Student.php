<?php

namespace App\Models;


use App\Traits\BelongsToUser;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;

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

    public function registeredCourses(?string $session=null, ?string $semester=null): BelongsToMany
    {
        $relationship =  $this->belongsToMany(Course::class, 'course_registrations')
            ->withPivot(['session']);
        if ($session) {
            $relationship = $relationship->where('session', $session);
        }
        if ($semester) {
            // TODO: Filter registered courses by semester
//            $relationship = $relationship->whereAttachedTo(Course::class)
        }

        return $relationship;
    }

    /**
     * Returns a list of registered courses grouped by semester per session.
     * @param array $extras An associative array of extra field to add to the group. The key
     * should be the label or key and the value may be callable (accepting the list of courses, the current
     * session, and the semester) or any value.
     * @return Collection
     */
    public function groupedRegisteredCourses(array $extras=[]): Collection
    {
        return $this->registeredCourses()->get()
            ->groupBy(fn($course) => ["{$course->pivot->session} $course->semester"])
            ->map(function (Collection $courses, string $sessionSemesterGroup) use ($extras) {
                [$session, $semester] = explode(' ', $sessionSemesterGroup);

                $extraValues = [];
                foreach ($extras as $key => $extra) {
                    $extraValues[$key] = is_callable($extra) ? $extra(
                        $courses, $session, $semester
                    ) : $extra;
                }

                return array_merge(
                    [
                        'session'   => $session,
                        'semester'  => $semester,
                        // students may borrow/add courses which is not usually offered
                        // in their current level (e.g. carry over).
                        // We assume course registration is independent of level (for now)
                        // and students can register any course even if it's not in their level.
                        // Here, for simplicity, we send the level of the first course in the
                        // group of courses.
                        'level'     => $courses[0]->level,
                        'courses'   => $courses
                    ],
                    $extraValues
                );
            })
            ->values();
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
