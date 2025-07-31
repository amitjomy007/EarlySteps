import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { db } from "@/firebase/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import {
  User,
  Mail,
  Calendar,
  Trash2,
  Printer,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Types
interface Result {
  id: string;
  userEmail: string;
  userName: string;
  hinesFactor: number;
  gmaScore: number;
  riskFactor: number;
  combinedScore: number;
  date: Timestamp;
  "HealthCare Provider": string;
}

// Educational Content Component
const EducationalContent = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    <Card className="enhanced-card hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-brand-blue/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-brand-blue">
          <Brain className="w-6 h-6" />
          Understanding Cerebral Palsy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground dark:text-gray-300 text-sm">
          Cerebral palsy affects about 1 in 345 children in the United States.
          Early detection and intervention can significantly improve outcomes
          and quality of life.
        </p>
      </CardContent>
    </Card>

    <Card className="enhanced-card hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-brand-teal/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-brand-teal">
          <Activity className="w-6 h-6" />
          Early Intervention Benefits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground dark:text-gray-300 text-sm">
          Studies show that early intervention programs can improve motor
          skills, cognitive development, and social interaction in children with
          neuromotor challenges.
        </p>
      </CardContent>
    </Card>

    <Card className="enhanced-card hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-brand-accent/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-brand-accent">
          <TrendingUp className="w-6 h-6" />
          AI in Healthcare
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground dark:text-gray-300 text-sm">
          AI-powered diagnostic tools can detect patterns invisible to the human
          eye, achieving up to 95% accuracy in predicting neuromotor development
          outcomes.
        </p>
      </CardContent>
    </Card>
  </div>
);

