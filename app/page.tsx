import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, ListChecks } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/todos");
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Organize Your Life with Todo App
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple yet powerful todo application to manage your tasks
            efficiently. Sign up now to get started!
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link href="/sign-up">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <ListChecks className="h-8 w-8 text-primary" />
                <CardTitle>Task Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create, organize, and prioritize your todos with ease. Keep track
                of what needs to be done.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <CheckCircle className="h-8 w-8 text-primary" />
                <CardTitle>Stay Productive</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Mark tasks as complete and watch your productivity soar. Visual
                progress indicators keep you motivated.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Clock className="h-8 w-8 text-primary" />
                <CardTitle>Anywhere Access</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Access your todos from any device. Your tasks are always in sync
                and available when you need them.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center pt-12 text-muted-foreground text-sm">
          <p>Already have an account? <Link href="/sign-in" className="text-primary hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}