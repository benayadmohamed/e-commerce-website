<?php

namespace App\Http\Controllers;

use App\models\Marque;
use Illuminate\Http\Request;

class MarqueController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth:api', 'admin'], ['except' => ['getMarques']]);
    }

    public function getMarques()
    {
        return response()->json(Marque::all());
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $marque = Marque::findOrFail($input['id']);
        $marque->name = $input['name'];
        $marque->save();

        return response()->json(['message' => true]);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $marque = new Marque();
        $marque->name = $input['name'];
        $marque->save();

        return response()->json(['message' => true, 'data' => $marque]);
    }

    public function delete($id)
    {
        Marque::find($id)->delete();
        return response()->json(['message' => true]);
    }
}
