import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Users,
  TrendingUp,
  Home,
  IndianRupee,
  ArrowLeft,
  Plus,
  MessagesSquare,
  Trash2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { api, EnhancementSummary } from '@/lib/mockApi';
import { Property } from '@/components/PropertyCard';
import { fallbackProperties, fallbackStats } from '@/lib/demoData';
import { useToast } from '@/hooks/use-toast';

interface DashboardStats {
  totalUsers: number;
  totalAssessments: number;
  avgValueIncrease: string;
  activeRecommendations: number;
  activeFeatures?: number;
  totalRequests?: number;
  pendingRequests?: number;
}

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

interface ListingFormState {
  title: string;
  location: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  propertyType: string;
  imageUrl: string;
  description: string;
}

interface RecommendationFormState {
  title: string;
  category: string;
  short: string;
  costRange: string;
  roi: string;
  duration: string;
  impact: 'High' | 'Medium' | 'Long Term';
}

const emptyListing: ListingFormState = {
  title: '',
  location: '',
  price: '',
  beds: '',
  baths: '',
  sqft: '',
  propertyType: '',
  imageUrl: '',
  description: '',
};

const emptyRecommendation: RecommendationFormState = {
  title: '',
  category: '',
  short: '',
  costRange: '',
  roi: '',
  duration: '',
  impact: 'High',
};

const createRecommendationId = (title: string) =>
  title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ('rec-' + Date.now());

const AdminDashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>(fallbackStats);
  const [properties, setProperties] = useState<Property[]>([]);
  const [recommendations, setRecommendations] = useState<EnhancementSummary[]>([]);
  const [requests, setRequests] = useState<CustomerRequest[]>([]);
  const [responseDrafts, setResponseDrafts] = useState<Record<number, string>>({});
  const [statusDrafts, setStatusDrafts] = useState<Record<number, string>>({});
  const [listingForm, setListingForm] = useState<ListingFormState>(emptyListing);
  const [recommendationForm, setRecommendationForm] = useState<RecommendationFormState>(emptyRecommendation);
  const [isSavingListing, setIsSavingListing] = useState(false);
  const [isSavingRecommendation, setIsSavingRecommendation] = useState(false);
  const [respondingId, setRespondingId] = useState<number | null>(null);
  const [deletingPropertyId, setDeletingPropertyId] = useState<number | null>(null);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

    fetch(baseUrl + '/stats')
      .then((res) => {
        if (!res.ok) throw new Error('Stats unavailable');
        return res.json();
      })
      .then((data) => setStats(data))
      .catch(() => setStats(fallbackStats));

    fetch(baseUrl + '/properties')
      .then((res) => {
        if (!res.ok) throw new Error('Properties unavailable');
        return res.json();
      })
      .then((data) => setProperties(data))
      .catch(() => setProperties(fallbackProperties));

    fetch(baseUrl + '/requests')
      .then((res) => {
        if (!res.ok) throw new Error('Requests unavailable');
        return res.json();
      })
      .then((data) => {
        setRequests(data);
        setResponseDrafts(Object.fromEntries(data.map((item: CustomerRequest) => [item.id, item.adminResponse ?? ''])));
        setStatusDrafts(Object.fromEntries(data.map((item: CustomerRequest) => [item.id, item.status ?? 'Pending'])));
      })
      .catch(() => setRequests([]));

    api.listEnhancements()
      .then((data) => setRecommendations(data))
      .catch(() => setRecommendations([]));
  }, []);

  const refreshStatsAfterListing = (nextCount: number) => {
    setStats((current) => ({
      ...current,
      totalAssessments: nextCount,
    }));
  };

  const refreshStatsAfterRecommendation = (nextCount: number) => {
    setStats((current) => ({
      ...current,
      activeRecommendations: nextCount,
    }));
  };

  const refreshPendingRequests = (nextRequests: CustomerRequest[]) => {
    setStats((current) => ({
      ...current,
      pendingRequests: nextRequests.filter((item) => item.status === 'Pending').length,
    }));
  };

  const handleListingSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!listingForm.title || !listingForm.location || !listingForm.price || !listingForm.propertyType) {
      toast({
        title: 'Missing listing details',
        description: 'Add the title, location, price, and property type before saving.',
        variant: 'destructive',
      });
      return;
    }

    setIsSavingListing(true);

    const payload: Property = {
      id: Date.now(),
      title: listingForm.title.trim(),
      location: listingForm.location.trim(),
      price: Number(listingForm.price),
      beds: Number(listingForm.beds || 0),
      baths: Number(listingForm.baths || 0),
      sqft: Number(listingForm.sqft || 0),
      propertyType: listingForm.propertyType.trim(),
      imageUrl: listingForm.imageUrl.trim() || 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=900&q=80',
      description: listingForm.description.trim() || 'Newly added residential listing for homeowner recommendations.',
    };

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
      const response = await fetch(baseUrl + '/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Could not save listing');
      }

      const savedProperty = await response.json();
      const nextProperties = [savedProperty, ...properties];
      setProperties(nextProperties);
      refreshStatsAfterListing(nextProperties.length);
      setListingForm(emptyListing);
      toast({
        title: 'Listing added',
        description: 'The property listing is now available in the platform data.',
      });
    } catch {
      const nextProperties = [payload, ...properties];
      setProperties(nextProperties);
      refreshStatsAfterListing(nextProperties.length);
      setListingForm(emptyListing);
      toast({
        title: 'Listing saved locally',
        description: 'The API is unavailable right now, so the new listing is shown in this session only.',
      });
    } finally {
      setIsSavingListing(false);
    }
  };

  const handleRecommendationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!recommendationForm.title || !recommendationForm.category || !recommendationForm.short) {
      toast({
        title: 'Missing recommendation details',
        description: 'Add the title, category, and short summary before saving.',
        variant: 'destructive',
      });
      return;
    }

    setIsSavingRecommendation(true);

    const summary: EnhancementSummary = {
      id: createRecommendationId(recommendationForm.title),
      title: recommendationForm.title.trim(),
      short: recommendationForm.short.trim(),
      category: recommendationForm.category.trim(),
      costRange: recommendationForm.costRange.trim() || 'Rs. 10,000 - Rs. 50,000',
      roi: recommendationForm.roi.trim() || '+12% Value',
      duration: recommendationForm.duration.trim() || '2-5 days',
      impact: recommendationForm.impact,
    };

    const payload = {
      id: summary.id,
      title: summary.title,
      shortDesc: summary.short,
      category: summary.category,
      costRange: summary.costRange,
      roi: summary.roi,
      duration: summary.duration,
      impact: summary.impact,
      longDescription: summary.title + ' is a practical improvement idea for Indian middle-class homes.',
      materials: '[]',
      steps: '[]',
    };

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
      const response = await fetch(baseUrl + '/enhancements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Could not save recommendation');
      }

      const saved = await response.json();
      const nextRecommendations = [
        {
          id: saved.id,
          title: saved.title,
          short: saved.short ?? saved.shortDesc,
          category: saved.category,
          costRange: saved.costRange,
          roi: saved.roi,
          duration: saved.duration,
          impact: saved.impact,
        },
        ...recommendations,
      ];
      setRecommendations(nextRecommendations);
      refreshStatsAfterRecommendation(nextRecommendations.length);
      setRecommendationForm(emptyRecommendation);
      toast({
        title: 'Recommendation added',
        description: 'The new improvement idea is now part of the curated catalog.',
      });
    } catch {
      const nextRecommendations = [summary, ...recommendations];
      setRecommendations(nextRecommendations);
      refreshStatsAfterRecommendation(nextRecommendations.length);
      setRecommendationForm(emptyRecommendation);
      toast({
        title: 'Recommendation saved locally',
        description: 'The API is unavailable right now, so the new recommendation is shown in this session only.',
      });
    } finally {
      setIsSavingRecommendation(false);
    }
  };

  const handleDeleteProperty = async (propertyId: number) => {
    setDeletingPropertyId(propertyId);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
      const response = await fetch(baseUrl + '/properties/' + propertyId, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Could not delete property');
      }

      const nextProperties = properties.filter((property) => property.id !== propertyId);
      setProperties(nextProperties);
      refreshStatsAfterListing(nextProperties.length);
      toast({
        title: 'Property removed',
        description: 'The selected property was removed from the listing.',
      });
    } catch {
      toast({
        title: 'Delete failed',
        description: 'The property could not be removed right now.',
        variant: 'destructive',
      });
    } finally {
      setDeletingPropertyId(null);
    }
  };

  const handleRespond = async (requestId: number) => {
    const adminResponse = responseDrafts[requestId]?.trim();
    const status = statusDrafts[requestId] || 'Answered';

    if (!adminResponse) {
      toast({
        title: 'Response required',
        description: 'Write a reply before sending it back to the user queue.',
        variant: 'destructive',
      });
      return;
    }

    setRespondingId(requestId);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
      const response = await fetch(baseUrl + '/requests/' + requestId + '/respond', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminResponse, status }),
      });

      if (!response.ok) {
        throw new Error('Could not save response');
      }

      const saved = await response.json();
      const nextRequests = requests.map((item) => (item.id === requestId ? saved : item));
      setRequests(nextRequests);
      refreshPendingRequests(nextRequests);
      toast({
        title: 'Reply sent',
        description: 'The user request now has an admin response attached to it.',
      });
    } catch {
      toast({
        title: 'Reply failed',
        description: 'The admin response could not be saved right now.',
        variant: 'destructive',
      });
    } finally {
      setRespondingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <div className="bg-gradient-to-r from-[#0c4a6e] to-[#059669] py-8 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-4">
                <Link to="/">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Site
                  </Button>
                </Link>
              </div>
              <h1 className="mb-2 text-4xl font-serif font-bold tracking-tight">Admin Dashboard</h1>
              <p className="font-light text-white/90">Curate recommendations, manage property listings, and reply to user requests.</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-light text-white/80">Platform focus</p>
              <p className="text-xl font-semibold">Indian middle-class homes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          <Card className="shadow-brand-md hover-lift"><CardContent className="flex items-center justify-between p-6"><div><p className="text-sm font-medium text-muted-foreground">Total Users</p><p className="text-3xl font-bold text-[#0c4a6e]">{stats.totalUsers.toLocaleString('en-IN')}</p></div><Users className="h-10 w-10 text-[#0c4a6e]" /></CardContent></Card>
          <Card className="shadow-brand-md hover-lift"><CardContent className="flex items-center justify-between p-6"><div><p className="text-sm font-medium text-muted-foreground">Property Listings</p><p className="text-3xl font-bold text-[#059669]">{stats.totalAssessments.toLocaleString('en-IN')}</p></div><Home className="h-10 w-10 text-[#059669]" /></CardContent></Card>
          <Card className="shadow-brand-md hover-lift"><CardContent className="flex items-center justify-between p-6"><div><p className="text-sm font-medium text-muted-foreground">Avg. Value Increase</p><p className="text-3xl font-bold text-[#d97706]">{stats.avgValueIncrease}</p></div><IndianRupee className="h-10 w-10 text-[#d97706]" /></CardContent></Card>
          <Card className="shadow-brand-md hover-lift"><CardContent className="flex items-center justify-between p-6"><div><p className="text-sm font-medium text-muted-foreground">Active Recommendations</p><p className="text-3xl font-bold text-[#0c4a6e]">{stats.activeRecommendations}</p></div><TrendingUp className="h-10 w-10 text-[#0c4a6e]" /></CardContent></Card>
          <Card className="shadow-brand-md hover-lift"><CardContent className="flex items-center justify-between p-6"><div><p className="text-sm font-medium text-muted-foreground">Pending Requests</p><p className="text-3xl font-bold text-[#7c3aed]">{(stats.pendingRequests ?? requests.filter((item) => item.status === 'Pending').length).toLocaleString('en-IN')}</p></div><MessagesSquare className="h-10 w-10 text-[#7c3aed]" /></CardContent></Card>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr]">
          <div className="space-y-8">
            <Card className="shadow-brand-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Incoming User Requests</CardTitle>
                <CardDescription>Requests submitted by logged-in users and the admin replies attached to them</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {requests.length === 0 ? (
                  <div className="rounded-lg border bg-slate-50 p-4 text-sm text-slate-500">No user requests yet. New requests from the site will appear here.</div>
                ) : (
                  requests.map((request) => (
                    <div key={request.id} className="rounded-xl border border-slate-200 p-5">
                      <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <p className="text-lg font-semibold text-slate-900">{request.requirementType || 'General request'}</p>
                          {request.requestGoal && <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{request.requestGoal}</p>}
                          <p className="text-sm text-slate-600">{request.userName} | {request.userEmail}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {request.city ? request.city + ' | ' : ''}
                            {request.propertyType ? request.propertyType + ' | ' : ''}
                            {request.budgetRange ? request.budgetRange + ' | ' : ''}
                            {request.timeline ? request.timeline + ' | ' : ''}
                            {request.phone ? request.phone + ' | ' : ''}
                            {request.createdAt ? new Date(request.createdAt).toLocaleString('en-IN') : 'Recently submitted'}
                          </p>
                        </div>
                        <Badge variant={request.status === 'Pending' ? 'secondary' : 'default'}>{request.status}</Badge>
                      </div>

                      <div className="mb-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">{request.message}</div>

                      <div className="grid gap-4 lg:grid-cols-[1fr_180px]">
                        <div className="space-y-2">
                          <Label htmlFor={'reply-' + request.id}>Admin Response</Label>
                          <Textarea
                            id={'reply-' + request.id}
                            rows={4}
                            value={responseDrafts[request.id] ?? ''}
                            onChange={(event) => setResponseDrafts((current) => ({ ...current, [request.id]: event.target.value }))}
                            placeholder="Recommend next steps, budget guidance, or schedule details for the user."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={'status-' + request.id}>Status</Label>
                          <select
                            id={'status-' + request.id}
                            value={statusDrafts[request.id] ?? request.status}
                            onChange={(event) => setStatusDrafts((current) => ({ ...current, [request.id]: event.target.value }))}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Answered">Answered</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                          </select>
                          <Button className="w-full" onClick={() => handleRespond(request.id)} disabled={respondingId === request.id}>
                            {respondingId === request.id ? 'Sending...' : 'Send Reply'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="shadow-brand-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Managed Property Listings</CardTitle>
                <CardDescription>Listings currently available to users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium">{property.title}</p>
                      <p className="text-sm text-muted-foreground">{property.location}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="outline">{property.propertyType}</Badge>
                      <Badge variant="secondary">Rs. {property.price.toLocaleString('en-IN')}</Badge>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProperty(Number(property.id))}
                        disabled={deletingPropertyId === Number(property.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {deletingPropertyId === Number(property.id) ? 'Removing...' : 'Remove'}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-brand-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Curated Improvement Recommendations</CardTitle>
                <CardDescription>Ideas shown to homeowners for value enhancement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((item) => (
                  <div key={item.id} className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.costRange} | {item.roi}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge className="bg-green-600 text-white">{item.category}</Badge>
                      <Badge variant="outline">{item.impact}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-brand-lg">
              <CardHeader>
                <CardTitle className="font-serif">Add Property Listing</CardTitle>
                <CardDescription>Create a new residential listing for the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleListingSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="listing-title">Listing Title</Label>
                    <Input id="listing-title" value={listingForm.title} onChange={(event) => setListingForm((current) => ({ ...current, title: event.target.value }))} placeholder="3 BHK resale flat with renovation potential" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="listing-location">Location</Label>
                    <Input id="listing-location" value={listingForm.location} onChange={(event) => setListingForm((current) => ({ ...current, location: event.target.value }))} placeholder="Gachibowli, Hyderabad" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="listing-price">Price</Label>
                      <Input id="listing-price" type="number" value={listingForm.price} onChange={(event) => setListingForm((current) => ({ ...current, price: event.target.value }))} placeholder="8500000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="listing-type">Property Type</Label>
                      <Input id="listing-type" value={listingForm.propertyType} onChange={(event) => setListingForm((current) => ({ ...current, propertyType: event.target.value }))} placeholder="Apartment" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="listing-beds">Beds</Label>
                      <Input id="listing-beds" type="number" value={listingForm.beds} onChange={(event) => setListingForm((current) => ({ ...current, beds: event.target.value }))} placeholder="3" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="listing-baths">Baths</Label>
                      <Input id="listing-baths" type="number" value={listingForm.baths} onChange={(event) => setListingForm((current) => ({ ...current, baths: event.target.value }))} placeholder="2" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="listing-sqft">Sq Ft</Label>
                      <Input id="listing-sqft" type="number" value={listingForm.sqft} onChange={(event) => setListingForm((current) => ({ ...current, sqft: event.target.value }))} placeholder="1450" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="listing-image">Image URL</Label>
                    <Input id="listing-image" value={listingForm.imageUrl} onChange={(event) => setListingForm((current) => ({ ...current, imageUrl: event.target.value }))} placeholder="https://example.com/home.jpg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="listing-description">Why it adds value</Label>
                    <Textarea id="listing-description" value={listingForm.description} onChange={(event) => setListingForm((current) => ({ ...current, description: event.target.value }))} placeholder="Mention upgrade potential, locality demand, or resale upside." />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-[#0c4a6e] to-[#059669] text-white hover:opacity-90" disabled={isSavingListing}>
                    <Plus className="mr-2 h-4 w-4" />
                    {isSavingListing ? 'Saving Listing...' : 'Add Listing'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="shadow-brand-lg">
              <CardHeader>
                <CardTitle className="font-serif">Add Recommendation</CardTitle>
                <CardDescription>Publish a new value-enhancing idea for homeowners</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRecommendationSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recommendation-title">Recommendation Title</Label>
                    <Input id="recommendation-title" value={recommendationForm.title} onChange={(event) => setRecommendationForm((current) => ({ ...current, title: event.target.value }))} placeholder="Ventilation and exhaust upgrade" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="recommendation-category">Category</Label>
                      <Input id="recommendation-category" value={recommendationForm.category} onChange={(event) => setRecommendationForm((current) => ({ ...current, category: event.target.value }))} placeholder="Utility" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recommendation-impact">Impact</Label>
                      <select
                        id="recommendation-impact"
                        value={recommendationForm.impact}
                        onChange={(event) => setRecommendationForm((current) => ({ ...current, impact: event.target.value as RecommendationFormState['impact'] }))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Long Term">Long Term</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recommendation-short">Short Summary</Label>
                    <Textarea id="recommendation-short" value={recommendationForm.short} onChange={(event) => setRecommendationForm((current) => ({ ...current, short: event.target.value }))} placeholder="Explain why this idea helps middle-class homes become more attractive and valuable." />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="recommendation-cost">Cost Range</Label>
                      <Input id="recommendation-cost" value={recommendationForm.costRange} onChange={(event) => setRecommendationForm((current) => ({ ...current, costRange: event.target.value }))} placeholder="Rs. 20,000 - Rs. 45,000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recommendation-roi">ROI</Label>
                      <Input id="recommendation-roi" value={recommendationForm.roi} onChange={(event) => setRecommendationForm((current) => ({ ...current, roi: event.target.value }))} placeholder="+14% Value" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recommendation-duration">Duration</Label>
                      <Input id="recommendation-duration" value={recommendationForm.duration} onChange={(event) => setRecommendationForm((current) => ({ ...current, duration: event.target.value }))} placeholder="2-4 days" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" variant="outline" disabled={isSavingRecommendation}>
                    <Plus className="mr-2 h-4 w-4" />
                    {isSavingRecommendation ? 'Saving Recommendation...' : 'Add Recommendation'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="shadow-brand-lg">
              <CardHeader>
                <CardTitle className="font-serif">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between"><span className="text-sm">Platform Status</span><Badge className="bg-green-500 text-white">Online</Badge></div>
                <div className="flex items-center justify-between"><span className="text-sm">Database</span><Badge className="bg-green-500 text-white">Ready</Badge></div>
                <div className="flex items-center justify-between"><span className="text-sm">API Status</span><Badge className="bg-green-500 text-white">Connected</Badge></div>
                <div className="flex items-center justify-between"><span className="text-sm">Feature Cards</span><Badge variant="secondary">{(stats.activeFeatures ?? 6).toLocaleString('en-IN')}</Badge></div>
                <div className="flex items-center justify-between"><span className="text-sm">Total Requests</span><Badge variant="secondary">{(stats.totalRequests ?? requests.length).toLocaleString('en-IN')}</Badge></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
