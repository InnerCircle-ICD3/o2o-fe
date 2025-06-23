"use client";

import { createProduct } from "@/apis/ssr/product";
import StoreRegisterLink from "@/components/common/storeRegisterLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import type { UseFormOptions } from "@/types/form";
import type { ProductFormData } from "@/types/product";
import { getS3UploadUrl } from "@/utils/imageUpload";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "use-form-light";

interface FormData {
  name: string;
  description: string;
  foodType: string;
  size: "S" | "M" | "L";
  quantity: number;
  originalPrice: number;
  discountRate: number;
  image: File | string;
}

export default function LuckyBagRegister() {
  const router = useRouter();
  const { data: storeData } = useGetOwnerStore();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<{
    origin: File;
    preview: string;
  } | null>(null);

  const { register, handleSubmit, errors, validate, watch, setValue } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      originalPrice: 10000,
      quantity: 1,
      discountRate: 0.5,
      size: "M",
      foodType: "",
      image: "",
    },
    validationRules: {
      name: {
        pattern: /^.{2,}$/,
        message: "2자 이상 10자 이하로 입력해주세요",
      },
      description: {
        pattern: /^.{10,100}$/,
        message: "10자 이상 100자 이하로 입력해주세요",
      },
      foodType: {
        pattern: /^.{1,}$/,
        message: "음식 종류를 1개 이상 입력해주세요",
      },
    },
  } as UseFormOptions<FormData>);

  const onSubmit = async (data: FormData) => {
    const isValid = validate();
    if (!isValid || !storeData?.id || !previewUrl?.origin) {
      return;
    }

    setIsLoading(true);
    try {
      const fileResult = await getS3UploadUrl(previewUrl?.origin, "product");
      const formatData: ProductFormData = {
        ...data,
        price: {
          originalPrice: data.originalPrice,
          discountRate: data.discountRate,
        },
        inventory: {
          quantity: data.quantity,
        },
        status: "ACTIVE",
        image: fileResult || "",
        foodType: data.foodType
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item.length > 0),
      };

      const result = await createProduct(storeData?.id, formatData);
      if (result.success) {
        router.push("/product-management");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl({
          origin: file,
          preview: result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!storeData) {
    return <StoreRegisterLink />;
  }

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
                placeholder="최소 2자 이상, 최대 10자 이하"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="food">음식 종류</Label>
              <Input
                id="food"
                value={watch("foodType")}
                onChange={(e) => {
                  setValue("foodType", e.target.value);
                }}
                className={errors.foodType ? "border-destructive" : ""}
                placeholder="1개 이상, 콤마(,)로 구분"
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
                  className="flex-1 [&>span]:cursor-grab [&>span]:active:cursor-grabbing [&>span]:touch-none"
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
                className={`min-h-[100px] ${errors.description ? "border-destructive" : ""}`}
                placeholder="잇고백에 대한 설명을 입력해주세요"
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
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
                    className="flex-1 [&>span]:cursor-grab [&>span]:active:cursor-grabbing [&>span]:touch-none"
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
                {previewUrl && (
                  <div className="relative w-[200px] h-[200px] border rounded-lg overflow-hidden">
                    <Image
                      src={previewUrl.preview}
                      alt="Product preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={
                isLoading ||
                !watch("name") ||
                !watch("description") ||
                !watch("foodType") ||
                !previewUrl
              }
            >
              {isLoading ? "등록 중..." : "등록하기"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
