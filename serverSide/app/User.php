<?php

namespace App;

use App\models\Profile;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function roles()
    {
        return $this->belongsToMany('App\Role');
    }

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }


    /**
     * @param string|array $roles
     */

    public function authorizeRoles($roles)

    {

        if (is_array($roles)) {

            return $this->hasAnyRole($roles) ||
                abort(401, 'This action is unauthorized.');

        }

        return $this->hasRole($roles) ||
            abort(401, 'This action is unauthorized.');

    }

    /**
     * Check multiple roles
     * @param array $roles
     */

    public function hasAnyRole($roles)

    {

        return null !== $this->roles()->whereIn('name', $roles)->first();

    }

    /**
     * Check one role
     * @param string $role
     */

    public function hasRole($role)

    {

        return null !== $this->roles()->where('name', $role)->first();

    }

    public function isAdmin()
    {
        return $this->roles();
    }
}
