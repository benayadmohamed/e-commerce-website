<?php

namespace App\Http\Controllers;

use App\models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class categorieController extends Controller
{
    //

    public function __construct()
    {
        $this->middleware(['auth:api', 'admin'], ['except' => ['getCategories']]);
    }

    public function getCategories()
    {
        // return response()->json(Categorie::all());
        return response()->json(Categorie::with('sousCategories')->get());
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $categorie = Categorie::findOrFail($input['id']);
        $categorie->name = $input['name'];
        $categorie->sexe = $input['sexe'];
        $categorie->save();

        return response()->json(['message' => true]);
    }

    public function save(Request $request)
    {
        try {
            $input = $request->all();
            $categorie = new Categorie();
            $categorie->name = $input['name'];
            $categorie->sexe = $input['sexe'];
            $res = $categorie->save();
            return response()->json(['res' => $res, 'data' => $categorie], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['erreur' => $e], Response::HTTP_NOT_FOUND);
        }
    }

    public function delete($id)
    {
        Categorie::find($id)->delete();
        return response()->json(['message' => true]);
    }
}
