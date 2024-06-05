import {TourGuideClient} from "@sjmc11/tourguidejs/src/Tour" 

console.log("TourGuide is running");
try {
  const tg = new TourGuideClient();
  tg.start();
  console.log("TourGuide started successfully");
} catch (error) {
  console.error("An error occurred while starting TourGuide:", error);
}