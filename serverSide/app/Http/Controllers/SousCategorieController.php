<?php

namespace App\Http\Controllers;

use App\models\SousCategorie;
use Illuminate\Http\Request;

class SousCategorieController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth:api', 'admin'], ['except' => ['getSousCategories']]);
    }

    public function getSousCategories()
    {
        return response()->json(SousCategorie::all());
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $sousCategorie = SousCategorie::findOrFail($input['id']);
        $sousCategorie->name = $input['name'];
        $sousCategorie->categorie_id = $input['categorie_id'];
        $sousCategorie->save();

        return response()->json(['message' => true]);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $sousCategorie = new SousCategorie();
        $sousCategorie->name = $input['name'];
        $sousCategorie->categorie_id = $input['categorie_id'];
        $sousCategorie->save();

        return response()->json(['message' => true, 'data' => $sousCategorie]);
    }

    public function delete($id)
    {
        SousCategorie::find($id)->delete();
        return response()->json(['message' => true]);
    }
}
