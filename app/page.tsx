import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Shield, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <main className="flex max-w-3xl flex-col items-center gap-12 py-24 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Voxr
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Anonymous internal feedback for modern teams. Give every employee a voice.
          </p>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center gap-2 pt-6">
              <Shield className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Anonymous</h3>
              <p className="text-sm text-muted-foreground">
                Share feedback without revealing your identity
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center gap-2 pt-6">
              <Users className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Workspace-based</h3>
              <p className="text-sm text-muted-foreground">
                Private spaces for your team only
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center gap-2 pt-6">
              <MessageSquare className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Interactive</h3>
              <p className="text-sm text-muted-foreground">
                Comments, reactions, and discussions
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
