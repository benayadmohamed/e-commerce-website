<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{

    protected $table = 'commande';
    public $timestamps = true;

    public function profile()
    {
        return $this->belongsTo('App\models\Profile', 'profile_id');
    }

    public function produits()
    {
        return $this->belongsToMany('App\models\Produit', 'LigneCommande');
    }

    public function paiement()
    {
        return $this->hasOne('App\models\Paiement');
    }

    public function livraison()
    {
        return $this->hasOne('App\models\Livraison');
    }

    public function ligneCommandes()
    {
        return $this->hasMany('App\models\LigneCommande');
    }

}