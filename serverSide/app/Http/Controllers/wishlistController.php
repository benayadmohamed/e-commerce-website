<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class wishlistController extends Controller
{
    //

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function get(Request $request)
    {
        $user = auth()->user();
        $profile = $user->profile()->first();
        return response()->json($profile->poduitsWishlist()->with(["categorie", "categorie.sousCategories", "article.images", "article.colors", "article.matieres"])->paginate($request->perPage));
    }

    public function save(Request $request)
    {
        $user = auth()->user();
        $profile = $user->profile()->first();
        $res = $profile->poduitsWishlist()->sync($request->ids);
        if ($res['attached']) {
            return response()->json($res, Response::HTTP_OK);
        } else {
            return response()->json($res, Response::HTTP_NOT_FOUND);
        }
    }

    public function save2(Request $request)
    {
        $res = DB::transaction(function () use ($request) {
            $user = auth()->user();
            $profile = $user->profile()->first();
            return $profile->poduitsWishlist()->toggle([$request->id]);
            // count($profile->poduitsWishlist()->get());
        });
        return response()->json($res, Response::HTTP_OK);

    }

    public function delete($id)
    {
        $user = auth()->user();
        $profile = $user->profile()->first();
        $profile->poduitsWishlist()->detach($id);
        return response()->json(['message' => true]);
    }

    public function deleteAll()
    {
        $user = auth()->user();
        $profile = $user->profile()->first();
        $profile->poduitsWishlist()->detach();
        return response()->json(['message' => true]);
    }
}
