<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'travel_package_id' => ['required', 'exists:travel_packages,id'],
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_email' => ['required', 'email', 'max:255'],
            'customer_phone' => ['required', 'string', 'max:30'],
            'travel_date' => ['required', 'date', 'after_or_equal:today'],
            'travelers' => ['required', 'integer', 'min:1', 'max:12'],
            'special_request' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
