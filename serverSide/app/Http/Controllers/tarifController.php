<?php

namespace App\Http\Controllers;

use App\models\Tarif;
use Illuminate\Http\Request;

class tarifController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware(['auth:api', 'admin'], ['except' => ['get', 'get2']]);
    }

    public function get($id)
    {
        return response()->json(Tarif::where('typeLivraison_id', $id)->with(['ville'])->get());
    }

    public function get2(Request $request)
    {
        return response()->json(Tarif::where('typeLivraison_id', $request['id'])->where('ville_id', $request['v_id'])->first());
//        return response()->json(Tarif::whereColumn([['typeLivraison_id', $request['id']], ['ville_id', $request['v_id']]])->first());
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $Tarif = Tarif::findOrFail($input['id']);
        $Tarif->montant = $input['montant'];
        $Tarif->typeLivraison_id = $input['typeLivraison_id'];
        $Tarif->ville_id = $input['ville_id'];
        $Tarif->save();

        return response()->json(['message' => true]);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $Tarif = new Tarif();
        $Tarif->montant = $input['montant'];
        $Tarif->typeLivraison_id = $input['typeLivraison_id'];
        $Tarif->ville_id = $input['ville_id'];
        $Tarif->save();

        return response()->json(['message' => true, 'data' => $Tarif]);
    }

    public function delete($id)
    {
        Tarif::find($id)->delete();
        return response()->json(['message' => true]);
    }
}
