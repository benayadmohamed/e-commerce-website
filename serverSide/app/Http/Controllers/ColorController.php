<?php

namespace App\Http\Controllers;

use App\models\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'admin'], ['except' => ['getColors']]);
    }

    public function getColors()
    {
        return response()->json(Color::all());
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $color = Color::findOrFail($input['id']);
        $color->name = $input['name'];
        $color->save();

        return response()->json(['message' => true]);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $color = new Color();
        $color->name = $input['name'];
        $color->save();

        return response()->json(['message' => true, 'data' => $color]);
    }

    public function delete($id)
    {
        Color::find($id)->delete();
        return response()->json(['message' => true]);
    }
}
