# Map Component

This component uses `@rnmapbox/maps` to display an interactive map in the Open Brighton app.

## Setup

### 1. Get a Mapbox Access Token

1. Go to [Mapbox Account](https://account.mapbox.com/)
2. Sign up for a free account
3. Navigate to your account dashboard
4. Copy your default public access token

### 2. Configure the Access Token

The app now uses environment variables for secure token management. You need to set up two environment variables:

#### A. Create Environment File

Copy `env.example` to `.env` and add your tokens:

```bash
cp env.example .env
```

#### B. Set Environment Variables

Edit your `.env` file with your actual Mapbox tokens:

```env
# Public access token for the Map component
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=your_public_access_token_here

# Download token for the Mapbox plugin (used during build)
EXPO_PUBLIC_MAPBOX_DOWNLOAD_TOKEN=your_download_token_here
```

Replace the placeholder values with your actual Mapbox tokens from [Mapbox Account](https://account.mapbox.com/).

**Note:** The `EXPO_PUBLIC_` prefix makes these variables available to your app at runtime. Keep your tokens secure and never commit them to version control.

## Usage

The Map component is already integrated into the Explore page. It displays a map centered on Brighton, UK with the following features:

- Interactive map with street view
- User location tracking (if permissions are granted)
- Smooth camera animations
- Loading state indicator
- Error handling for missing access token

## Props

- `style`: Custom styles for the container
- `initialCenter`: Initial map center coordinates `[longitude, latitude]` (default: Brighton, NY)
- `initialZoom`: Initial zoom level (default: 12)
- `showUserLocation`: Whether to show user location (default: true)
- `onMapPress`: Callback for map touch events
- `onMapLoad`: Callback when map finishes loading

## Permissions

The component requires location permissions to show user location. Make sure to handle location permissions in your app configuration.

## Styling

The component supports theming and will automatically adapt to light/dark mode using the app's color scheme.
