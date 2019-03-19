<?php

namespace App\Http\Controllers;

use App\models\Matiere;
use Illuminate\Http\Request;

class MatiereController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth:api', 'admin'], ['except' => ['getMatieres']]);
    }

    public function getMatieres()
    {
        return response()->json(Matiere::all());
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $matiere = Matiere::findOrFail($input['id']);
        $matiere->name = $input['name'];
        $matiere->save();

        return response()->json(['message' => true]);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $matiere = new Matiere();
        $matiere->name = $input['name'];
        $matiere->save();

        return response()->json(['message' => true, 'data' => $matiere]);
    }

    public function delete($id)
    {
        Matiere::find($id)->delete();
        return response()->json(['message' => true]);
    }
}
