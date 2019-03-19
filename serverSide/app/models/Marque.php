<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Marque extends Model 
{

    protected $table = 'marque';
    public $timestamps = true;

    public function produits()
    {
        return $this->hasMany('App\models\Produit');
    }

}