import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  Home, 
  IndianRupee, 
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalUsers: number;
  totalAssessments: number;
  avgValueIncrease: string;
  activeRecommendations: number;
}

interface RecentAssessment {
  id: string;
  city: string;
  propertyType: string;
  budget: string;
  status: 'pending' | 'completed' | 'in-review';
  submittedAt: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 1247,
    totalAssessments: 856,
    avgValueIncrease: '₹2,34,500',
    activeRecommendations: 24
  });

  const [recentAssessments] = useState<RecentAssessment[]>([
    {
      id: '1',
      city: 'Bangalore',
      propertyType: 'Apartment',
      budget: '₹2,00,000',
      status: 'completed',
      submittedAt: '2024-01-15'
    },
    {
      id: '2',
      city: 'Mumbai',
      propertyType: 'Independent House',
      budget: '₹5,00,000',
      status: 'pending',
      submittedAt: '2024-01-14'
    },
    {
      id: '3',
      city: 'Delhi',
      propertyType: 'Villa',
      budget: '₹8,00,000',
      status: 'in-review',
      submittedAt: '2024-01-13'
    },
    {
      id: '4',
      city: 'Chennai',
      propertyType: 'Duplex',
      budget: '₹3,50,000',
      status: 'completed',
      submittedAt: '2024-01-12'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'in-review': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      case 'in-review': return 'In Review';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Link to="/">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Site
                  </Button>
                </Link>
              </div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-white/90">Manage HomeValue+ platform and user assessments</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm">Welcome back,</p>
              <p className="text-xl font-semibold">Admin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-brand-md hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-10 h-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-brand-md hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Assessments</p>
                  <p className="text-3xl font-bold text-success">{stats.totalAssessments.toLocaleString()}</p>
                </div>
                <Home className="w-10 h-10 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-brand-md hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Value Increase</p>
                  <p className="text-3xl font-bold text-accent">{stats.avgValueIncrease}</p>
                </div>
                <IndianRupee className="w-10 h-10 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-brand-md hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Recommendations</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.activeRecommendations}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Assessments */}
          <div className="lg:col-span-2">
            <Card className="shadow-brand-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Recent Assessments</CardTitle>
                    <CardDescription>Latest property assessment submissions</CardDescription>
                  </div>
                  <Button className="btn-hero">
                    <Plus className="w-4 h-4 mr-2" />
                    New Assessment
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {recentAssessments.map((assessment) => (
                    <div key={assessment.id} className="p-6 hover:bg-muted/20 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={`${getStatusColor(assessment.status)} text-white px-2 py-1`}>
                              {getStatusText(assessment.status)}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{assessment.submittedAt}</span>
                          </div>
                          <p className="font-medium">{assessment.propertyType} in {assessment.city}</p>
                          <p className="text-sm text-muted-foreground">Budget: {assessment.budget}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="shadow-brand-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Recommendation
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage User Accounts
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Home className="w-4 h-4 mr-2" />
                  Property Database
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="shadow-brand-lg mt-6">
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Platform Status</span>
                  <Badge className="bg-green-500 text-white">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge className="bg-green-500 text-white">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Status</span>
                  <Badge className="bg-green-500 text-white">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Backup</span>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;