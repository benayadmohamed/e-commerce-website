<?php
/**
 * Created by PhpStorm.
 * User: simo-
 * Date: 16/08/2018
 * Time: 14:20
 */
return [
    'client_id' => env('PAYPAL_CLIENT_ID',''),
    'secret' => env('PAYPAL_SECRET',''),
    'settings' => array(
        'mode' => env('PAYPAL_MODE','sandbox'),
        'http.ConnectionTimeOut' => 30,
        'log.LogEnabled' => true,
        'log.FileName' => storage_path() . '/logs/paypal.log',
        'log.LogLevel' => 'ERROR'
    ),
];