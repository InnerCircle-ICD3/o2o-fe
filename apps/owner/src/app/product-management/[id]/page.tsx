"use client";

import { uploadFile } from "@/apis/ssr/file-upload";
import { getProduct, updateProduct } from "@/apis/ssr/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { FileUploadRequest, FileUploadResponse } from "@/types/file-upload";
import type { Product, ProductFormData } from "@/types/product";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "use-form-light";

const storeId = 1; // TODO: 스토어 아이디 받아오기(로그인해야 가능)

const initialFormData: ProductFormData = {
  name: "",
  description: "",
  foodType: [],
  size: "M",
  quantity: 1,
  price: {
    originalPrice: 1000,
    discountRate: 0.5,
  },
  image: "",
  inventory: {
    quantity: 1,
  },
  status: "ACTIVE",
};

export default function LuckyBagDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fileUpload, setFileUpload] = useState<FileUploadRequest>({
    fileName: "",
    contentType: "",
    folderPath: "",
  });

  const form = useForm<ProductFormData>({ defaultValues: initialFormData });

  const { errors, handleSubmit, register, watch, setValue } = form;

  const fetchProduct = useCallback(
    async (storeId: number, productId: number) => {
      const result = await getProduct(storeId, productId);
      if (result.success) {
        const product = result.data;
        setValue("name", product.name);
        setValue("description", product.description);
        setValue("foodType", product.foodType);
        setValue("size", product.size);
        setValue("quantity", product.inventory.quantity);
        setValue("price", product.price);
        setValue("image", product.image);
      } else {
        console.error("상품 조회 실패:", result);
      }
    },
    [setValue],
  );

  useEffect(() => {
    fetchProduct(storeId, Number(id));
  }, [id, fetchProduct]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchProduct(storeId, Number(id)); // 원래 데이터로 복구
  };

  const onSubmit = async (data: ProductFormData) => {
    const isValid = await form.validate();
    if (!isValid) return;

    setIsLoading(true);
    try {
      const fileResult = await uploadFile(fileUpload);
      if (!fileResult.success) {
        alert("파일 업로드 실패");
        console.error("파일 업로드 실패:", fileResult);
        return;
      }

      const productData: Partial<Product> = {
        ...data,
        inventory: {
          quantity: data.quantity,
        },
        image: (fileResult.data as FileUploadResponse).preSignedUrl,
        status: "ACTIVE",
      };

      const result = await updateProduct(1, Number(id), productData as Product);

      if (result.success) {
        setIsEditing(false);
        fetchProduct(storeId, Number(id));
      } else {
        alert("상품 수정 실패");
        console.error("상품 수정 실패:", result);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFoodTypeChange = (value: string) => {
    const foodTypes = value.split(",").map((item) => item.trim());
    setValue("foodType", foodTypes);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileUpload({
        fileName: file.name,
        contentType: file.type,
        folderPath: "product",
      });
    }
  };

  if (!watch("name")) return <div>Loading...</div>;

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
                {watch("image") && (
                  <div className="relative w-[200px] h-[200px] border rounded-lg overflow-hidden">
                    <Image
                      src={watch("image")}
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
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="food">음식 종류</Label>
              <Input
                id="food"
                value={watch("foodType").join(", ")}
                onChange={(e) => handleFoodTypeChange(e.target.value)}
                readOnly={!isEditing}
                className={`${!isEditing ? "bg-gray-50" : ""} ${
                  errors.foodType ? "border-destructive" : ""
                }`}
                placeholder="콤마(,)로 구분하여 입력"
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
                  onValueChange={([value]) => setValue("quantity", value)}
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
                readOnly={!isEditing}
                className={`${!isEditing ? "bg-gray-50" : ""} min-h-[100px]`}
              />
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
                        {...register("price.originalPrice" as keyof ProductFormData)}
                        className={`w-32 ${
                          errors["price.originalPrice"] ? "border-destructive" : ""
                        }`}
                      />
                      {errors["price.originalPrice"] && (
                        <p className="text-sm text-destructive">{errors["price.originalPrice"]}</p>
                      )}
                    </div>
                  ) : (
                    <span className="font-semibold">
                      {watch("price").originalPrice.toLocaleString()}원
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">판매가</span>
                  <span className="text-xl font-semibold text-primary">
                    {Math.floor(
                      watch("price").originalPrice * watch("price").discountRate,
                    ).toLocaleString()}
                    원
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  정가의 {Math.floor(watch("price").discountRate * 100)}% 가격에 판매됩니다
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={isLoading}>
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
