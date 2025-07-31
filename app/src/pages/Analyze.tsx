import { useState, useEffect, useRef } from "react";
import {
  Upload,
  Play,
  Download,
  Brain,
  Zap,
  Network,
  Eye,
  FileText,
  Printer,
  Shield,
  Cpu,
  Target,
  CheckCircle,
  Sparkles,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// API Simulation Functions
const simulateUploadAPI = async (
  file: File,
  onProgress: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => resolve("video_id_12345"), 500);
      }
      onProgress(progress);
    }, 200);
  });
};

const simulatePredictionAPI = async (
  videoId: string,
  onProgress: (progress: number, stage: string) => void
) => {
  const stages = [
    { progress: 15, stage: "Initializing neural networks..." },
    { progress: 30, stage: "Extracting video frames..." },
    { progress: 45, stage: "Analyzing movement patterns..." },
    { progress: 60, stage: "Processing skeletal keypoints..." },
    { progress: 75, stage: "Computing graph convolutions..." },
    { progress: 85, stage: "Integrating multimodal features..." },
    { progress: 95, stage: "Generating final predictions..." },
    { progress: 100, stage: "Analysis complete!" },
  ];

  return new Promise((resolve) => {
    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        onProgress(stages[currentStage].progress, stages[currentStage].stage);
        currentStage++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          resolve({
            hinesFactor: Math.random() * 100,
            gmaScore: Math.random() * 20,
            riskFactor: Math.random() * 100,
            combinedScore: Math.random() * 100,
          });
        }, 500);
      }
    }, 800);
  });
};

// Marketing Section Component
const TechnologyShowcase = () => (
  <div className="w-full max-w-6xl mx-auto mb-12">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-brand-dark dark:text-white mb-4 flex items-center justify-center gap-3">
        <Sparkles className="w-8 h-8 text-brand-accent animate-pulse" />
        Cutting-Edge AI Technology
        <Sparkles className="w-8 h-8 text-brand-accent animate-pulse" />
      </h2>
      <p className="text-lg text-muted-foreground dark:text-gray-300">
        Our state-of-the-art multimodal diagnostic system powered by advanced
        machine learning
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <Card className="enhanced-card hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-brand-teal/50 dark:hover:border-brand-teal">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-blue dark:text-brand-blue">
            <Activity className="w-6 h-6" />
            OpenPose Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground dark:text-gray-300">
            Advanced pose estimation technology extracts precise skeletal
            keypoints from video footage for accurate movement analysis.
          </p>
        </CardContent>
      </Card>

      <Card className="enhanced-card hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-brand-blue/50 dark:hover:border-brand-blue">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-teal dark:text-brand-teal">
            <Shield className="w-6 h-6" />
            Secure & Private
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground dark:text-gray-300">
            End-to-end encryption ensures your video data remains completely
            private and secure throughout the analysis process.
          </p>
        </CardContent>
      </Card>

      <Card className="enhanced-card hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-brand-accent/50 dark:hover:border-brand-accent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-accent dark:text-brand-accent">
            <Cpu className="w-6 h-6" />
            Graph Neural Networks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground dark:text-gray-300">
            Revolutionary Graph Convolutional Networks analyze complex movement
            patterns to predict neuromotor outcomes with unprecedented accuracy.
          </p>
        </CardContent>
      </Card>
    </div>

    <div className="bg-gradient-to-r from-brand-light to-brand-light/50 dark:from-muted/20 dark:to-muted/10 p-6 rounded-lg border border-brand-blue/20 dark:border-brand-blue/30">
      <h3 className="text-xl font-semibold text-brand-dark dark:text-white mb-4 flex items-center gap-2">
        <Target className="w-6 h-6 text-brand-teal dark:text-brand-teal" />
        What We Analyze
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-foreground dark:text-gray-200">
            Movement fluency and coordination
          </span>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-foreground dark:text-gray-200">
            Temporal movement patterns
          </span>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-foreground dark:text-gray-200">
            Skeletal joint relationships
          </span>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-foreground dark:text-gray-200">
            Neuromotor development indicators
          </span>
        </div>
      </div>
    </div>
  </div>
);

