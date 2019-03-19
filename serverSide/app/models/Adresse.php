<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Adresse extends Model
{

    protected $table = 'adresse';
    public $timestamps = true;

    public function profile()
    {
        return $this->belongsTo('App\models\Profile', 'profile_id');
    }

    public function ville()
    {
        return $this->belongsTo('App\Ville', 'ville_id');
    }

    public function region()
    {
        return $this->belongsTo('App\Region', 'region_id');
    }
}