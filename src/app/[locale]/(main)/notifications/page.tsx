import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { isNotNull, isNull, desc } from "drizzle-orm";
import { notifications as db_notifications } from "@/server/db/schema";
import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { TypographyH3, TypographyP } from "@/components/ui/typography";

async function getNotifications(userId: string) {
  const [notifications, read_notifications] = await Promise.all([
    db.select().from(db_notifications).where(isNull(db_notifications.readAt)).orderBy(desc(db_notifications.createdAt)),
    db.select().from(db_notifications).where(isNotNull(db_notifications.readAt)),
  ]);
  return { notifications, read_notifications };
}

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    return redirect('/api/auth/signin')
  }

  const { notifications, read_notifications } = await getNotifications(session.user.id);
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {notifications.length <= 0 && <EmptyState />}
      {notifications.length > 0 &&
        <div className="w-full max-w-xl mx-auto mt-6 mb-3 sm:mb-0">
          <div className="flex items-center justify-between space-x-4 mx-4 sm:mx-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Title</h1>
            </div>
            <div className="flex space-x-3">
              <Button className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer">Mark All As Read</Button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

const EmptyState = () => {
  return <div className="text-center py-12">
    <BellIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden={true} />
    <TypographyH3 className="mt-2 text-sm font-medium text-gray-900">No New Notifications</TypographyH3>
    <TypographyP className="mt-1 text-sm text-gray-500">You have no unread notifications.</TypographyP>
  </div>
}