// Stats Overview Component
const StatsOverview = ({ results }: { results: Result[] }) => {
  const averageScore =
    results.length > 0
      ? results.reduce((sum, result) => sum + result.combinedScore, 0) /
        results.length
      : 0;

  const recentResults = results.filter((result) => {
    const resultDate = result.date.toDate(); // Convert Timestamp to Date first
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return resultDate >= thirtyDaysAgo;
  });

  const highRiskCount = results.filter(
    (result) => result.combinedScore >= 70
  ).length;

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <Card className="enhanced-card border-2 border-brand-blue/30 bg-gradient-to-br from-brand-light to-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-blue/10 rounded-full">
              <FileText className="w-6 h-6 text-brand-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-dark">
                {results.length}
              </p>
              <p className="text-sm text-muted-foreground">Total Analyses</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="enhanced-card border-2 border-brand-teal/30 bg-gradient-to-br from-brand-teal/5 to-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-teal/10 rounded-full">
              <BarChart3 className="w-6 h-6 text-brand-teal" />
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-dark">
                {averageScore.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="enhanced-card border-2 border-brand-accent/30 bg-gradient-to-br from-brand-accent/5 to-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-accent/10 rounded-full">
              <Clock className="w-6 h-6 text-brand-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-dark">
                {recentResults.length}
              </p>
              <p className="text-sm text-muted-foreground">Recent (30 days)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="enhanced-card border-2 border-red-300 bg-gradient-to-br from-red-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-dark">
                {highRiskCount}
              </p>
              <p className="text-sm text-muted-foreground">High Risk Results</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Result Card Component
// Result Card Component - Wide Card Design
const ResultCard = ({
  result,
  onDelete,
  onPrint,
  index,
}: {
  result: Result;
  onDelete: (id: string) => void;
  onPrint: (result: Result) => void;
  index: number;
}) => {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getScoreColor = (score: number) => {
    if (score < 30) return "text-green-600";
    if (score < 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score < 30) return "Low Risk";
    if (score < 70) return "Moderate Risk";
    return "High Risk";
  };

  const getRiskIcon = (score: number) => {
    if (score < 30) return <CheckCircle className="w-6 h-6 text-green-600" />;
    if (score < 70) return <Info className="w-6 h-6 text-yellow-600" />;
    return <AlertCircle className="w-6 h-6 text-red-600" />;
  };

  const formatDate = (date) => {
    const dateObj = date?.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRecommendations = (
    combinedScore: number,
    hinesFactor: number,
    gmaScore: number,
    riskFactor: number
  ) => {
    const recommendations = [];

    if (combinedScore >= 70) {
      recommendations.push(
        "Immediate consultation with pediatric neurologist recommended"
      );
      recommendations.push("Consider comprehensive neurological evaluation");
      recommendations.push(
        "Early intensive intervention program strongly advised"
      );
    } else if (combinedScore >= 30) {
      recommendations.push(
        "Regular monitoring with healthcare provider advised"
      );
      recommendations.push("Consider early intervention screening");
      recommendations.push("Follow-up assessment in 2-3 months");
    } else {
      recommendations.push("Continue routine developmental monitoring");
      recommendations.push("Maintain regular pediatric checkups");
      recommendations.push("Follow-up assessment in 6 months");
    }

    if (gmaScore < 10) {
      recommendations.push("Focus on gross motor skill development activities");
    }

    if (hinesFactor > 60) {
      recommendations.push("Occupational therapy evaluation may be beneficial");
    }

    return recommendations;
  };

  // Alternating background colors
  const cardBg =
    index % 2 === 0
      ? "bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/20 dark:to-teal-950/20"
      : "bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950/20 dark:to-blue-950/20";

  // High risk styling
  const isHighRisk = result.combinedScore >= 70;
  const highRiskStyling = isHighRisk
    ? "border-red-300 shadow-red-100 dark:shadow-red-900/20 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30"
    : cardBg;

  return (
    <Card
      className={`enhanced-card hover:shadow-lg transition-all duration-300 hover:scale-[1.01] border-2 hover:border-brand-blue/50 w-full ${highRiskStyling}`}
    >
      {isHighRisk && (
        <div className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-t-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          HIGH RISK - Requires Immediate Attention
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-3 text-brand-dark text-xl mb-2">
              {getRiskIcon(result.combinedScore)}
              Analysis Report #{result.id.slice(-6).toUpperCase()}
            </CardTitle>
            <p className="text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(result.date)}
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onPrint(result)}
              className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print Report
            </Button>

            {!showDeleteConfirm ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowDeleteConfirm(true)}
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    onDelete(result.id);
                    setShowDeleteConfirm(false);
                  }}
                  className="text-xs"
                >
                  Confirm Delete
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="text-center p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-brand-blue/20">
            <p className="text-sm text-muted-foreground mb-1">Hines Factor</p>
            <p className="text-2xl font-bold text-brand-blue">
              {result.hinesFactor.toFixed(1)}
            </p>
          </div>

          <div className="text-center p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-brand-teal/20">
            <p className="text-sm text-muted-foreground mb-1">GMA Score</p>
            <p className="text-2xl font-bold text-brand-teal">
              {result.gmaScore.toFixed(1)}/20
            </p>
          </div>

          <div className="text-center p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-brand-accent/20">
            <p className="text-sm text-muted-foreground mb-1">Risk Factor</p>
            <p
              className={`text-2xl font-bold ${getScoreColor(
                result.riskFactor
              )}`}
            >
              {result.riskFactor.toFixed(1)}%
            </p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-600">
            <p className="text-sm text-muted-foreground mb-1">
              Combined ML Score
            </p>
            <p
              className={`text-3xl font-bold ${getScoreColor(
                result.combinedScore
              )}`}
            >
              {result.combinedScore.toFixed(1)}%
            </p>
            <p
              className={`text-sm font-semibold ${getScoreColor(
                result.combinedScore
              )}`}
            >
              {getScoreLabel(result.combinedScore)}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShowRecommendations(!showRecommendations)}
            className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            {showRecommendations ? "Hide" : "Show"} Clinical Recommendations
          </Button>
        </div>

        {showRecommendations && (
          <div className="mt-4 p-4 bg-gradient-to-r from-brand-accent/5 to-brand-accent/10 rounded-lg border border-brand-accent/20">
            <h4 className="font-semibold text-brand-dark mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-accent" />
              Clinical Recommendations
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {getRecommendations(
                result.combinedScore,
                result.hinesFactor,
                result.gmaScore,
                result.riskFactor
              ).map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-brand-accent mt-1">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component
export default function DashboardPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [displayCount, setDisplayCount] = useState(5);
  const [showAllResults, setShowAllResults] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Get user info from cookies
    const email = Cookies.get("token");
    const name = Cookies.get("userName");

    if (email) {
      setUserEmail(email);
      setUserName(name || "User");

      // Set up real-time listener for user's results
      const q = query(
        collection(db, "results"),
        where("userEmail", "==", email),
        orderBy("date", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userResults: Result[] = [];
        querySnapshot.forEach((doc) => {
          userResults.push({ id: doc.id, ...doc.data() } as Result);
        });
        setResults(userResults);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
      toast({
        title: "Authentication Required",
        description: "Please log in to view your dashboard.",
        variant: "destructive",
      });
    }
  }, [toast]);
  const loadMoreResults = () => {
    setDisplayCount((prev) => prev + 5);
    if (displayCount + 5 >= results.length) {
      setShowAllResults(true);
    }
  };

  const handleDelete = async (resultId: string) => {
    try {
      await deleteDoc(doc(db, "results", resultId));
      toast({
        title: "Result Deleted",
        description: "The analysis result has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast({
        title: "Delete Failed",
        description: "Unable to delete the result. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePrint = (result: Result) => {
    const currentDate = new Date();

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>EarlySteps Analysis Results</title>
            <style>
              @page { margin: 30px; }
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                padding: 20px; 
                color: #2c3e50;
                line-height: 1.6;
              }
              .header { 
                text-align: center; 
                margin-bottom: 40px; 
                border-bottom: 3px solid #2D6B8A; 
                padding-bottom: 20px;
              }
              .logo { 
                font-size: 2.5em; 
                font-weight: bold; 
                color: #2D6B8A; 
                margin-bottom: 10px; 
              }
              .user-info {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 30px;
                border-left: 4px solid #66C3B5;
              }
              .score-grid { 
                display: grid; 
                grid-template-columns: repeat(2, 1fr); 
                gap: 25px; 
                margin: 30px 0; 
              }
              .score-card { 
                border: 2px solid #e9ecef; 
                padding: 20px; 
                border-radius: 12px; 
                background: #ffffff;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              .score-value { 
                font-size: 2.5em; 
                font-weight: bold; 
                color: #2D6B8A; 
                margin-bottom: 5px;
              }
              .final-score { 
                background: linear-gradient(135deg, #f0f9ff, #e0f2fe); 
                border: 3px solid #2D6B8A; 
                box-shadow: 0 4px 20px rgba(45, 107, 138, 0.2);
              }
              .final-score .score-value {
                font-size: 3em;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
              }
              .recommendations {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin-top: 30px;
                border-left: 4px solid #F2A900;
              }
              .footer {
                margin-top: 40px;
                text-align: center;
                font-size: 0.9em;
                color: #6c757d;
                border-top: 1px solid #dee2e6;
                padding-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">EarlySteps</div>
              <h2 style="margin: 0; color: #495057;">AI-Powered Neuromotor Analysis Report</h2>
            </div>
            
            <div class="user-info">
              <h3 style="margin-top: 0; color: #2D6B8A;">Report Details</h3>
              <p><strong>Healthcare Provider:</strong> ${
                result["HealthCare Provider"]
              }</p>
              <p><strong>UserName:</strong> ${result.userName}</p>
              <p><strong>Email:</strong> ${result.userEmail}</p>
<p><strong>Analysis Date:</strong> ${result.date
        .toDate()
        .toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</p>

              <p><strong>Generated:</strong> ${currentDate.toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )} at ${currentDate.toLocaleTimeString("en-US")}</p>
              <p><strong>Report ID:</strong> ES-${result.id}</p>
            </div>

            <div class="score-grid">
              <div class="score-card">
                <h3 style="color: #2D6B8A; margin-top: 0;">Hines Factor</h3>
                <div class="score-value">${result.hinesFactor.toFixed(1)}</div>
                <p style="margin-bottom: 0; color: #6c757d;">Measures neuromotor development patterns</p>
              </div>

              <div class="score-card">
                <h3 style="color: #66C3B5; margin-top: 0;">GMA Score</h3>
                <div class="score-value">${result.gmaScore.toFixed(1)}/20</div>
                <p style="margin-bottom: 0; color: #6c757d;">General Movement Assessment score</p>
              </div>

              <div class="score-card">
                <h3 style="color: #F2A900; margin-top: 0;">Risk Factor</h3>
                <div class="score-value">${result.riskFactor.toFixed(1)}%</div>
                <p style="margin-bottom: 0; color: #6c757d;">Cerebral Palsy risk assessment</p>
              </div>

              <div class="score-card final-score">
                <h3 style="color: #2D6B8A; margin-top: 0;">🎯 Combined ML Score</h3>
                <div class="score-value">${result.combinedScore.toFixed(
                  1
                )}%</div>
                <p style="font-weight: bold; font-size: 1.2em; margin-bottom: 5px;">${
                  result.combinedScore < 30
                    ? "Low Risk"
                    : result.combinedScore < 70
                    ? "Moderate Risk"
                    : "High Risk"
                }</p>
                <p style="margin-bottom: 0; color: #6c757d;">Multimodal AI prediction confidence</p>
              </div>
            </div>

            <div class="recommendations">
              <h3 style="color: #2D6B8A; margin-top: 0;">Clinical Recommendations</h3>
              <ul style="margin-bottom: 0;">
                <li>Continue regular monitoring with healthcare provider</li>
                <li>Early intervention programs may be beneficial</li>
                <li>Follow-up assessment recommended in 3 months</li>
                <li>Consult with pediatric neurologist if concerns persist</li>
              </ul>
            </div>

            <div class="footer">
              <p><strong>EarlySteps AI Diagnostic Platform</strong> | Confidential Medical Report</p>
              <p>This report is generated using advanced AI algorithms and should be interpreted by qualified healthcare professionals.</p>
            </div>
          </body>
        </html>
      `);
      newWindow.document.close();
      newWindow.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex items-center justify-center">
            <div className="text-center">
              <Brain className="w-16 h-16 mx-auto mb-4 text-brand-blue animate-pulse" />
              <h2 className="text-2xl font-bold text-brand-dark mb-2">
                Loading Dashboard
              </h2>
              <p className="text-muted-foreground">
                Please wait while we fetch your data...
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
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-brand-dark mb-4 flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-brand-accent animate-pulse" />
              Medical Dashboard
              <Sparkles className="w-8 h-8 text-brand-accent animate-pulse" />
            </h1>
            <p className="text-xl text-muted-foreground">
              Your comprehensive neuromotor analysis history
            </p>
          </div>

          {/* User Info Card */}
          <Card className="enhanced-card mb-8 bg-gradient-to-r from-brand-light via-white to-brand-light/50 border-2 border-brand-blue/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-dark">
                <User className="w-6 h-6 text-brand-blue" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-blue/10 rounded-full">
                    <User className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold text-brand-dark">{userName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-teal/10 rounded-full">
                    <Mail className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold text-brand-dark">{userEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-accent/10 rounded-full">
                    <Shield className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Provider</p>
                    <p className="font-semibold text-brand-dark">
                      EarlySteps AI
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <StatsOverview results={results} />

          {results.length === 0 ? (
            <div className="text-center space-y-8">
              <Card className="enhanced-card bg-gradient-to-r from-brand-light to-white border-2 border-brand-blue/30 p-8">
                <CardContent>
                  <Brain className="w-24 h-24 mx-auto mb-6 text-brand-blue/50" />
                  <h2 className="text-2xl font-bold text-brand-dark mb-4">
                    No Analysis Results Yet
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Start your journey with AI-powered neuromotor analysis.
                    Upload your first video to begin comprehensive assessment.
                  </p>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 mx-auto"
                    onClick={() => (window.location.href = "/analyze")}
                  >
                    <Activity className="w-5 h-5" />
                    Analyze New Video
                  </Button>
                </CardContent>
              </Card>

              {/* Educational Content for Empty State */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-brand-dark mb-6 text-center">
                  Learn About Neuromotor Development
                </h2>
                <EducationalContent />
              </div>
            </div>
          ) : (
            <>
              {/* Results Grid */}
              {results.length > 0 && (
                <Card className="enhanced-card bg-gradient-to-r from-brand-light via-white to-brand-light/50 border-2 border-brand-blue/30 mb-8">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="flex items-center gap-3 text-brand-dark text-2xl">
                          <FileText className="w-7 h-7 text-brand-blue" />
                          Past Analysis Results
                        </CardTitle>
                        <p className="text-muted-foreground mt-2">
                          Comprehensive history of your neuromotor assessments (
                          {results.length} total results)
                        </p>
                      </div>
                      <Button
                        onClick={() => (window.location.href = "/analyze")}
                        className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
                      >
                        <Brain className="w-5 h-5" />
                        Analyze New Video
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {results.slice(0, displayCount).map((result, index) => (
                      <ResultCard
                        key={result.id}
                        result={result}
                        onDelete={handleDelete}
                        onPrint={handlePrint}
                        index={index}
                      />
                    ))}

                    {displayCount < results.length && (
                      <div className="text-center pt-6">
                        <Button
                          onClick={loadMoreResults}
                          variant="outline"
                          className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
                        >
                          <Activity className="w-4 h-4" />
                          Load More Results ({results.length -
                            displayCount}{" "}
                          remaining)
                        </Button>
                      </div>
                    )}

                    {showAllResults && results.length > 5 && (
                      <div className="text-center pt-4">
                        <p className="text-sm text-muted-foreground">
                          All {results.length} results are now displayed
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
