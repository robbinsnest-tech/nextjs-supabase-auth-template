import SignOutButton from "@/components/auth/sign-out-button";
import { getUser } from "@/lib/auth";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const { data, error } = await getUser();
  const user = data?.user;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="md:col-span-1">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <span className="text-4xl text-gray-600">
                      {(
                        user?.user_metadata?.name?.[0] ||
                        user?.user_metadata?.full_name?.[0] ||
                        user?.email?.[0] ||
                        "?"
                      ).toUpperCase()}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {user?.user_metadata?.name ||
                    user?.user_metadata?.full_name ||
                    user?.email?.split("@")[0] ||
                    "Anonymous User"}
                </CardTitle>
                <p className="text-gray-500 text-sm">
                  {user?.email || "No email provided"}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Account ID
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">{user?.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Last Sign In
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(
                        user?.last_sign_in_at || ""
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome Back!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Welcome to your dashboard. Here you can manage your account
                    and view your activity.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Account Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Email Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-green-600 font-medium">
                        Verified
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Suspense>
      </main>
    </div>
  );
}
