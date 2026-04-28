import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, MessagesSquare, ShieldCheck } from "lucide-react";

interface CustomerRequest {
  id: number;
  userEmail: string;
  userName: string;
  phone?: string;
  city?: string;
  propertyType?: string;
  requestGoal?: string;
  budgetRange?: string;
  timeline?: string;
  requirementType?: string;
  message: string;
  status: string;
  adminResponse?: string;
  createdAt?: string;
}

const emptyForm = {
  userName: "",
  phone: "",
  city: "",
  propertyType: "",
  requestGoal: "",
  budgetRange: "",
  timeline: "",
  requirementType: "",
  message: "",
};

const budgetOptionsByGoal: Record<string, string[]> = {
  Buy: [
    "Under Rs. 25 Lakhs",
    "Rs. 25 Lakhs - Rs. 50 Lakhs",
    "Rs. 50 Lakhs - Rs. 1 Crore",
    "Rs. 1 Crore - Rs. 2 Crore",
    "Above Rs. 2 Crore",
  ],
  Sell: [
    "Expected sale under Rs. 50 Lakhs",
    "Expected sale Rs. 50 Lakhs - Rs. 1 Crore",
    "Expected sale Rs. 1 Crore - Rs. 2 Crore",
    "Expected sale Rs. 2 Crore - Rs. 5 Crore",
    "Expected sale above Rs. 5 Crore",
  ],
  Renovate: [
    "Under Rs. 50,000",
    "Rs. 50,000 - Rs. 2,00,000",
    "Rs. 2,00,000 - Rs. 5,00,000",
    "Rs. 5,00,000 - Rs. 10,00,000",
    "Above Rs. 10,00,000",
  ],
  Rent: [
    "Monthly rent under Rs. 15,000",
    "Monthly rent Rs. 15,000 - Rs. 30,000",
    "Monthly rent Rs. 30,000 - Rs. 60,000",
    "Monthly rent Rs. 60,000 - Rs. 1,00,000",
    "Monthly rent above Rs. 1,00,000",
  ],
};

