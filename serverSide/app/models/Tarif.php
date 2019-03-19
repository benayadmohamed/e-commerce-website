<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Tarif extends Model
{

    protected $table = 'tarif';
    public $timestamps = true;

    public function ville()
    {
        return $this->belongsTo('App\Ville', 'ville_id');
    }

    public function typeLivraison()
    {
        return $this->belongsTo('App\models\TypeLivraison', 'typeLivraison_id');
    }

}