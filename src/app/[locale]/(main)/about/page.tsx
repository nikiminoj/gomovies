import * as motion from "motion/react-client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-10"
    >
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h1 className="text-2xl font-bold">About Us</h1>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We are a dedicated team passionate about providing the best possible
            service to our users. Our mission is to [insert mission statement
            here]. We strive to [insert values or goals here] and are committed to
            [insert commitment here]. We are constantly working to improve and
            innovate, ensuring that we meet the evolving needs of our community.
            Thank you for being a part of our journey!
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}