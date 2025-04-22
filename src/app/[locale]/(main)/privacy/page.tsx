"use client";

import * as motion from "motion/react-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="container mx-auto mt-10 max-w-3xl p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            This Privacy Policy describes how we collect, use, and share
            information about you when you use our services.
          </p>
          {/* Add more placeholder content as needed */}
        </CardContent>
      </Card>
    </motion.div>
  );
}