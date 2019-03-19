<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    //
    public function adresses()
    {
        return $this->hasMany('App\models\Adresse');
    }
}
