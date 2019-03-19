<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Avis extends Model 
{

    protected $table = 'avis';
    public $timestamps = true;

    public function profile()
    {
        return $this->belongsTo('App\models\Profile');
    }

    public function produits()
    {
        return $this->belongsTo('App\models\Produit');
    }

}