"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Zap, Plug, Car, MapPin, Smartphone, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const googleMapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.001839478255!2d-77.0368703!3d38.9071923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7bcdf572b1f%3A0xefbdfd5714d0c857!2sWashington%2C%20DC!5e0!3m2!1sen!2sus!4v1730590800000!5m2!1sen!2sus";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`relative w-full ${className}`}>{children}</section>
);

type StickyProps = {
  children: ReactNode;
  className?: string;
  innerClass?: string;
};

const Sticky = ({ children, className = "", innerClass = "" }: StickyProps) => (
  <div className={`sticky top-0 h-[100vh] flex items-center ${className}`}>
    <div className={`w-full ${innerClass}`}>{children}</div>
  </div>
);

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.4,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left"
      style={{ scaleX }}
    >
      <div className="h-full w-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600" />
    </motion.div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <Section className="bg-black text-white">
      <div ref={ref} className="relative h-[160vh]">
        <Sticky className="bg-[radial-gradient(90%_60%_at_50%_40%,rgba(56,189,248,0.20),rgba(0,0,0,0)_70%)]">
          <motion.div
            style={{ y, opacity, scale }}
            className="mx-auto max-w-6xl px-6 text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <Zap className="h-4 w-4 text-cyan-300" />
              <span className="text-white/90">Charge • Connect • Care</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight leading-[1.05] md:text-6xl">
              Mobile EV charging, on demand —
              <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                {" "}
                anywhere in the DMV
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80 md:text-xl">
              Triple C Emergency Charging Services brings the charge to you. Smooth dispatch, secure payment, real-time ETA.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button className="rounded-2xl px-6 py-6 text-base">Request a Charge</Button>
              <Button
                variant="secondary"
                className="rounded-2xl px-6 py-6 text-base bg-white/10 text-white transition hover:bg-white/20"
              >
                How it works
              </Button>
            </div>
          </motion.div>
        </Sticky>
      </div>
    </Section>
  );
}

type StoryPanelProps = {
  step: number;
  title: string;
  subtitle: string;
  icon?: LucideIcon;
  image?: string;
  media?: ReactNode;
  invert?: boolean;
};

function StoryPanel({ step, title, subtitle, icon: Icon, image, media, invert }: StoryPanelProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yTxt = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <Section className="bg-white">
      <div ref={ref} className="mx-auto max-w-6xl px-6 py-24 md:py-36">
        <div className={`grid items-center gap-10 md:grid-cols-2 ${invert ? "md:[&>*:first-child]:order-2" : ""}`}>
          <motion.div style={{ y: yTxt, opacity }}>
            <div className="mb-4 inline-flex items-center gap-2 text-sm text-sky-700">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-700">
                {step}
              </span>
              <span className="uppercase tracking-wide">Step {step}</span>
            </div>
            <h2 className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              {Icon ? <Icon className="h-8 w-8 text-sky-500" /> : null} {title}
            </h2>
            <p className="mt-4 text-lg text-slate-600">{subtitle}</p>
          </motion.div>

          <motion.div style={{ y: yImg, opacity }} className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-sky-100 to-transparent opacity-70 blur-2xl" />
            <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
              {media ??
                (image ? (
                  <Image
                    src={image}
                    alt={title}
                    width={1280}
                    height={960}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                    sizes="(min-width: 1024px) 600px, (min-width: 768px) 80vw, 100vw"
                  />
                ) : null)}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function Features() {
  const features = [
    { icon: MapPin, title: "DMV Coverage", text: "We come to you — DC, Maryland, Virginia." },
    { icon: Smartphone, title: "Live ETA & Updates", text: "Track arrival, contact driver, update location." },
    { icon: ShieldCheck, title: "Safe & Insured", text: "Vetted techs. Secure payments. Serious about safety." },
    { icon: Plug, title: "Multiple Connectors", text: "Adapters for popular EVs and charging standards." },
  ];

  return (
    <Section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">Built for reliability</h3>
          <p className="mt-3 text-slate-600">No drama. Just power when you need it most.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="rounded-2xl shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <feature.icon className="h-8 w-8 text-sky-600" />
                  <h4 className="mt-4 font-semibold text-slate-900">{feature.title}</h4>
                  <p className="mt-2 text-sm text-slate-600">{feature.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Pricing() {
  return (
    <Section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
        <div className="mb-10 text-center">
          <h3 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Simple, transparent pricing
          </h3>
          <p className="mt-3 text-slate-600">Pay once dispatch is confirmed — no hidden fees.</p>
        </div>
        <div className="flex justify-center">
          <Card className="max-w-lg rounded-3xl border-slate-200 shadow-lg">
            <CardContent className="p-8 text-center">
              <Plug className="mx-auto h-8 w-8 text-sky-600" />
              <h4 className="mt-4 font-semibold text-slate-900">Emergency Charge — Flat</h4>
              <div className="mt-4 flex items-baseline justify-center gap-2">
                <span className="text-4xl font-bold tracking-tight">$149</span>
                <span className="text-slate-500">+ per-mile after 15mi</span>
              </div>
              <ul className="mt-6 space-y-2 text-left text-sm text-slate-600">
                <li>• Dispatch within standard hours</li>
                <li>• Live ETA and updates</li>
                <li>• Adapter included (popular EVs)</li>
              </ul>
              <div className="mt-6 flex justify-center gap-3">
                <Button className="rounded-xl py-5">Request Now</Button>
                <Button variant="secondary" className="rounded-xl py-5">
                  Talk to us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function CTA() {
  return (
    <Section className="bg-black text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-24 md:grid-cols-2 md:py-36">
        <div>
          <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">Ready when you are.</h3>
          <p className="mt-3 max-w-xl text-white/80">
            Book a mobile charge in under a minute. We’ll meet you where you are — parking lot, roadside, or driveway.
          </p>
          <div className="mt-6 flex gap-3">
            <Button className="rounded-2xl px-6 py-6 text-base">Book a Charge</Button>
            <Button
              variant="secondary"
              className="rounded-2xl px-6 py-6 text-base bg-white/10 text-white transition hover:bg-white/20"
            >
              See coverage
            </Button>
          </div>
        </div>
        <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80"
            alt="EV charging at night"
            width={1280}
            height={960}
            className="h-auto w-full object-cover"
            loading="lazy"
            sizes="(min-width: 1024px) 600px, (min-width: 768px) 80vw, 100vw"
          />
        </div>
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <div className="bg-white text-slate-900">
      <ProgressBar />
      <Hero />
      <StoryPanel
        step={1}
        title="We find you fast"
        subtitle="Pin your location and tell us about your EV. Our dispatcher locks your ETA and sends a tech."
        icon={MapPin}
        media={
          <iframe
            src={googleMapsEmbedUrl}
            title="Washington DC coverage map"
            className="h-[320px] w-full border-0 md:h-[420px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        }
      />
      <StoryPanel
        step={2}
        title="We connect the charge"
        subtitle="The tech arrives, verifies safety, and connects the right adapter — no fuss."
        icon={Plug}
        image="https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&w=1600&q=80"
        invert
      />
      <StoryPanel
        step={3}
        title="Power up and go"
        subtitle="Top up enough to reach your next charger or get back on your route."
        icon={Car}
        image="https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=1600&q=80"
      />
      <Features />
      <Pricing />
      <CTA />
    </div>
  );
}
