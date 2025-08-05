import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { db } from "@/firebase/firebase";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  getDocs,
  doc,
  getDoc 
} from "firebase/firestore";

import {
  User,
  Mail,
  Calendar,
  Search,
  Filter,
  Brain,
  Activity,
  TrendingUp,
  Shield,
  Heart,
  Target,
  Clock,
  FileText,
  Sparkles,
  BarChart3,
  Info,
  AlertCircle,
  CheckCircle,
  Stethoscope,
  Hospital,
  Baby,
  Users,
  ClipboardList,
  Eye,
  Edit,
  Plus,
  Download,
  Printer,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  Zap,
  Award,
  BookOpen,
  MessageSquare,
  PhoneCall,
  Video,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Types
interface Patient {
  id: string;
  userName: string;
  userEmail: string;
  dateOfBirth?: string;
  guardianName?: string;
  medicalRecordNumber?: string;
  lastAssessment?: Date;
  riskLevel?: 'low' | 'moderate' | 'high';
  totalAssessments?: number;
  latestScore?: number;
  status?: 'active' | 'pending' | 'completed';
}

interface ClinicalStats {
  totalPatients: number;
  activeAssessments: number;
  highRiskPatients: number;
  completedToday: number;
  averageRiskScore: number;
  monthlyGrowth: number;
}

interface RecentActivity {
  id: string;
  type: 'assessment' | 'follow-up' | 'consultation' | 'report';
  patientName: string;
  action: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
}

// Clinical Statistics Overview Component
const ClinicalStatsOverview = ({ stats }: { stats: ClinicalStats }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="enhanced-card border-2 border-red-200 bg-gradient-to-br from-red-50 to-white hover:shadow-lg transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-full">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-800">{stats.totalPatients}</p>
              <p className="text-sm text-muted-foreground">Total Patients</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-600 font-medium">+12% this month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="enhanced-card border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <ClipboardList className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-800">{stats.activeAssessments}</p>
              <p className="text-sm text-muted-foreground">Active Assessments</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">3 pending today</span>
          </div>
        </CardContent>
      </Card>

      <Card className="enhanced-card border-2 border-red-300 bg-gradient-to-br from-red-100 to-red-50 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-200 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-800">{stats.highRiskPatients}</p>
              <p className="text-sm text-muted-foreground">High Risk Cases</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-red-600 animate-pulse" />
            <span className="text-xs text-red-600 font-medium">Requires attention</span>
          </div>
        </CardContent>
      </Card>

      <Card className="enhanced-card border-2 border-green-200 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-800">{stats.completedToday}</p>
              <p className="text-sm text-muted-foreground">Completed Today</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-600 font-medium">On track</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Quick Actions Component
const QuickActions = () => {
  return (
    <Card className="enhanced-card border-2 border-red-200 bg-gradient-to-r from-red-50/30 to-white mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <Zap className="w-6 h-6" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4">
          <Button className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-start p-4 h-auto">
            <Plus className="w-5 h-5" />
            <div className="text-left">
              <p className="font-semibold">New Assessment</p>
              <p className="text-xs opacity-90">Start patient evaluation</p>
            </div>
          </Button>
          
          <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-start p-4 h-auto">
            <Calendar className="w-5 h-5" />
            <div className="text-left">
              <p className="font-semibold">Schedule Follow-up</p>
              <p className="text-xs opacity-70">Book appointments</p>
            </div>
          </Button>
          
          <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50 transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-start p-4 h-auto">
            <BarChart3 className="w-5 h-5" />
            <div className="text-left">
              <p className="font-semibold">Generate Report</p>
              <p className="text-xs opacity-70">Clinical summary</p>
            </div>
          </Button>
          
          <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-start p-4 h-auto">
            <BookOpen className="w-5 h-5" />
            <div className="text-left">
              <p className="font-semibold">Clinical Guidelines</p>
              <p className="text-xs opacity-70">Reference materials</p>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Patient List Component
const PatientListSection = ({ 
  patients, 
  onPatientSelect 
}: { 
  patients: Patient[]; 
  onPatientSelect: (patient: Patient) => void; 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState<string>("all");

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRisk === "all" || patient.riskLevel === filterRisk;
    return matchesSearch && matchesFilter;
  });

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 border-red-300">High Risk</Badge>;
      case 'moderate':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Moderate Risk</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Low Risk</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Active</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-300">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="enhanced-card border-2 border-red-200 bg-gradient-to-r from-red-50/30 to-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Users className="w-6 h-6" />
            Patient Management ({filteredPatients.length})
          </CardTitle>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-red-200 focus:border-red-400 w-64"
              />
            </div>
            <select 
              value={filterRisk} 
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-3 py-2 border border-red-200 rounded-md focus:border-red-400 focus:outline-none"
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk</option>
              <option value="moderate">Moderate Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredPatients.map((patient, index) => (
            <Card 
              key={patient.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02] border-l-4 ${
                patient.riskLevel === 'high' 
                  ? 'border-l-red-500 bg-gradient-to-r from-red-50/50 to-white' 
                  : patient.riskLevel === 'moderate'
                  ? 'border-l-yellow-500 bg-gradient-to-r from-yellow-50/50 to-white'
                  : 'border-l-green-500 bg-gradient-to-r from-green-50/50 to-white'
              }`}
              onClick={() => onPatientSelect(patient)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-red-100 rounded-full">
                      <Baby className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-800">{patient.userName}</h3>
                      <p className="text-sm text-muted-foreground">{patient.userEmail}</p>
                      <p className="text-xs text-muted-foreground">MRN: {patient.medicalRecordNumber || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold">{patient.totalAssessments || 0} Assessments</p>
                      <p className="text-xs text-muted-foreground">
                        Last: {patient.lastAssessment ? new Date(patient.lastAssessment).toLocaleDateString() : 'Never'}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {getRiskBadge(patient.riskLevel || 'pending')}
                      {getStatusBadge(patient.status || 'pending')}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
                
                {patient.riskLevel === 'high' && (
                  <div className="mt-3 p-2 bg-red-100 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-700 font-medium">High Risk - Immediate Attention Required</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {filteredPatients.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No patients found matching your criteria</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Recent Activity Component
const RecentActivitySection = ({ activities }: { activities: RecentActivity[] }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assessment':
        return <Brain className="w-4 h-4 text-blue-600" />;
      case 'follow-up':
        return <Calendar className="w-4 h-4 text-green-600" />;
      case 'consultation':
        return <MessageSquare className="w-4 h-4 text-purple-600" />;
      case 'report':
        return <FileText className="w-4 h-4 text-orange-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 border-red-300 text-xs">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="enhanced-card border-2 border-red-200 bg-gradient-to-r from-red-50/30 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <Activity className="w-6 h-6" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg border border-red-100 hover:bg-red-50/30 transition-colors duration-200">
              <div className="p-2 bg-white rounded-full border border-red-200">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-red-800">{activity.action}</p>
                <p className="text-sm text-muted-foreground">Patient: {activity.patientName}</p>
                <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                {getPriorityBadge(activity.priority)}
                <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                  <Eye className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Clinical Performance Component
const ClinicalPerformanceSection = () => {
  const performanceMetrics = [
    { label: "Assessment Accuracy", value: 94, color: "green" },
    { label: "Patient Satisfaction", value: 98, color: "blue" },
    { label: "Follow-up Compliance", value: 87, color: "orange" },
    { label: "Report Timeliness", value: 92, color: "purple" }
  ];

  return (
    <Card className="enhanced-card border-2 border-red-200 bg-gradient-to-r from-red-50/30 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <BarChart3 className="w-6 h-6" />
          Clinical Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-red-700">{metric.label}</span>
                <span className="text-sm font-bold text-red-800">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="w-full" />
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">Excellent Performance</span>
          </div>
          <p className="text-sm text-green-700 mt-1">Your clinical metrics are above average. Keep up the great work!</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Clinician Dashboard
export default function ClinicianDashboardPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [stats, setStats] = useState<ClinicalStats>({
    totalPatients: 0,
    activeAssessments: 0,
    highRiskPatients: 0,
    completedToday: 0,
    averageRiskScore: 0,
    monthlyGrowth: 0
  });
  const [loading, setLoading] = useState(true);
  const [clinicianName, setClinicianName] = useState("Dr. Sarah Johnson");
  const [clinicianEmail, setClinicianEmail] = useState("dr.sarah@earlysteps.ai");
  const { toast } = useToast();

  // Simulate data fetching
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data
      const mockPatients: Patient[] = [
        {
          id: "pat_001",
          userName: "Baby Johnson",
          userEmail: "parent1@example.com",
          medicalRecordNumber: "MRN-001234",
          riskLevel: "high",
          status: "active",
          totalAssessments: 3,
          latestScore: 85,
          lastAssessment: new Date('2024-01-15')
        },
        {
          id: "pat_002", 
          userName: "Baby Smith",
          userEmail: "parent2@example.com",
          medicalRecordNumber: "MRN-001235",
          riskLevel: "moderate",
          status: "pending",
          totalAssessments: 1,
          latestScore: 45,
          lastAssessment: new Date('2024-01-10')
        },
        {
          id: "pat_003",
          userName: "Baby Williams",
          userEmail: "parent3@example.com", 
          medicalRecordNumber: "MRN-001236",
          riskLevel: "low",
          status: "completed",
          totalAssessments: 2,
          latestScore: 25,
          lastAssessment: new Date('2024-01-12')
        },
        {
          id: "pat_004",
          userName: "Baby Davis",
          userEmail: "parent4@example.com",
          medicalRecordNumber: "MRN-001237", 
          riskLevel: "high",
          status: "active",
          totalAssessments: 4,
          latestScore: 78,
          lastAssessment: new Date('2024-01-14')
        },
        {
          id: "pat_005",
          userName: "Baby Brown",
          userEmail: "parent5@example.com",
          medicalRecordNumber: "MRN-001238",
          riskLevel: "moderate", 
          status: "active",
          totalAssessments: 2,
          latestScore: 52,
          lastAssessment: new Date('2024-01-13')
        }
      ];

      const mockActivities: RecentActivity[] = [
        {
          id: "act_001",
          type: "assessment",
          patientName: "Baby Johnson",
          action: "Completed neuromotor assessment", 
          timestamp: new Date('2024-01-15T10:30:00'),
          priority: "high"
        },
        {
          id: "act_002",
          type: "follow-up",
          patientName: "Baby Smith",
          action: "Scheduled follow-up appointment",
          timestamp: new Date('2024-01-15T09:15:00'),
          priority: "medium"
        },
        {
          id: "act_003", 
          type: "report",
          patientName: "Baby Williams",
          action: "Generated clinical report",
          timestamp: new Date('2024-01-14T16:45:00'),
          priority: "low"
        },
        {
          id: "act_004",
          type: "consultation",
          patientName: "Baby Davis", 
          action: "Consultation with specialist",
          timestamp: new Date('2024-01-14T14:20:00'),
          priority: "high"
        }
      ];

      const mockStats: ClinicalStats = {
        totalPatients: mockPatients.length,
        activeAssessments: mockPatients.filter(p => p.status === 'active').length,
        highRiskPatients: mockPatients.filter(p => p.riskLevel === 'high').length,
        completedToday: 3,
        averageRiskScore: 57,
        monthlyGrowth: 12
      };

      setPatients(mockPatients);
      setActivities(mockActivities);
      setStats(mockStats);
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const handlePatientSelect = (patient: Patient) => {
    toast({
      title: "Patient Selected",
      description: `Viewing details for ${patient.userName}`,
    });
    // Navigate to patient detail page or assessment page
    console.log("Selected patient:", patient);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex items-center justify-center">
            <div className="text-center">
              <Stethoscope className="w-16 h-16 mx-auto mb-4 text-red-500 animate-pulse" />
              <h2 className="text-2xl font-bold text-red-800 mb-2">
                Loading Clinical Dashboard
              </h2>
              <p className="text-muted-foreground">
                Fetching patient data and clinical metrics...
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-red-800 mb-2 flex items-center gap-3">
                  <Stethoscope className="w-8 h-8 text-red-600" />
                  Clinical Dashboard
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  Welcome back, {clinicianName}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Hospital className="w-4 h-4" />
                    EarlySteps AI Clinical Platform
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                  <Badge className="ml-2 bg-red-500 text-white">3</Badge>
                </Button>
              </div>
            </div>
          </div>

          {/* Clinical Statistics */}
          <ClinicalStatsOverview stats={stats} />

          {/* Quick Actions */}
          <QuickActions />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Patient List */}
            <div className="lg:col-span-2">
              <PatientListSection 
                patients={patients} 
                onPatientSelect={handlePatientSelect} 
              />
            </div>

            {/* Right Column - Activity & Performance */}
            <div className="space-y-8">
              <RecentActivitySection activities={activities} />
              <ClinicalPerformanceSection />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
