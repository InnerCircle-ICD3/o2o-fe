"use client";

import { uploadFile } from "@/apis/ssr/file-upload";
import { createProduct } from "@/apis/ssr/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { VALIDATION_PRODUCT_RULES } from "@/constants/product";
import type { FileUploadResponse } from "@/types/file-upload";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "use-form-light";

interface ProductFormData {
  name: string;
  description: string;
  foodType: string[];
  size: "S" | "M" | "L";
  quantity: number;
  originalPrice: number;
  discountRate: number;
  image: string;
}

const initialFormData: ProductFormData = {
  name: "",
  description: "",
  foodType: [],
  size: "M",
  quantity: 1,
  originalPrice: 1000,
  discountRate: 0.5,
  image: "",
};

export default function LuckyBagRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const form = useForm<ProductFormData>({
    defaultValues: initialFormData,
  });

  const { errors, handleSubmit, register, watch, setValue } = form;

  const handleFoodTypeChange = (value: string) => {
    const foodTypes = value.split(",").map((item) => item.trim());
    setValue("foodType", foodTypes);
  };

  const validateForm = () => {
    const name = watch("name");
    const foodType = watch("foodType");
    const quantity = watch("quantity");
    const originalPrice = watch("originalPrice");
    let isValid = true;

    // 이름 검증
    if (!name || name.length < 2 || name.length > 50) {
      setValue("name", name);
      form.errors.name = VALIDATION_PRODUCT_RULES.name.message;
      isValid = false;
    }

    // 음식 종류 검증
    if (!foodType.length) {
      setValue("foodType", foodType);
      form.errors.foodType = VALIDATION_PRODUCT_RULES.foodType.message;
      isValid = false;
    }

    // 수량 검증
    if (!quantity || quantity < 1) {
      setValue("quantity", quantity);
      form.errors.quantity = VALIDATION_PRODUCT_RULES.quantity.message;
      isValid = false;
    }

    // 가격 검증
    if (!originalPrice || originalPrice < 1) {
      setValue("originalPrice", originalPrice);
      form.errors.originalPrice = VALIDATION_PRODUCT_RULES.originalPrice.message;
      isValid = false;
    }

    if (watch("image") === "") {
      setValue("image", watch("image"));
      form.errors.image = VALIDATION_PRODUCT_RULES.image.message;
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = async (data: ProductFormData) => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const fileResult = await uploadFile({
        fileName: data.image,
        contentType: "image/jpeg",
        folderPath: "product",
      });

      if (!fileResult.success) {
        alert("파일 업로드 실패");
        console.error("파일 업로드 실패:", fileResult);
        return;
      }

      const result = await createProduct(1, {
        ...data,
        image: (fileResult.data as FileUploadResponse).preSignedUrl,
      });
      if (result.success) {
        router.push("/product-management");
      } else {
        console.error("상품 등록 실패:", result);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        setValue("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full p-10 grid grid-cols-2 gap-10">
        <form onSubmit={handleSubmit(onSubmit)} className="contents">
          {/* Left Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">잇고백 등록</h2>

            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                {...register("name")}
                className={errors.name ? "border-destructive" : ""}
                placeholder="담기는 음식을 고려하여 알맞은 가방 이름을 지어주세요!"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="food">음식 종류</Label>
              <Input
                id="food"
                value={watch("foodType").join(", ")}
                onChange={(e) => handleFoodTypeChange(e.target.value)}
                className={errors.foodType ? "border-destructive" : ""}
                placeholder="주로 남는 음식을 작성해주세요 (최소 1개 이상, 콤마(,)로 구분)"
              />
              {errors.foodType && <p className="text-sm text-destructive">{errors.foodType}</p>}
            </div>

            <div className="space-y-2">
              <Label>잇고백 종류</Label>
              <ToggleGroup
                type="single"
                value={watch("size")}
                onValueChange={(value) => value && setValue("size", value as "S" | "M" | "L")}
                className="flex gap-2"
              >
                <ToggleGroupItem value="S">S</ToggleGroupItem>
                <ToggleGroupItem value="M">M</ToggleGroupItem>
                <ToggleGroupItem value="L">L</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              <Label>수량</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={1}
                  max={100}
                  step={1}
                  value={[watch("quantity")]}
                  onValueChange={([value]) => {
                    setValue("quantity", value);
                  }}
                  className="flex-1"
                />
                <div className="font-bold text-lg min-w-[60px] text-center">
                  {watch("quantity")}개
                </div>
              </div>
              {errors.quantity && <p className="text-sm text-destructive">{errors.quantity}</p>}
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                {...register("description")}
                className="min-h-[100px]"
                placeholder="잇고백에 대한 설명을 입력해주세요"
              />
            </div>

            <div className="space-y-2">
              <Label>가격 설정</Label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Slider
                    min={1000}
                    max={30000}
                    step={100}
                    value={[watch("originalPrice")]}
                    onValueChange={([value]) => {
                      setValue("originalPrice", value);
                    }}
                    className="flex-1"
                  />
                  <div className="font-bold text-lg min-w-[100px] text-center">
                    {watch("originalPrice").toLocaleString()}원
                  </div>
                </div>
                {errors.originalPrice && (
                  <p className="text-sm text-destructive">{errors.originalPrice}</p>
                )}
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="text-sm text-gray-500">그럼, 고객은?</div>
                  <div className="text-xl font-semibold">
                    {Math.floor(watch("originalPrice") * watch("discountRate")).toLocaleString()}원
                    구매
                  </div>
                  <div className="text-sm text-gray-500">
                    정가의 {Math.floor(watch("discountRate") * 100)}% 가격에 구매하게 돼요
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>상품 이미지</Label>
              <div className="flex flex-col gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                {(previewUrl || watch("image")) && (
                  <div className="relative w-[200px] h-[200px] border rounded-lg overflow-hidden">
                    <Image
                      src={previewUrl || watch("image")}
                      alt="Product preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "등록 중..." : "등록하기"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