const VideoUpload = ({
  onUpload,
  isUploading,
}: {
  onUpload: (file: File) => void;
  isUploading: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files[0] && files[0].type.startsWith("video/")) {
      onUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onUpload(files[0]);
    }
  };

  const handleContainerClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mb-16">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-brand-dark">
          <Upload className="w-6 h-6" />
          Upload Video for Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
            dragActive
              ? "border-brand-teal bg-brand-teal/5"
              : "border-border hover:border-brand-teal hover:bg-brand-teal/5"
          } ${
            isUploading
              ? "opacity-50 pointer-events-none"
              : "hover:scale-[1.02]"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onClick={handleContainerClick}
        >
          <Play className="w-16 h-16 mx-auto mb-4 text-brand-blue" />
          <h3 className="text-lg font-semibold text-brand-dark mb-2">
            Drop your video here or click anywhere to browse
          </h3>
          <p className="text-muted-foreground mb-6">
            Supports MP4, AVI, MOV files (max 100MB)
          </p>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            disabled={isUploading}
            className="bg-brand-accent hover:bg-brand-accent/90 text-brand-dark transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {isUploading ? "Uploading..." : "Select Video"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};

const UploadProgress = ({ progress }: { progress: number }) => (
  <Card className="w-full max-w-2xl mx-auto">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-brand-dark">
        <Upload className="w-6 h-6 animate-bounce" />
        Uploading to Cloud
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <Progress value={progress} className="w-full" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Uploading...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-brand-blue">
          <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></div>
          Secure upload in progress
        </div>
      </div>
    </CardContent>
  </Card>
);

const PredictionProgress = ({
  progress,
  stage,
}: {
  progress: number;
  stage: string;
}) => (
  <Card className="w-full max-w-2xl mx-auto">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-brand-dark">
        <Brain className="w-6 h-6 animate-pulse" />
        AI Analysis in Progress
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <Progress value={progress} className="w-full" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Processing...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-brand-teal">
          <Zap className="w-4 h-4 animate-pulse" />
          {stage}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Network className="w-4 h-4" />
            GPU Clusters Active
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Eye className="w-4 h-4" />
            Computer Vision
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Brain className="w-4 h-4" />
            Deep Learning
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ResultsDisplay = ({ results }: { results }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    const currentDate = new Date();
    const userName = "Dr. Sarah Johnson"; // Simulated user name
    const userEmail = "sarah.johnson@hospital.com"; // Simulated email

    if (printContent) {
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
                <p><strong>Healthcare Provider:</strong> ${userName}</p>
                <p><strong>Email:</strong> ${userEmail}</p>
                <p><strong>Generated:</strong> ${currentDate.toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )} at ${currentDate.toLocaleTimeString("en-US")}</p>
                <p><strong>Report ID:</strong> ES-${Date.now()
                  .toString()
                  .slice(-8)}</p>
              </div>

              <div class="score-grid">
                <div class="score-card">
                  <h3 style="color: #2D6B8A; margin-top: 0;">Hines Factor</h3>
                  <div class="score-value">${results.hinesFactor.toFixed(
                    1
                  )}</div>
                  <p style="margin-bottom: 0; color: #6c757d;">Measures neuromotor development patterns</p>
                </div>

                <div class="score-card">
                  <h3 style="color: #66C3B5; margin-top: 0;">GMA Score</h3>
                  <div class="score-value">${results.gmaScore.toFixed(
                    1
                  )}/20</div>
                  <p style="margin-bottom: 0; color: #6c757d;">General Movement Assessment score</p>
                </div>

                <div class="score-card">
                  <h3 style="color: #F2A900; margin-top: 0;">Risk Factor</h3>
                  <div class="score-value">${results.riskFactor.toFixed(
                    1
                  )}%</div>
                  <p style="margin-bottom: 0; color: #6c757d;">Cerebral Palsy risk assessment</p>
                </div>

                <div class="score-card final-score">
                  <h3 style="color: #2D6B8A; margin-top: 0;">🎯 Combined ML Score</h3>
                  <div class="score-value">${results.combinedScore.toFixed(
                    1
                  )}%</div>
                  <p style="font-weight: bold; font-size: 1.2em; margin-bottom: 5px;">${
                    results.combinedScore < 30
                      ? "Low Risk"
                      : results.combinedScore < 70
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
    }
  };

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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div ref={printRef} className="space-y-6">
        <div className="header text-center">
          <h1 className="text-3xl font-bold text-brand-dark mb-2">
            EarlySteps Analysis Results
          </h1>
          <p className="text-muted-foreground">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-brand-blue/50">
            <CardHeader>
              <CardTitle className="text-brand-blue">Hines Factor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="score-value text-4xl font-bold text-brand-blue mb-2">
                {results.hinesFactor.toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground">
                Measures neuromotor development patterns
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-brand-teal/50">
            <CardHeader>
              <CardTitle className="text-brand-teal">GMA Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="score-value text-4xl font-bold text-brand-teal mb-2">
                {results.gmaScore.toFixed(1)}/20
              </div>
              <p className="text-sm text-muted-foreground">
                General Movement Assessment score
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-brand-accent/50">
            <CardHeader>
              <CardTitle className="text-brand-accent">Risk Factor</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`score-value text-4xl font-bold mb-2 ${getScoreColor(
                  results.riskFactor
                )}`}
              >
                {results.riskFactor.toFixed(1)}%
              </div>
              <p className="text-sm text-muted-foreground">
                Cerebral Palsy risk assessment
              </p>
            </CardContent>
          </Card>

          {/* Enhanced Final Score with Animated Border */}
          <Card className="relative bg-gradient-to-br from-brand-light via-white to-brand-light/50 border-4 animate-border-dance overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-accent/5 animate-pulse"></div>

            {/* Content */}
            <div className="relative z-10">
              <CardHeader>
                <CardTitle className="text-brand-dark flex items-center gap-2 text-xl">
                  <div className="w-6 h-6 bg-gradient-to-r from-brand-blue to-brand-teal rounded-full animate-pulse"></div>
                  🎯 Combined ML Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`score-value text-5xl font-bold mb-2 ${getScoreColor(
                    results.combinedScore
                  )} drop-shadow-lg`}
                >
                  {results.combinedScore.toFixed(1)}%
                </div>
                <p
                  className={`text-xl font-bold ${getScoreColor(
                    results.combinedScore
                  )} mb-2`}
                >
                  {getScoreLabel(results.combinedScore)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Multimodal AI prediction confidence
                </p>

                {/* Confidence indicator */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="h-2 bg-gradient-to-r from-brand-blue to-brand-teal rounded-full transition-all duration-1000"
                      style={{ width: `${results.combinedScore}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Confidence
                  </span>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>• Continue regular monitoring with healthcare provider</p>
              <p>• Early intervention programs may be beneficial</p>
              <p>• Follow-up assessment recommended in 3 months</p>
              <p>• Consult with pediatric neurologist if concerns persist</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 justify-center">
        <Button
          onClick={handlePrint}
          className="bg-brand-blue hover:bg-brand-blue/90 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Results
        </Button>
        <Button
          variant="outline"
          className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button
          variant="outline"
          className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <FileText className="w-4 h-4 mr-2" />
          Save Report
        </Button>
      </div>
    </div>
  );
};

export default function AnalyzePage() {
  const [step, setStep] = useState<
    "upload" | "uploading" | "uploaded" | "predicting" | "results"
  >("upload");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [predictionProgress, setPredictionProgress] = useState(0);
  const [predictionStage, setPredictionStage] = useState("");
  const [results, setResults] = useState(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setSelectedFile(file);
    setStep("uploading");
    setUploadProgress(0);

    try {
      const videoId = await simulateUploadAPI(file, setUploadProgress);
      toast({
        title: "Upload Complete",
        description:
          "Your video has been successfully uploaded to our secure cloud.",
      });
      setStep("uploaded");
    } catch (error) {
      toast({
        title: "Upload Failed",
        description:
          "Please try again or contact support if the problem persists.",
        variant: "destructive",
      });
      setStep("upload");
    }
  };

  const handlePrediction = async () => {
    setStep("predicting");
    setPredictionProgress(0);
    setPredictionStage("Initializing...");

    try {
      const predictionResults = await simulatePredictionAPI(
        "video_id_12345",
        (progress, stage) => {
          setPredictionProgress(progress);
          setPredictionStage(stage);
        }
      );
      setResults(predictionResults);
      setStep("results");
      toast({
        title: "Analysis Complete",
        description:
          "Your video has been successfully analyzed by our AI system.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description:
          "Please try again or contact support if the problem persists.",
        variant: "destructive",
      });
      setStep("uploaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-brand-dark mb-4">
              Video Analysis Platform
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload your video for AI-powered neuromotor development analysis
            </p>
          </div>

          {step === "upload" && (
            <>
              <VideoUpload onUpload={handleFileUpload} isUploading={false} />
              <TechnologyShowcase />
            </>
          )}

          {step === "uploading" && <UploadProgress progress={uploadProgress} />}

          {step === "uploaded" && (
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-brand-dark">
                  <FileText className="w-6 h-6" />
                  Ready for Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="p-4 bg-brand-light rounded-lg">
                    <p className="font-semibold text-brand-dark">
                      {selectedFile?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Size:{" "}
                      {((selectedFile?.size || 0) / (1024 * 1024)).toFixed(2)}{" "}
                      MB
                    </p>
                  </div>
                  <Button
                    onClick={handlePrediction}
                    className="bg-brand-teal hover:bg-brand-teal/90 text-white px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Start AI Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === "predicting" && (
            <PredictionProgress
              progress={predictionProgress}
              stage={predictionStage}
            />
          )}

          {step === "results" && results && (
            <ResultsDisplay results={results} />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
