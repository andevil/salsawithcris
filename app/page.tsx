import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StyleStrip } from "@/components/StyleStrip";
import { About } from "@/components/About";
import { ChoosePath } from "@/components/ChoosePath";
import { Services } from "@/components/Services";
import { WeeklySchedule } from "@/components/WeeklySchedule";
import { BookingCalendar } from "@/components/BookingCalendar";
import { Testimonials } from "@/components/Testimonials";
import { CommunityGallery } from "@/components/CommunityGallery";
import { VideoReels } from "@/components/VideoReels";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="portfolio-root page-bg">
      <Navbar />
      <main>
        <Hero />
        <StyleStrip />
        <About />
        <ChoosePath />
        <Services />
        <WeeklySchedule />
        <BookingCalendar />
        <Testimonials />
        <CommunityGallery />
        <VideoReels />
        <FAQAccordion />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
