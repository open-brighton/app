# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Configure environment variables

   Create a `.env` file in the root directory with:

   ```
   EXPO_PUBLIC_API_HOST=https://api.openbrighton.com
   EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_public_token
   ```

   For **EAS Build** (cloud builds), `.env` is not pushed. Add the same variables as EAS Secrets so they are available during the build:

   ```bash
   eas secret:create --name EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN --value "pk.your_token" --scope project
   ```

   Optional (needed for the Mapbox native SDK download during prebuild):

   ```bash
   eas secret:create --name MAPBOX_DOWNLOAD_TOKEN --value "your_download_token" --scope project
   ```

   You can also set secrets in the [Expo dashboard](https://expo.dev) under your project → Secrets.

3. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Apollo Client Configuration

This project is configured with Apollo Client for GraphQL communication. The setup includes:

- **Apollo Client Configuration**: Located in `lib/apollo.ts`
- **GraphQL Endpoint**: Uses `https://api.openbrighton.com/graphql`
- **Environment Variables**: Configured via `EXPO_PUBLIC_API_HOST` in `.env`
- **Mutations**: Contact form submission using the `SubmitContact` mutation

### Contact Form

The contact form (`forms/ContactForm.tsx`) is configured to submit data to the GraphQL API using the following mutation:

```graphql
mutation SubmitContact($input: SubmitContactInput!) {
  submitContact(input: $input)
}
```

The form includes validation, loading states, and error handling.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **src/app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
