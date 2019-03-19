<?php

namespace App\Http\Controllers;

use App\models\Reduction;
use Illuminate\Http\Request;

class reductionController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware(['auth:api', 'admin']);
    }

    public function get()
    {
        return response()->json(Reduction::all());
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $Reduction = Reduction::findOrFail($input['id']);
        $Reduction->valeurPourcentage = $input['valeurPourcentage'];
        $Reduction->save();

        return response()->json(['message' => true]);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $Reduction = new Reduction();
        $Reduction->valeurPourcentage = $input['valeurPourcentage'];
        $Reduction->save();

        return response()->json(['message' => true, 'data' => $Reduction]);
    }

    public function delete($id)
    {
        Reduction::find($id)->delete();
        return response()->json(['message' => true]);
    }
}
