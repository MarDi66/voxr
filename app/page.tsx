import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Shield, Users, Lock, Eye, ClipboardList } from "lucide-react";
import VoxrLogo from "@/components/common/logo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <main className="flex max-w-3xl flex-col items-center gap-12 py-24 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl flex gap-4">
            <VoxrLogo className="w-18" />
            Voxr
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Anonymous internal feedback for modern teams. Give every employee a voice.
          </p>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center gap-2 pt-6">
              <Shield className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Anonymous</h3>
              <p className="text-sm text-muted-foreground">
                Share your thoughts without revealing your identity
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center gap-2 pt-6">
              <Users className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Workspace-based</h3>
              <p className="text-sm text-muted-foreground">
                Dedicated spaces scoped to your team or organization
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center gap-2 pt-6">
              <Lock className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">End-to-End Encrypted</h3>
              <p className="text-sm text-muted-foreground">
                Your data is encrypted so only your workspace can read it
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center gap-2 pt-6">
              <MessageSquare className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Feedbacks</h3>
              <p className="text-sm text-muted-foreground">
                Post feedback with comments, reactions, and discussions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center gap-2 pt-6">
              <ClipboardList className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Forms</h3>
              <p className="text-sm text-muted-foreground">
                Create and share forms to collect structured responses
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center gap-2 pt-6">
              <Eye className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Public & Private</h3>
              <p className="text-sm text-muted-foreground">
                Choose to share openly or keep feedback visible to admins only
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Link href="/auth">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
