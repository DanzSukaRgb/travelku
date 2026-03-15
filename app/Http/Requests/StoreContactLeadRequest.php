<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'interest' => ['required', 'string', 'max:120'],
            'message' => ['required', 'string', 'max:2000'],
            'source' => ['nullable', 'string', 'max:50'],
        ];
    }
}
