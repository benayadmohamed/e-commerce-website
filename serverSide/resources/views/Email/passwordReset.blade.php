@component('mail::message')
# Change password request

lick on the button.

@component('mail::button', ['url' => 'http://localhost:4200/responseResetPassword?token='.$token])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
