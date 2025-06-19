declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

declare namespace kakao {
  namespace maps {
    namespace services {
      class Geocoder {
        constructor();
        coord2Address(
          lng: number,
          lat: number,
          callback: (result: AddressResult[], status: Status) => void,
        ): void;
      }

      type Status = "OK" | "ERROR" | "ZERO_RESULT" | "NOT_FOUND" | "INVALID_REQUEST";
      interface AddressResult {
        address: {
          /* biome-ignore lint/style/useNamingConvention: false */
          address_name: string; // 지번 주소
          /* biome-ignore lint/style/useNamingConvention: false */
          region_1depth_name: string;
          /* biome-ignore lint/style/useNamingConvention: false */
          region_2depth_name: string;
          /* biome-ignore lint/style/useNamingConvention: false */
          region_3depth_name: string;
          /* biome-ignore lint/style/useNamingConvention: false */
          mountain_yn: "Y" | "N";
          /* biome-ignore lint/style/useNamingConvention: false */
          main_address_no: string;
          /* biome-ignore lint/style/useNamingConvention: false */
          sub_address_no: string;
        };
        /* biome-ignore lint/style/useNamingConvention: false */
        road_address?: {
          /* biome-ignore lint/style/useNamingConvention: false */
          address_name: string; // 도로명 주소
          /* biome-ignore lint/style/useNamingConvention: false */
          region_1depth_name: string;
          /* biome-ignore lint/style/useNamingConvention: false */
          region_2depth_name: string;
          /* biome-ignore lint/style/useNamingConvention: false */
          region_3depth_name: string;
          /* biome-ignore lint/style/useNamingConvention: false */
          road_name: string;
          /* biome-ignore lint/style/useNamingConvention: false */
          underground_yn: "Y" | "N";
          /* biome-ignore lint/style/useNamingConvention: false */
          main_building_no: string;
          /* biome-ignore lint/style/useNamingConvention: false */
          sub_building_no: string;
          /* biome-ignore lint/style/useNamingConvention: false */
          building_name: string;
          /* biome-ignore lint/style/useNamingConvention: false */
          zone_no: string; // 우편번호
        };
      }
    }

    interface MarkerClustererOptions {
      map?: Map;
      averageCenter?: boolean;
      minLevel?: number;
      disableClickZoom?: boolean;
      styles?: {
        width?: string;
        height?: string;
        background?: string;
        boxShadow?: string;
        borderRadius?: string;
        color?: string;
        textAlign?: string;
        fontSize?: string;
        fontWeight?: string;
        lineHeight?: string;
      }[];
    }

    class MarkerClusterer {
      constructor(options: MarkerClustererOptions);
      addMarkers(markers: Marker[]): void;
      clear(): void;
      removeMarkers(markers: Marker[]): void;
    }

    /* biome-ignore lint/suspicious/noShadowRestrictedNames: false */
    class Map {
      constructor(container: HTMLElement, options: MapOptions);
      getCenter(): LatLng;
      setMinLevel(level: number): void;
      setMaxLevel(level: number): void;
      setCenter(latlng: LatLng): void;
      setLevel(level: number): void;
      setBounds(bounds: LatLngBounds): void;
      getLevel(): number;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }

    class LatLngBounds {
      constructor();
      extend(latlng: LatLng): void;
      getBounds(): LatLngBounds;
    }

    class Size {
      constructor(width: number, height: number);
    }

    class MarkerImage {
      constructor(url: string, size: Size, options?: MarkerImageOptions);
    }

    class Circle {
      constructor(options: CircleOptions);
      setMap(map: Map | null): void;
    }

    class Polygon {
      constructor(options: PolygonOptions);
      setMap(map: Map | null): void;
    }

    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
      setImage(image: MarkerImage): void;
    }

    class InfoWindow {
      constructor(options: InfoWindowOptions);
      open(map: Map, marker: Marker): void;
      close(): void;
    }

    interface CircleOptions {
      center: LatLng;
      radius: number;
      map?: Map;
      strokeWeight?: number;
      strokeOpacity?: number;
      strokeColor?: string;
      fillColor?: string;
      fillOpacity?: number;
    }

    interface MarkerOptions {
      position: LatLng;
      map?: Map;
      image?: MarkerImage;
      title?: string;
    }

    interface InfoWindowOptions {
      content: string;
    }

    interface MarkerImageOptions {
      verticalAlign?: string;
    }

    interface MapOptions {
      center: LatLng;
      level: number;
    }

    function load(callback: () => void): void;
    namespace event {
      function addListener<T>(target: T, type: string, callback: () => void): void;
    }
  }
}
