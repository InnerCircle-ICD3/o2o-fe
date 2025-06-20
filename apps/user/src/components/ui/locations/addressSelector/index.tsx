"use client";

import Button from "@/components/common/button";
import * as styles from "@/components/ui/locations/myLocation/myLocation.css";
import { ADDRESS_TYPES } from "@/constants/locations";
import { useToastStore } from "@/stores/useToastStore";
import type {
  AddressType,
  CustomerAddressRequest,
  CustomerAddressResponse,
} from "@/types/locations.type";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AddressSelectorProps {
  selectedIndex: number;
  setSelectedIndex: (idx: number) => void;
  customerAddress?: CustomerAddressResponse[];
  selectedAddress: Record<AddressType, CustomerAddressRequest | undefined>;
  deleteCustomerAddress: (params: { customerId?: number; addressId?: number }) => void;
  clearSelectedAddress: (type: AddressType) => void;
}

export default function AddressSelector({
  selectedIndex,
  setSelectedIndex,
  customerAddress,
  selectedAddress,
  deleteCustomerAddress,
  clearSelectedAddress,
}: AddressSelectorProps) {
  const router = useRouter();
  const { showToast } = useToastStore();
  const addressMap: Record<AddressType, CustomerAddressResponse | undefined> = {
    HOME: customerAddress?.find((addr) => addr.customerAddressType === "HOME"),
    WORK: customerAddress?.find((addr) => addr.customerAddressType === "WORK"),
  };

  return (
    <div className={styles.buttonWrapper}>
      {ADDRESS_TYPES.map((type, idx) => {
        const tempAddr = selectedAddress[type];
        const addr = tempAddr || addressMap[type];
        const isSelected = selectedIndex === idx;

        let region2 = "";
        let region3 = "";
        let customerId: number | undefined = undefined;
        let addressId: number | undefined = undefined;

        if (addr) {
          if ("address" in addr) {
            region2 = addr.address.region2DepthName;
            region3 = addr.address.region3DepthName;
          } else {
            region2 = addr.region2DepthName;
            region3 = addr.region3DepthName;
            customerId = addr.customerId;
            addressId = addr.id;
          }
        }

        return addr ? (
          <Button
            key={type}
            status={isSelected ? "primary" : "common"}
            onClick={() => setSelectedIndex(idx)}
          >
            <div className={styles.buttonContent}>
              {region2} {region3}
              <Image
                src={isSelected ? "/icons/btn_close_white.svg" : "/icons/btn_close.svg"}
                alt="close"
                width={14}
                height={14}
                onClick={async (e) => {
                  e.stopPropagation();
                  if (tempAddr) {
                    clearSelectedAddress(type);
                  } else {
                    try {
                      await deleteCustomerAddress({ customerId, addressId });
                      showToast("주소가 삭제되었습니다.");
                    } catch {
                      showToast("주소 삭제에 실패했습니다.", true);
                    }
                  }
                }}
              />
            </div>
          </Button>
        ) : (
          <Button
            key={type}
            onClick={() => router.push(`/locations/address-search?address_type=${type}`)}
          >
            <p className={styles.buttonText}>+</p>
          </Button>
        );
      })}
    </div>
  );
}
