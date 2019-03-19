<?php

namespace App\Http\Controllers;

use App\models\Actualite;
use App\models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ActualiteController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'admin'], ['except' => ['get']]);
    }

    //
    public function get(Request $request)
    {/*->with(["article.images"])*/

        $act = Actualite::with(['image'])->where('active', true)->get();

        return response()->json($act);
    }

    public function getAll(Request $request)
    {/*->with(["article.images"])*/
        $act = Actualite::with(['image'])->where('titre', 'like', $request->filter . '%')
            ->orWhere('sousTitre', 'like', $request->filter . '%')
            ->paginate($request->perPage);

        return response()->json($act);
    }


    public function save(Request $request)
    {


        $input = $request->all();
        $actualite = new Actualite();

        $actualite->titre = $input['titre'];

        if (isset($input['sousTitre'])) {
            $actualite->sousTitre = $input['sousTitre'];
        }
        if (isset($input['active'])) {
            $actualite->active = $input['active'];
        }
        DB::transaction(function () use ($input, $actualite) {
            $actualite->save();
            $image = $input['image'];
            $img = new Image();
            $actualite->image()->save($img);
            $tmp = explode('.', $image['name']);
            $name = 'Img' . $img->id . '_' . $actualite->id . '_name' . '.' . end($tmp);
            $img->src = '/storage/ArticleImages/' . $name;
            $img->name = $name;
            $img->save();
            file_put_contents(storage_path("app/public/ArticleImages/") . '' . $name, base64_decode($image['value']));
        });
        $actualite->image = $actualite->image()->first();
        return response()->json(['data' => $actualite]);
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $actualite = Actualite::findOrFail($input['id']);;

        $actualite->titre = $input['titre'];

        if (isset($input['sousTitre'])) {
            $actualite->sousTitre = $input['sousTitre'];
        }
        if (isset($input['active'])) {
            $actualite->active = $input['active'];
        }
        DB::transaction(function () use ($input, $actualite) {
            $actualite->save();
            if (empty($input['image']['id'])) {
                $image = $input['image'];
                $img = new Image();
                $actualite->image()->save($img);
                $tmp = explode('.', $image['name']);
                $name = 'Img' . $img->id . '_' . $actualite->id . '_name' . '.' . end($tmp);
                $img->src = '/storage/ArticleImages/' . $name;
                $img->name = $name;
                $img->save();
                file_put_contents(storage_path("app/public/ArticleImages/") . '' . $name, base64_decode($image['value']));
            }
        });
        $actualite->image = $actualite->image()->first();
        return response()->json(['data' => $actualite]);
    }

    public function delete($id)
    {
        $actualite = Actualite::find($id);
        $image = $actualite->image()->first();
        DB::transaction(function () use ($actualite, $image) {
            if ($actualite->delete()) {
                Storage::delete('public/ArticleImages/' . $image->name);
            }
        });

        return response()->json(['message' => true]);
    }
}