export const UserRequestSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [requests, setRequests] = useState<CustomerRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const budgetOptions = form.requestGoal ? budgetOptionsByGoal[form.requestGoal] ?? [] : [];

  useEffect(() => {
    if (!user) {
      setRequests([]);
      return;
    }

    const fetchRequests = async () => {
      setLoading(true);
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
        const response = await fetch(`${baseUrl}/requests?email=${encodeURIComponent(user.email)}`);
        if (!response.ok) {
          throw new Error("Could not load your requests");
        }
        const data = await response.json();
        setRequests(data);
      } catch {
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!form.userName || !form.message || !form.requirementType || !form.requestGoal) {
      toast({
        title: "Missing details",
        description: "Add your name, request goal, request type, and message so the admin can help properly.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
      const response = await fetch(`${baseUrl}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          userEmail: user.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not send request");
      }

      const saved = await response.json();
      setRequests((current) => [saved, ...current]);
      setForm(emptyForm);
      toast({
        title: "Request sent",
        description: "Your request is now in the admin inbox. You can check back here for a reply.",
      });
    } catch {
      toast({
        title: "Request failed",
        description: "The request could not be sent right now. Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="request-help" className="bg-slate-50 py-20">
      <div className="container mx-auto px-6">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="mb-3 text-3xl font-bold text-slate-900 lg:text-4xl">Tell Admin What You Need</h2>
            <p className="max-w-3xl text-slate-600">
              Logged-in users can send a real request to the admin team for renovation ideas, property advice, resale planning, or budget guidance.
            </p>
          </div>
          {!user && (
            <Button onClick={() => navigate("/login")} className="bg-[#0c4a6e] text-white hover:bg-[#0a3a56]">
              Log In to Send Request
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-900">User Request Form</CardTitle>
              <CardDescription>
                Share what you want, and the admin can review the full details and reply from the dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="request-name">Full Name</Label>
                      <Input id="request-name" value={form.userName} onChange={(event) => setForm((current) => ({ ...current, userName: event.target.value }))} placeholder="Rahul Sharma" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="request-phone">Phone Number</Label>
                      <Input id="request-phone" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} placeholder="+91 9876543210" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="request-city">City</Label>
                      <Input id="request-city" value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))} placeholder="Bengaluru" />
                    </div>
                  <div className="space-y-2">
                    <Label htmlFor="request-property">Property Type</Label>
                    <Input id="request-property" value={form.propertyType} onChange={(event) => setForm((current) => ({ ...current, propertyType: event.target.value }))} placeholder="2 BHK Apartment" />
                  </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="request-goal">Main Goal</Label>
                      <select
                        id="request-goal"
                        value={form.requestGoal}
                        onChange={(event) => setForm((current) => ({ ...current, requestGoal: event.target.value, budgetRange: "" }))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="">Select goal</option>
                        <option value="Buy">Buy</option>
                        <option value="Sell">Sell</option>
                        <option value="Renovate">Renovate</option>
                        <option value="Rent">Rent</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="request-budget">Budget Range</Label>
                      <select
                        id="request-budget"
                        value={form.budgetRange}
                        onChange={(event) => setForm((current) => ({ ...current, budgetRange: event.target.value }))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        disabled={!form.requestGoal}
                      >
                        <option value="">{form.requestGoal ? "Select budget" : "Select goal first"}</option>
                        {budgetOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="request-timeline">Timeline</Label>
                      <select
                        id="request-timeline"
                        value={form.timeline}
                        onChange={(event) => setForm((current) => ({ ...current, timeline: event.target.value }))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="">Select timeline</option>
                        <option value="Immediately">Immediately</option>
                        <option value="Within 1 month">Within 1 month</option>
                        <option value="Within 3 months">Within 3 months</option>
                        <option value="Just exploring">Just exploring</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="request-type">What do you want?</Label>
                    <Input id="request-type" value={form.requirementType} onChange={(event) => setForm((current) => ({ ...current, requirementType: event.target.value }))} placeholder="Need renovation advice before resale" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="request-message">Message for Admin</Label>
                    <Textarea id="request-message" rows={6} value={form.message} onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))} placeholder="Explain your property, budget, timeline, and the kind of help you want from the admin team." />
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    Signed in as <span className="font-medium text-slate-900">{user.email}</span>
                  </div>

                  <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-[#0c4a6e] to-[#059669] text-white hover:opacity-90">
                    {submitting ? "Sending Request..." : "Send to Admin"}
                  </Button>
                </form>
              ) : (
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
                  <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-[#0c4a6e]" />
                  <p className="mb-4 text-lg font-medium text-slate-900">Log in first to send your request</p>
                  <p className="mb-6">Once you sign in, your requirement goes straight to the admin dashboard with your details.</p>
                  <Button onClick={() => navigate("/login")} className="bg-[#0c4a6e] text-white hover:bg-[#0a3a56]">Go to Login</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-slate-900">
                <MessagesSquare className="h-6 w-6 text-[#0c4a6e]" />
                Your Request Updates
              </CardTitle>
              <CardDescription>See what you have already sent and whether the admin has replied.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="rounded-lg border bg-slate-50 p-4 text-sm text-slate-500">Loading your request history...</div>
              ) : requests.length === 0 ? (
                <div className="rounded-lg border bg-slate-50 p-4 text-sm text-slate-500">No requests yet. Send one from the form and it will appear here.</div>
              ) : (
                requests.map((request) => (
                  <div key={request.id} className="rounded-xl border border-slate-200 p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">{request.requirementType || "General request"}</p>
                        {request.requestGoal && <p className="text-xs uppercase tracking-wide text-slate-500">{request.requestGoal}</p>}
                      </div>
                      <Badge variant={request.status === "Pending" ? "secondary" : "default"}>{request.status}</Badge>
                    </div>
                    <p className="mb-3 text-sm text-slate-600">{request.message}</p>
                    <div className="text-xs text-slate-500">
                      {request.city ? request.city + " | " : ""}
                      {request.propertyType ? request.propertyType + " | " : ""}
                      {request.budgetRange ? request.budgetRange + " | " : ""}
                      {request.timeline ? request.timeline + " | " : ""}
                      {request.createdAt ? new Date(request.createdAt).toLocaleString("en-IN") : "Recently sent"}
                    </div>
                    {request.adminResponse && (
                      <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">
                        <div className="mb-1 font-medium">Admin reply</div>
                        <div>{request.adminResponse}</div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
