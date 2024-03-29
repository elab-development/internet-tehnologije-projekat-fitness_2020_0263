<?php

namespace App\Http\Resources\Product;

use App\Http\Resources\Order\OrderResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'product';

    public function toArray($request)
    {
        return [
            'name' => $this->resource->name,
            'price' => $this->resource->price,
            'order' => new OrderResource($this->resource->order),
        ];
    }
}
