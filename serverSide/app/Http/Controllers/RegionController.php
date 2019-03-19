<?php

namespace App\Http\Controllers;

use App\Region;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    //


    /**
     * RegionController constructor.
     */
    public function __construct()
    {
        $this->middleware(['auth:api', 'admin'], ['except' => ['getRegions']]);
    }

    public function getRegions()
    {
//        return response()->json(Region::with()->get()->paginate(1));
        return response()->json(Region::all());
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $region = Region::findOrFail($input['id']);
        $region->name = $input['name'];
        $region->save();

        return response()->json(['message' => true]);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $region = new Region();
        $region->name = $input['name'];
        $region->save();

        return response()->json(['message' => true, 'data' => $region]);
    }

    public function delete($id)
    {
        Region::find($id)->delete();
        return response()->json(['message' => true]);
    }

}
