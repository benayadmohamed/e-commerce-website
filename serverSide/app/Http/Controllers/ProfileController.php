<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResetPasswordRequest;
use App\models\Profile;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }


    public function get()
    {
        $user = auth()->user();
        $profile = $user->profile()->first();
        $adresses = $profile->adresses()->get();
        $profile->adresses = $adresses;
        $user->profile = $profile;
        return response()->json($user);
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $user = User::findOrFail($input['id']);
        $user->email = $input['email'];
        $profile = Profile::findOrFail($input['profile']['id']);
        $profile->sexe = $input['profile']['sexe'];
        $profile->dateN = date('Y-m-d', strtotime(str_replace('-', '/', $input['profile']['dateN'])));

        $user->save();
        $profile->save();

        return response()->json(['message' => true]);
    }


    public function changePassword(ResetPasswordRequest $request)
    {
        $input = $request->all();
        $user = auth()->user();
        if (!Hash::check($input["oldPassword"], $user->password))
            return response()->json(['Error' => 'password Inccorrect'], Response::HTTP_UNPROCESSABLE_ENTITY);

        $user->update(['password' => $input["password"]]);

        return response()->json(['Success' => 'password change avec succe'], Response::HTTP_CREATED);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function show($id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function edit($id)
    {

    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {

    }

}

?>