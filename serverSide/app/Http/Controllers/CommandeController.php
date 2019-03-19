<?php

namespace App\Http\Controllers;

use App\models\Article;
use App\models\Commande;
use App\models\LigneCommande;
use App\models\Livraison;
use App\models\Paiement;
use App\Notifications\CommandeNotification;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class CommandeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }


    public function get(Request $request)
    {
        $user = auth()->user();
        $profile = $user->profile()->first();
        $commandes = $profile->commandes()
            ->where('statut', $request->statut)
            ->orderBy($request->sortAct, $request->sort)
            ->with(["paiement",
                "livraison.typeLivraison",
                "profile.adresses.ville",
                "profile.adresses.region",
                "ligneCommandes.produit.article.images",
                "ligneCommandes.produit.reduction"])
            ->paginate($request->perPage);

        return response()->json($commandes);
    }

    public function saveCash(Request $request)
    {
        $res = DB::transaction(function () use ($request) {
            $res = array();
            $input = $request->all();
            $user = auth()->user();
            $profile = $user->profile()->first();
            $commande = new Commande();
            $commande->total = $request->total;
            $commande->profile_id = $profile->id;
            $commande->statut = $request->statut;
            $commande->dateC = new \DateTime();
            $commande->save();
            $livraison = new Livraison();
            $livraison->typeLivraison_id = $input['livraison']['typeLivraison_id'];
            $commande->livraison()->save($livraison);

            $paiement = new Paiement();
            $paiement->type = $input['paiement']['type'];
            $paiement->profile_id = $profile->id;
            $commande->paiement()->save($paiement);

            $ligneCommandes = $input['ligneCommandes'];

            foreach ($ligneCommandes as $ligneCommande) {
                $lc = LigneCommande::find($ligneCommande['id']);
                $lc->commande_id = $commande->id;
                $lc->sousTotal = $ligneCommande['sousTotal'];
                $article = Article::where('produit_id', $ligneCommande['produit_id'])->first();
                $article->stock -= $ligneCommande['quantite'];
                $article->save();
                $res[] = $article;
                $lc->save();
            }
            /*  $admin = User::whereHas('roles', function ($query) use ($input) {
                  $query->where('name', 'admin');
              })->get();
              Notification::send($admin, new CommandeNotification($commande));*/
            $newRes = ['articles' => $res, 'idCmd' => $commande->id];
            return $newRes;
        });

        return response()->json($res);
    }


}
