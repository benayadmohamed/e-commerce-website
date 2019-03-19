<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class SousCategorie extends Model 
{

    protected $table = 'sousCategorie';
    public $timestamps = true;

    public function categories()
    {
        return $this->belongsTo('App\models\Categorie', 'categorie_id');
    }

    public function produits()
    {
        return $this->hasMany('App\models\Produit');
    }

}