import { router } from "expo-router";
import React from "react";
import SplashScreen from "../components/SplashScreen";

export default function SplashDebugScreen() {
  const handleGoBack = () => {
    router.back();
  };

  return <SplashScreen onFinish={handleGoBack} />;
}
