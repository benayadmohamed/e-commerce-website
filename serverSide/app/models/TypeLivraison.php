<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class TypeLivraison extends Model
{

    protected $table = 'typeLivraison';
    public $timestamps = true;

    public function villes()
    {
        return $this->belongsToMany('App\models\Ville', 'tarif');
    }

    public function livraisons()
    {
        return $this->hasMany('App\models\Livraison');
    }

}