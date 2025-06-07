"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

export default function LuckyBagRegister() {
  const [price, setPrice] = useState(19000);
  const [quantity, setQuantity] = useState(18);
  const [size, setSize] = useState("M");

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-200 p-4 flex flex-col gap-2">
        <Button variant="ghost" className="justify-start">
          상품 등록
        </Button>
        <Button variant="ghost" className="justify-start">
          상품 현황
        </Button>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-10 grid grid-cols-2 gap-10">
        {/* Left Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">럭키백 등록</h2>

          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input id="name" placeholder="담기는 음식을 고려하여 알맞은 가방 이름을 지어주세요!" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="food">음식 종류</Label>
            <Input
              id="food"
              placeholder="주로 남는 음식을 작성해주세요 (최소 1개 이상, 콤마(,)로 구분)"
            />
          </div>

          <div className="space-y-2">
            <Label>럭키백 종류</Label>
            <ToggleGroup
              type="single"
              value={size}
              onValueChange={(val) => val && setSize(val)}
              className="flex gap-2"
            >
              <ToggleGroupItem value="S">S</ToggleGroupItem>
              <ToggleGroupItem value="M">M</ToggleGroupItem>
              <ToggleGroupItem value="L">L</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label>수량</Label>
            <Slider
              min={1}
              max={100}
              step={1}
              value={[quantity]}
              onValueChange={([val]) => setQuantity(val)}
            />
            <div className="text-center font-bold text-lg">{quantity}개</div>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea id="description" placeholder="field" />
          </div>

          <div className="space-y-2">
            <Label>가격 설정</Label>
            <Slider
              min={1000}
              max={30000}
              step={100}
              value={[price]}
              onValueChange={([val]) => setPrice(val)}
            />
            <div className="text-center font-bold text-xl">{price.toLocaleString()}원</div>
            <div className="bg-gray-100 p-4 rounded-md">
              <div className="text-sm text-gray-500">그럼, 고객은?</div>
              <div className="text-xl font-semibold">{(price * 0.5).toLocaleString()}원 구매</div>
              <div className="text-sm text-gray-500">정가의 50% 가격에 구매하게 돼요</div>
            </div>
          </div>

          <Button className="w-full">등록</Button>
        </div>
      </div>
    </div>
  );
}
