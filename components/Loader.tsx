import { ActivityIndicator, Dimensions, Platform, View } from "react-native";

const Loader = ({ isLoading }: {isLoading: boolean}) => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get("screen").height;

  if (!isLoading) return null;

  return (
    <View
      className="absolute top-0 left-0 w-full h-full bg-black/60 justify-center items-center z-10"
      style={{ height: screenHeight }}
    >
      <ActivityIndicator
        animating={isLoading}
        color="#fff"
        size={osName === "ios" ? "large" : 50}
      />
    </View>
  );
};

export default Loader;