declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

declare namespace kakao {
  namespace maps {
    /* biome-ignore lint/suspicious/noShadowRestrictedNames: false */
    class Map {
      constructor(container: HTMLElement, options: MapOptions);
      getCenter(): LatLng;
      setMinLevel(level: number): void;
      setMaxLevel(level: number): void;
      setCenter(latlng: LatLng): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }

    class Size {
      constructor(width: number, height: number);
    }

    class MarkerImage {
      constructor(url: string, size: Size, options?: MarkerImageOptions);
    }

    class Circle {
      constructor(options: CircleOptions);
    }

    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
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
