import { SplashScreen as Splash } from "@/components/SplashScreen";
import { router } from "expo-router";
import React from "react";

export const SplashScreen = () => {
  const handleGoBack = () => {
    router.back();
  };

  return <Splash onFinish={handleGoBack} />;
};

export default SplashScreen;
