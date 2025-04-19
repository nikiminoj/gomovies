// src/app/[locale]/accounts/settings/page.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AccountSettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input id="email" defaultValue="user@example.com" className="col-span-3" />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label htmlFor="password" className="text-right">
                New Password
              </label>
              <Input id="password" type="password" className="col-span-3" />
            </div>
          </div>
          <Button className="mt-4">Update Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}