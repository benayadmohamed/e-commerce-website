<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResetPasswordRequest;
use App\Mail\ResetPasswordEmail;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class RestPasswordController extends Controller
{
    //

    public function sendMail(Request $request)
    {
        if (!$this->validateEmail($request->email)) {
            return $this->responseError();
        }
        $this->send($request->email);
        return $this->responseSuccess();
    }

    public function send($email)
    {
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordEmail($token));
    }

    public function createToken($email)
    {
        DB::table('password_resets')->where('email', $email)->delete();
        $token = str_random(60);
        $this->saveToken($token, $email);
        return $token;
    }

    public function saveToken($token, $email)
    {
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    public function validateEmail($email)
    {
        return !!User::where('email', $email)->first();
    }

    public function responseError()
    {
        return response()->json(['error' => 'Not exist Email'], Response::HTTP_NOT_FOUND);
    }

    public function responseSuccess()
    {
        return response()->json(['Success' => 'Email send'], Response::HTTP_OK);
    }


    public function process(ResetPasswordRequest $request)
    {
        $res = $this->getPasswordResetRow($request)->get();
        return $res->count() > 0 ? $this->changePassword($res, $request) : $this->tokenNotFound();
    }

    public function getPasswordResetRow($request)
    {
        return DB::table('password_resets')->where(['token' => $request->token]);
    }

    public function changePassword($res, $request)
    {
        $passwordReset = $res->first()->token;
        $email = DB::table('password_resets')->where(['token' => $passwordReset])->first()->email;
        $user = User::whereEmail($email);
        $user->update(['password' => bcrypt($request->password)]);
        $this->getPasswordResetRow($request)->delete();
        return response()->json(['Success' => 'password change avec succe'], Response::HTTP_CREATED);
    }

    public function tokenNotFound()
    {
        return response()->json(['Error' => 'no token'], Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
