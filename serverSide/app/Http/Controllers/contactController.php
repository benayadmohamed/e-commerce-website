<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class contactController extends Controller
{
    public function __construct()
    {
    }


    public function sendContact(Request $request)
    {
        $this->validate($request, ['email' => 'required|email', 'message' => 'required']);

        $data = array('email' => $request->email,
            'Bmessage' => $request->message,
            'phone' => $request->phone,
            'name' => $request->name);

        Mail::send('Email.contact', $data, function ($message) use ($data) {
            $message->from($data['email']);
            $message->to('ppalaisdamasquini@gmail.com');
            $message->subject('contact');

        });
    }
    //
}
