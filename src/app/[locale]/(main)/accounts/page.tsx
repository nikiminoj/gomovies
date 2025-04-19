import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type User } from "next-auth";

interface AccountsPageProps {
  user: User;
}

const AccountsPage: React.FC<AccountsPageProps> = ({ user }) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">My Account</h1>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
          <Button className="mt-4" href="/account/settings">
            Go to Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;