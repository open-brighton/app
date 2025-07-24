import SplashScreen from "@/components/SplashScreen";
import { router } from "expo-router";
import React from "react";

export default function SplashDebugScreen() {
  const handleGoBack = () => {
    router.back();
  };

  return <SplashScreen onFinish={handleGoBack} />;
}
