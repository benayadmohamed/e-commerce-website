<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ville extends Model
{
    //
    public function adresses()
    {
        return $this->hasMany('App\models\Adresse');
    }

    public function typeLivraisons()
    {
        return $this->belongsToMany('App\models\TypeLivraison', 'tarif');
    }

}
