<?php

namespace App\Http\Resources\Order;

use App\Http\Resources\Customer\CustomerResource;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'order';

    public function toArray($request)
    {
        return [
            'location' => $this->resource->location,
            'customer' => new CustomerResource($this->resource->customer)
        ];
    }
}
