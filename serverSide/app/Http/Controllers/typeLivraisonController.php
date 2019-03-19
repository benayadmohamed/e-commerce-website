<?php

namespace App\Http\Controllers;

use App\models\TypeLivraison;
use Illuminate\Http\Request;

class typeLivraisonController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware(['auth:api', 'admin'], ['except' => ['get']]);
    }

    public function get()
    {
        return response()->json(TypeLivraison::all());
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $TypeLivraison = TypeLivraison::findOrFail($input['id']);
        $TypeLivraison->name = $input['name'];
        $TypeLivraison->info = $input['info'];
        $TypeLivraison->save();

        return response()->json(['message' => true]);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $TypeLivraison = new TypeLivraison();
        $TypeLivraison->name = $input['name'];
        $TypeLivraison->info = $input['info'];

        $TypeLivraison->save();

        return response()->json(['message' => true, 'data' => $TypeLivraison]);
    }

    public function delete($id)
    {
        TypeLivraison::find($id)->delete();
        return response()->json(['message' => true]);
    }
}
