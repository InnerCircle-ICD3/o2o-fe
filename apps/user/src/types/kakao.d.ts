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

    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
    }

    class InfoWindow {
      constructor(options: InfoWindowOptions);
      open(map: Map, marker: Marker): void;
      close(): void;
    }

    interface MapOptions {
      center: LatLng;
      level: number;
    }

    interface MarkerOptions {
      position: LatLng;
      map?: Map;
      title?: string;
    }

    interface InfoWindowOptions {
      content: string;
    }

    namespace event {
      function addListener<T>(
        target: T,
        type: string,
        callback: () => void
      ): void;
    }
  }
}