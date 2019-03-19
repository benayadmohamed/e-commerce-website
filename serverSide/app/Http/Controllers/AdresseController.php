<?php

namespace App\Http\Controllers;

use App\models\Adresse;
use Illuminate\Http\Request;

class AdresseController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth:api');
    }


    public function get()
    {
        $user = auth()->user();
        $profile = $user->profile()->first();
        $adresses = $profile->adresses()->get();
        return response()->json($adresses);
    }

    public function getAPro()
    {
        $user = auth()->user();
        $profile = $user->profile()->first();
        $adresse = $profile->adresses()->where(['type' => 'pro'])->first();
        return response()->json($adresse);
    }

    public function getAPer()
    {
        $user = auth()->user();
        $profile = $user->profile()->first();
        $adresse = $profile->adresses()->where(['type' => 'per'])->first();
        return response()->json($adresse);
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $adresse = Adresse::findOrFail($input['id']);
        $adresse->LName = $input['LName'];
        $adresse->FName = $input['FName'];
        $adresse->phone = $input['phone'];
        $adresse->address = $input['address'];
        $adresse->info = $input['info'];
        $adresse->region_id = $input['region_id'];
        $adresse->ville_id = $input['ville_id'];
        $adresse->save();

        return response()->json(['message' => true]);
    }

}

?>