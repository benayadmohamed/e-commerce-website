<?php

namespace App\Http\Controllers;

use App\models\Commande;
use Illuminate\Http\Request;

class CommandeAdminController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'admin']);
    }

    public function get(Request $request)
    {/*->with(["article.images"])*/

        $cmd = Commande::where('statut', $request->statut)->orderBy($request->sortAct, $request->sort);

        $cmd->whereHas('profile', function ($query) use ($request) {
            $query->whereHas('adresses', function ($query2) use ($request) {
                $query2->where('LName', 'like', $request->filter . '%')->orWhere('FName', 'like', $request->filter . '%');
            });
        });
        return response()->json($cmd->with(["paiement", "livraison.typeLivraison", "profile.adresses.ville", "profile.adresses.region", "ligneCommandes.produit.article.images", "ligneCommandes.produit.reduction"])->paginate($request->perPage));

    }


    public function getById($id)
    {/*->with(["article.images"])*/

        $cmd = Commande::with(["paiement", "livraison.typeLivraison", "profile.adresses.ville", "profile.adresses.region", "ligneCommandes.produit.article.images", "ligneCommandes.produit.reduction"])->find($id);

        if ($cmd == null)
            return null;
        return response()->json($cmd);
        // return response()->json($request);
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $Commande = Commande::findOrFail($input['id']);
        $Commande->statut = $input['statut'];
        $Commande->save();

        return response()->json(['message' => true]);
    }

    public function delete($id)
    {
        Commande::find($id)->delete();
        return response()->json(['message' => true]);
    }

}
