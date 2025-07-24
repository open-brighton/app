# Progress Components

This directory contains reusable progress components that use Lottie animations for smooth, engaging loading states.

## Components

### Progress

A simple progress component that shows progress using the Lottie animation from the splash screen.

**Props:**

- `progress` (number, optional): Progress value from 0 to 1 (default: 0)
- `size` (number, optional): Size of the animation in pixels (default: 200)
- `autoPlay` (boolean, optional): Whether to auto-play the animation (default: true)
- `loop` (boolean, optional): Whether to loop the animation (default: false)
- `onAnimationFinish` (function, optional): Callback when animation finishes
- `style` (object, optional): Additional styles

**Usage:**

```tsx
import Progress from "@/components/Progress";

<Progress
  progress={0.5}
  size={150}
  onAnimationFinish={() => console.log("Animation finished")}
/>;
```

### ProgressSpinner

A more advanced progress component with different states and messaging.

**Props:**

- `progress` (number, optional): Progress value from 0 to 1 (default: 0)
- `size` (number, optional): Size of the animation in pixels (default: 200)
- `showProgress` (boolean, optional): Whether to show progress text (default: true)
- `message` (string, optional): Custom message to display
- `state` (string, optional): Current state - "loading", "success", "error", or "idle" (default: "loading")
- `onStateChange` (function, optional): Callback when state changes
- `style` (object, optional): Additional styles

**Usage:**

```tsx
import ProgressSpinner from "@/components/ProgressSpinner";

<ProgressSpinner
  progress={0.75}
  state="loading"
  message="Uploading files..."
  onStateChange={(state) => console.log("State changed to:", state)}
/>;
```

## States

The `ProgressSpinner` component supports different states:

- **loading**: Shows animated progress with the Lottie animation
- **success**: Shows completion state (plays animation to end)
- **error**: Shows error state (resets animation)
- **idle**: Shows ready state (resets animation)

## Examples

### Basic Progress

```tsx
const [progress, setProgress] = useState(0);

<Progress progress={progress} />;
```

### Loading State with Message

```tsx
const [state, setState] = useState("loading");

<ProgressSpinner
  state={state}
  message="Processing your request..."
  onStateChange={setState}
/>;
```

### Progress with Custom Size

```tsx
<ProgressSpinner progress={0.6} size={300} message="Downloading..." />
```

## Demo

Visit the Explore tab in the app to see live examples of both components in action. The demo includes:

- Progress animation with real-time progress updates
- Progress spinner with different states
- Interactive buttons to test different scenarios
- Error simulation
- Reset functionality

## Technical Details

Both components use the same Lottie animation file (`assets/animations/lottie/animations/animation.json`) that was originally used in the splash screen. The animation has 181 frames total, and the components can seek to specific frames based on the progress value.

The components automatically adapt to the current theme (light/dark mode) and use the app's color scheme for consistent styling.
