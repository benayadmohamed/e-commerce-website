<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{

    protected $table = 'categorie';
    public $timestamps = true;

    public function sousCategories()
    {
        return $this->hasMany('App\models\SousCategorie');
    }

    public function produits()
    {
        return $this->hasMany('App\models\Produit');
    }

}