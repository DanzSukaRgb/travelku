<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_code',
        'user_id',
        'travel_package_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'travel_date',
        'travelers',
        'special_request',
        'total_amount',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'travel_date' => 'date',
            'total_amount' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function travelPackage(): BelongsTo
    {
        return $this->belongsTo(TravelPackage::class, 'travel_package_id');
    }
}
