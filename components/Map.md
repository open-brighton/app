# Map Component

This component uses `@rnmapbox/maps` to display an interactive map in the Open Brighton app.

## Setup

### 1. Get a Mapbox Access Token

1. Go to [Mapbox Account](https://account.mapbox.com/)
2. Sign up for a free account
3. Navigate to your account dashboard
4. Copy your default public access token

### 2. Configure the Access Token

You need to update the access token in two places:

#### A. In the Map Component

Open `components/Map.tsx` and replace the placeholder token:

```typescript
const MAPBOX_ACCESS_TOKEN = "YOUR_MAPBOX_ACCESS_TOKEN"; // Replace with your actual token
```

#### B. In the App Configuration

Open `app.json` and update the Mapbox plugin configuration:

```json
[
  "@rnmapbox/maps",
  {
    "RNMapboxMapsDownloadToken": "YOUR_MAPBOX_ACCESS_TOKEN",
    "RNMapboxMapsVersion": "11.0.0"
  }
]
```

Replace `'YOUR_MAPBOX_ACCESS_TOKEN'` with your actual Mapbox access token in both locations.

## Usage

The Map component is already integrated into the Explore page. It displays a map centered on Brighton, UK with the following features:

- Interactive map with street view
- User location tracking (if permissions are granted)
- Smooth camera animations
- Loading state indicator
- Error handling for missing access token

## Props

- `style`: Custom styles for the container
- `initialCenter`: Initial map center coordinates `[longitude, latitude]` (default: Brighton, UK)
- `initialZoom`: Initial zoom level (default: 12)
- `showUserLocation`: Whether to show user location (default: true)
- `onMapPress`: Callback for map touch events
- `onMapLoad`: Callback when map finishes loading

## Permissions

The component requires location permissions to show user location. Make sure to handle location permissions in your app configuration.

## Styling

The component supports theming and will automatically adapt to light/dark mode using the app's color scheme.
