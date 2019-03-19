<?php

namespace App\Http\Controllers;

use App\models\LigneCommande;
use App\models\Profile;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class shoppingCartController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function get(Request $request)
    {
        $user = auth()->user();
        $profile = $user->profile()->first();
        return response()->json(LigneCommande::with(["produit.article.images", "produit.reduction"])->where('profile_id', $profile->id)->whereNull('commande_id')->get());
//        return response()->json($profile->ligneCommandes()->with(["produit"])->whereNull('commande_id')->get());
        //   return response()->json(Profile::find($profile->id)->ligneCommandes());
    }

    public function save(Request $request)
    {
        try {
            $user = auth()->user();
            $profile = $user->profile()->first();
            $LC = new LigneCommande();
            $LC->quantite = $request->quantite;
            $LC->sousTotal = $request->sousTotal;
            $LC->produit_id = $request->produit_id;
            $LC->profile_id = $profile->id;

            $res = $LC->save();
            //  $res = $profile->ligneCommandes()->save($LC);
            return response()->json($res, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['erreur' => $e], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(Request $request)
    {
        try {
            $LC = LigneCommande::find($request->id);
            $LC->quantite = $request->quantite;
            $res = $LC->save();
            return response()->json($res, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['erreur' => $e], Response::HTTP_NOT_FOUND);
        }
    }

    public function delete($id)
    {
        $res = LigneCommande::find($id)->delete();
        return response()->json($res);
    }

    public function deleteAll()
    {
        $user = auth()->user();
        $profile = $user->profile()->first();
        $res = LigneCommande::with(["produit.article.images"])->where('profile_id', $profile->id)->whereNull('commande_id')->delete();
        return response()->json($res);
    }
}
