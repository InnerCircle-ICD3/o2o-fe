"use client";
import { getProduct, updateProduct } from "@/apis/ssr/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useGetOwnerStore from "@/hooks/api/useGetOwnerStore";
import { useOwnerStore } from "@/stores/ownerInfoStore";
import type { UseFormOptions } from "@/types/form";
import type { Product, ProductFormData } from "@/types/product";
import { getS3UploadUrl } from "@/utils/imageUpload";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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

export default function LuckyBagDetail() {
  const { id } = useParams();
  const { data: storeData } = useGetOwnerStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<{
    origin: File;
    preview: string;
  } | null>(null);
  const { owner } = useOwnerStore();

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

  const fetchAndSetProduct = useCallback(async () => {
    if (!owner?.storeOwnerId || !id) return;
    const result = await getProduct(owner?.storeOwnerId, Number(id));
    if (result.success) {
      const product = result.data;
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("foodType", product.foodType.join(", "));
      setValue("size", product.size);
      setValue("quantity", product.inventory.quantity);
      setValue("originalPrice", product.price.originalPrice);
      setValue("discountRate", product.price.discountRate);
      setValue("image", product.image);
    } else {
      console.error("상품 조회 실패:", result);
    }
  }, [owner, id]);

  useEffect(() => {
    fetchAndSetProduct();
  }, [fetchAndSetProduct]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchAndSetProduct();
  };

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

      const result = await updateProduct(storeData?.id, Number(id), formatData as Product);

      if (result.success) {
        setIsEditing(false);
        fetchAndSetProduct();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert(error);
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
        setPreviewUrl({
          origin: file,
          preview: result,
        });
      };
      reader.readAsDataURL(file);
      setValue("image", file);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full p-10 grid grid-cols-2 gap-10">
        <form onSubmit={handleSubmit(onSubmit)} className="contents">
          {/* Left Form */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">잇고백 상세</h2>
              {!isEditing ? (
                <Button type="button" onClick={handleEdit}>
                  수정하기
                </Button>
              ) : (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  취소
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label>상품 이미지</Label>
              <div className="flex flex-col gap-4">
                {isEditing ? (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                ) : null}
                {(previewUrl || watch("image")) && (
                  <div className="relative w-[200px] h-[200px] border rounded-lg overflow-hidden">
                    <Image
                      src={previewUrl ? previewUrl.preview : (watch("image") as string)}
                      alt="Product preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                {...register("name")}
                readOnly={!isEditing}
                className={`${!isEditing ? "bg-gray-50" : ""} ${
                  errors.name ? "border-destructive" : ""
                }`}
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
                readOnly={!isEditing}
                className={`${!isEditing ? "bg-gray-50" : ""} ${
                  errors.foodType ? "border-destructive" : ""
                }`}
                placeholder="1개 이상, 콤마(,)로 구분"
              />
              {errors.foodType && <p className="text-sm text-destructive">{errors.foodType}</p>}
            </div>

            <div className="space-y-2">
              <Label>잇고백 종류</Label>
              <ToggleGroup
                type="single"
                value={watch("size")}
                disabled={!isEditing}
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
                  disabled={!isEditing}
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
                readOnly={!isEditing}
                className={`${!isEditing ? "bg-gray-50" : ""} min-h-[100px] ${
                  errors.description ? "border-destructive" : ""
                }`}
                placeholder="잇고백에 대한 설명을 입력해주세요"
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>가격 정보</Label>
              <div className="bg-gray-100 p-4 rounded-md space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">정가</span>
                  {isEditing ? (
                    <div className="space-y-1">
                      <Input
                        type="number"
                        {...register("originalPrice")}
                        className={`w-32 ${errors.originalPrice ? "border-destructive" : ""}`}
                      />
                      {errors.originalPrice && (
                        <p className="text-sm text-destructive">{errors.originalPrice}</p>
                      )}
                    </div>
                  ) : (
                    <span className="font-semibold">
                      {watch("originalPrice").toLocaleString()}원
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">판매가</span>
                  <span className="text-xl font-semibold text-primary">
                    {Math.floor(watch("originalPrice") * watch("discountRate")).toLocaleString()}원
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  정가의 {Math.floor(watch("discountRate") * 100)}% 가격에 판매됩니다
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={
                    isLoading ||
                    !watch("name") ||
                    !watch("description") ||
                    !watch("foodType") ||
                    !previewUrl
                  }
                >
                  {isLoading ? "저장 중..." : "수정하기"}
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
