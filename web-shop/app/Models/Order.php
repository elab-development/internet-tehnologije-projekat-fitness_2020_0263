<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'location',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public static function getAllOrders()
    {
        $result = DB::table('orders')
            ->select('id', 'location', 'created_at')
            ->get()->toArray();
        return $result;
    }
}
