<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{

    protected $table = 'paiement';
    public $timestamps = true;

    public function profile()
    {
        return $this->belongsTo('App\models\Profile', 'profile_id');
    }

    public function commande()
    {
        return $this->belongsTo('App\models\Commande', 'commande_id');
    }

}