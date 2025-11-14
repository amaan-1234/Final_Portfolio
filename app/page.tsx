import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Publications from "@/components/publications"
import Education from "@/components/education"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import SocialSidebar from "@/components/social-sidebar"
import ScrollToTop from "@/components/scroll-to-top"
import { AnimatedBackground } from "@/components/animated-background"
import { GradientOrbs } from "@/components/gradient-orbs"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <AnimatedBackground />
      <GradientOrbs />
      <Header />
      <SocialSidebar />
      <Hero />
      <section id="about">
        <About />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="publications">
        <Publications />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
      <ScrollToTop />
    </main>
  )
}
