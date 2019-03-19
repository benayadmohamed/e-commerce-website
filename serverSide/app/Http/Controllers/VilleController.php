<?php

namespace App\Http\Controllers;

use App\Ville;
use Illuminate\Http\Request;

class VilleController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware(['auth:api', 'admin'], ['except' => ['getVilles']]);
    }

    public function getVilles()
    {
        return response()->json(Ville::all());
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $Ville = Ville::findOrFail($input['id']);
        $Ville->name = $input['name'];
        $Ville->save();

        return response()->json(['message' => true]);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $Ville = new Ville();
        $Ville->name = $input['name'];
        $Ville->save();

        return response()->json(['message' => true, 'data' => $Ville]);
    }

    public function delete($id)
    {
        Ville::find($id)->delete();
        return response()->json(['message' => true]);
    }
}
