import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ImpactCards from "../components/ImpactCards";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ImpactCards />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
