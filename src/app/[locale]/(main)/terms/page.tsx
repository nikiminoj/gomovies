"use client";
import * as motion from "motion/react-client";
import { TypographyH1 } from "@/components/ui/typography";

export default function TermsOfUsePage() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <TypographyH1>Terms of Use</TypographyH1>
      <p className="mt-4">
        {/* Replace with actual terms of use content */}
        These are the terms of use for our service. Please read them carefully.
        By using our service, you agree to these terms.
      </p>
    </motion.div>
  );
}