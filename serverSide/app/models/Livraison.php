<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Livraison extends Model 
{

    protected $table = 'livraison';
    public $timestamps = true;

    public function commande()
    {
        return $this->belongsTo('App\models\Commande', 'commande_id');
    }

    public function typeLivraison()
    {
        return $this->belongsTo('App\models\TypeLivraison', 'typeLivraison_id');
    }

}