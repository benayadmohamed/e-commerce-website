<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class LigneCommande extends Model
{

    protected $table = 'ligneCommande';
    public $timestamps = true;

    public function commande()
    {
        return $this->belongsTo('App\models\Commande', 'commande_id');
    }

    public function profile()
    {
        $this->belongsTo('App\models\Profile', 'profile_id');
    }

    public function produit()
    {
        return $this->belongsTo('App\models\Produit', 'produit_id');
    }

}