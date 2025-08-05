import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { db } from "@/firebase/firebase";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

import {
  User,
  Mail,
  Calendar,
  Save,
  Brain,
  Activity,
  Shield,
  Heart,
  Target,
  Clock,
  FileText,
  Sparkles,
  Info,
  AlertCircle,
  CheckCircle,
  Stethoscope,
  Hospital,
  Baby,
  Weight,
  Thermometer,
  Droplet,
  Zap,
  Eye,
  Pill,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
}

interface RiskFactorData {
  gestation: string;
  birthWeight: string;
  sga: string;
  intraUterineInsults: string;
  antenatalSteroids: string;
  resuscitationAtBirth: string;
  ventilation: string;
  daysOnVentilator: string;
  perfusion: string;
  shockTherapy: string;
  hypoglycemia: string;
  bloodSugars: string;
  daysOfHypoglycemia: string;
  neurosonogram: string;
  infection: string;
  nnj: string;
  hypothyroidism: string;
  others: string;
}

interface ClinicalAssessment {
  patientId: string;
  clinicianName: string;
  clinicianEmail: string;
  riskFactor: RiskFactorData;
  hinesScore: number;
  notes: string;
  assessmentDate: Date;
}

// Risk Factor Categories Component
const RiskFactorSection = ({
  riskData,
  setRiskData,
}: {
  riskData: RiskFactorData;
  setRiskData: (data: RiskFactorData) => void;
}) => {
  const updateRiskData = (field: keyof RiskFactorData, value: string) => {
    setRiskData({ ...riskData, [field]: value });
  };

  const riskOptions = {
    mild: "Mild Risk",
    moderate: "Moderate Risk",
    severe: "Severe Risk",
  };

  return (
    <Card className="enhanced-card border-2 border-red-200 bg-gradient-to-r from-red-50/30 to-white hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <AlertCircle className="w-6 h-6" />
          Risk Factor Assessment
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Based on neurodevelopmental outcome risk categories
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Gestation */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Calendar className="w-4 h-4" />
              Gestation
            </Label>
            <Select
              value={riskData.gestation}
              onValueChange={(value) => updateRiskData("gestation", value)}
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select gestation risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">33-34 weeks (Mild Risk)</SelectItem>
                <SelectItem value="moderate">
                  30-32 weeks (Moderate Risk)
                </SelectItem>
                <SelectItem value="severe">
                  &lt;30 weeks (Severe Risk)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Birth Weight */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Weight className="w-4 h-4" />
              Birth Weight
            </Label>
            <Select
              value={riskData.birthWeight}
              onValueChange={(value) => updateRiskData("birthWeight", value)}
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select birth weight category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">&gt;1500 gm (Mild Risk)</SelectItem>
                <SelectItem value="moderate">
                  1250-1499 gm (Moderate Risk)
                </SelectItem>
                <SelectItem value="severe">
                  &lt;1250 gm (Severe Risk)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* SGA */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Baby className="w-4 h-4" />
              SGA (Small for Gestational Age)
            </Label>
            <Select
              value={riskData.sga}
              onValueChange={(value) => updateRiskData("sga", value)}
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select SGA category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">No SGA (Mild Risk)</SelectItem>
                <SelectItem value="moderate">
                  Fetal growth 3rd-10th centile (Moderate Risk)
                </SelectItem>
                <SelectItem value="severe">
                  Fetal growth &lt;3rd centile (Severe Risk)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Intra-uterine Insults */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Heart className="w-4 h-4" />
              Intra-uterine Insults
            </Label>
            <Select
              value={riskData.intraUterineInsults}
              onValueChange={(value) =>
                updateRiskData("intraUterineInsults", value)
              }
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select complications" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">None (Mild Risk)</SelectItem>
                <SelectItem value="moderate">
                  Abnormal NST, BPP&lt;5, Maternal fever, pPROM, Dichorionic
                  twins (Moderate Risk)
                </SelectItem>
                <SelectItem value="severe">
                  Severe maternal pre-eclampsia, Monochorionic twins/triplets,
                  Clinical chorioamnionitis, Cord prolapse, Abruption placenta,
                  AEDF, reversal EDF (Severe Risk)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Antenatal Steroids */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Pill className="w-4 h-4" />
              Antenatal Steroids (ANS)
            </Label>
            <Select
              value={riskData.antenatalSteroids}
              onValueChange={(value) =>
                updateRiskData("antenatalSteroids", value)
              }
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select ANS status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">
                  Complete course (Mild Risk)
                </SelectItem>
                <SelectItem value="moderate">
                  Incomplete course or 24 hours not elapsed from last dose
                  (Moderate Risk)
                </SelectItem>
                <SelectItem value="severe">No ANS (Severe Risk)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Need for Resuscitation at Birth */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Zap className="w-4 h-4" />
              Need for Resuscitation at Birth
            </Label>
            <Select
              value={riskData.resuscitationAtBirth}
              onValueChange={(value) =>
                updateRiskData("resuscitationAtBirth", value)
              }
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select resuscitation level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">
                  No resuscitation needed (Mild Risk)
                </SelectItem>
                <SelectItem value="moderate">
                  Need for resuscitation (including PPV) (Moderate Risk)
                </SelectItem>
                <SelectItem value="severe">
                  Need for Extensive resuscitation (Chest compressions,
                  Epinephrine) (Severe Risk)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Need for Ventilation */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Monitor className="w-4 h-4" />
              Need for Ventilation
            </Label>
            <Select
              value={riskData.ventilation}
              onValueChange={(value) => updateRiskData("ventilation", value)}
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select ventilation status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">
                  No ventilation needed (Mild Risk)
                </SelectItem>
                <SelectItem value="moderate">
                  Ventilation with normal blood gases and no airleaks (Moderate
                  Risk)
                </SelectItem>
                <SelectItem value="severe">
                  Ventilation abnormal blood gases and air leaks (Severe Risk)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Days on Ventilator */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Clock className="w-4 h-4" />
              Days on Ventilator
            </Label>
            <Input
              type="number"
              placeholder="Enter number of days"
              value={riskData.daysOnVentilator}
              onChange={(e) =>
                updateRiskData("daysOnVentilator", e.target.value)
              }
              className="border-red-200 focus:border-red-400"
              min="0"
            />
          </div>

          {/* Perfusion */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Droplet className="w-4 h-4" />
              Perfusion
            </Label>
            <Select
              value={riskData.perfusion}
              onValueChange={(value) => updateRiskData("perfusion", value)}
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select perfusion status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">
                  Normal perfusion (Mild Risk)
                </SelectItem>
                <SelectItem value="moderate">
                  Shock (poor perfusion) with normal blood pressure (Moderate
                  Risk)
                </SelectItem>
                <SelectItem value="severe">
                  Shock (poor perfusion) with hypotension (Severe Risk)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Shock Therapy */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Thermometer className="w-4 h-4" />
              Shock Therapy
            </Label>
            <Select
              value={riskData.shockTherapy}
              onValueChange={(value) => updateRiskData("shockTherapy", value)}
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select therapy type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">Saline bolus (Mild Risk)</SelectItem>
                <SelectItem value="moderate">
                  Inotropes (Moderate Risk)
                </SelectItem>
                <SelectItem value="severe">Steroids (Severe Risk)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hypoglycemia */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Activity className="w-4 h-4" />
              Hypoglycemia
            </Label>
            <Select
              value={riskData.hypoglycemia}
              onValueChange={(value) => updateRiskData("hypoglycemia", value)}
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select hypoglycemia status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">
                  No hypoglycemia (Mild Risk)
                </SelectItem>
                <SelectItem value="moderate">
                  Hypoglycemia (asymptomatic) (Moderate Risk)
                </SelectItem>
                <SelectItem value="severe">
                  Symptomatic hypoglycemia (Severe Risk)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Blood Sugars */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Droplet className="w-4 h-4" />
              Blood Sugars (mg/dl)
            </Label>
            <Select
              value={riskData.bloodSugars}
              onValueChange={(value) => updateRiskData("bloodSugars", value)}
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select blood sugar range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">&gt;46 mg/dl (Mild Risk)</SelectItem>
                <SelectItem value="moderate">
                  32-46 mg/dl (Moderate Risk)
                </SelectItem>
                <SelectItem value="severe">
                  &lt;32 mg/dl (Severe Risk)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Days of Hypoglycemia */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Calendar className="w-4 h-4" />
              Days of Hypoglycemia
            </Label>
            <Select
              value={riskData.daysOfHypoglycemia}
              onValueChange={(value) =>
                updateRiskData("daysOfHypoglycemia", value)
              }
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">0 days (Mild Risk)</SelectItem>
                <SelectItem value="moderate">
                  1-4 days (Moderate Risk)
                </SelectItem>
                <SelectItem value="severe">≥ 5 days (Severe Risk)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Neurosonogram/MRI */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Brain className="w-4 h-4" />
              Neurosonogram/MRI
            </Label>
            <Select
              value={riskData.neurosonogram}
              onValueChange={(value) => updateRiskData("neurosonogram", value)}
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select imaging findings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">Normal (Mild Risk)</SelectItem>
                <SelectItem value="moderate">
                  IVH &lt; grade III (Moderate Risk)
                </SelectItem>
                <SelectItem value="severe">
                  Grade III IVH or IPE in NICU or ventriculomegaly, PVL at 36-40
                  wks (Severe Risk)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Infection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Shield className="w-4 h-4" />
              Infection
            </Label>
            <Select
              value={riskData.infection}
              onValueChange={(value) => updateRiskData("infection", value)}
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select infection status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">No infection (Mild Risk)</SelectItem>
                <SelectItem value="moderate">Sepsis (Moderate Risk)</SelectItem>
                <SelectItem value="severe">
                  Sepsis with hypotension/Meningitis (Severe Risk)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* NNJ */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Eye className="w-4 h-4" />
              NNJ (Neonatal Jaundice)
            </Label>
            <Select
              value={riskData.nnj}
              onValueChange={(value) => updateRiskData("nnj", value)}
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select jaundice status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">Jaundice (PT) (Mild Risk)</SelectItem>
                <SelectItem value="moderate">
                  NNJ (ET) (Moderate Risk)
                </SelectItem>
                <SelectItem value="severe">
                  BIND (MRI/BERA/Clinical) (Severe Risk)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hypothyroidism */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700">
              <Target className="w-4 h-4" />
              Hypothyroidism
            </Label>
            <Select
              value={riskData.hypothyroidism}
              onValueChange={(value) => updateRiskData("hypothyroidism", value)}
            >
              <SelectTrigger className="border-red-200 focus:border-red-400">
                <SelectValue placeholder="Select thyroid status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">Normal (Mild Risk)</SelectItem>
                <SelectItem value="moderate">
                  Hypothyroidism (Moderate Risk)
                </SelectItem>
                <SelectItem value="severe">
                  Treatment delayed (not normalized by one month) (Severe Risk)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Others - Text Area */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-red-700">
            <FileText className="w-4 h-4" />
            Others
          </Label>
          <Textarea
            placeholder="Enter any other relevant risk factors..."
            value={riskData.others}
            onChange={(e) => updateRiskData("others", e.target.value)}
            className="border-red-200 focus:border-red-400 min-h-[80px]"
          />
        </div>
      </CardContent>
    </Card>
  );
};

// Hines Score Component
const HinesScoreSection = ({
  hinesScore,
  setHinesScore,
}: {
  hinesScore: number;
  setHinesScore: (score: number) => void;
}) => {
  return (
    <Card className="enhanced-card border-2 border-red-200 bg-gradient-to-r from-red-50/30 to-white hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <Brain className="w-6 h-6" />
          Hines Score Assessment
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Neuromotor development assessment at term equivalence or 3 months
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-700 text-lg font-semibold">
              <Activity className="w-5 h-5" />
              HINES SCORE AT TERM EQUIVALENCE OR 3 MONTHS
            </Label>
            <div className="relative">
              <Input
                type="number"
                placeholder="Enter Hines score"
                value={hinesScore || ""}
                onChange={(e) => setHinesScore(parseInt(e.target.value) || 0)}
                className="border-red-200 focus:border-red-400 text-lg font-semibold"
                min="0"
                max="78"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-xs text-muted-foreground bg-white px-2 py-1 rounded border">
                  Range: 0-78
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Info className="w-3 h-3" />
              Higher scores indicate better neuromotor development
            </p>
          </div>

          {/* Score Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Score Indicator</span>
              <span>{hinesScore}/78</span>
            </div>
            <Progress value={(hinesScore / 78) * 100} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low (0-26)</span>
              <span>Moderate (27-52)</span>
              <span>High (53-78)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Patient Information Component
const PatientInfoSection = ({ patient }: { patient: Patient | null }) => {
  if (!patient) {
    return (
      <Card className="enhanced-card border-2 border-red-200 bg-gradient-to-r from-red-50/30 to-white">
        <CardContent className="p-6 text-center">
          <Baby className="w-12 h-12 mx-auto mb-4 text-red-400" />
          <p className="text-muted-foreground">No patient selected</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="enhanced-card border-2 border-red-200 bg-gradient-to-r from-red-50/30 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <Baby className="w-6 h-6" />
          Patient Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <User className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Patient Name</p>
              <p className="font-semibold text-red-800">{patient.userName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <Mail className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold text-red-800">{patient.userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <FileText className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Patient ID</p>
              <p className="font-semibold text-red-800">
                {patient.id.slice(-8).toUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <Calendar className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Assessment Date</p>
              <p className="font-semibold text-red-800">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Clinician Information Component
const ClinicianInfoSection = ({
  clinicianName,
  clinicianEmail,
}: {
  clinicianName: string;
  clinicianEmail: string;
}) => {
  return (
    <Card className="enhanced-card border-2 border-red-300 bg-gradient-to-r from-red-100/50 to-red-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <Stethoscope className="w-6 h-6" />
          Clinician Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-200 rounded-full">
              <User className="w-4 h-4 text-red-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Clinician Name</p>
              <p className="font-semibold text-red-800">{clinicianName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-200 rounded-full">
              <Mail className="w-4 h-4 text-red-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold text-red-800">{clinicianEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-200 rounded-full">
              <Hospital className="w-4 h-4 text-red-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-semibold text-red-800">Clinical Assessor</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-200 rounded-full">
              <Shield className="w-4 h-4 text-red-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Provider</p>
              <p className="font-semibold text-red-800">EarlySteps AI</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Clinician Assessment Page
export default function ClinicianAssessmentPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [clinicianName, setClinicianName] = useState("Dr. Aswin Tony");
  const [clinicianEmail, setClinicianEmail] = useState(
    "clinician@earlysteps.in"
  );
  const [notes, setNotes] = useState("");

  const [riskFactorData, setRiskFactorData] = useState<RiskFactorData>({
    gestation: "",
    birthWeight: "",
    sga: "",
    intraUterineInsults: "",
    antenatalSteroids: "",
    resuscitationAtBirth: "",
    ventilation: "",
    daysOnVentilator: "",
    perfusion: "",
    shockTherapy: "",
    hypoglycemia: "",
    bloodSugars: "",
    daysOfHypoglycemia: "",
    neurosonogram: "",
    infection: "",
    nnj: "",
    hypothyroidism: "",
    others: "",
  });

  const [hinesScore, setHinesScore] = useState<number>(0);
  const { toast } = useToast();

  // Simulate fetching patient data
  useEffect(() => {
    const simulatePatientFetch = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate patient data
      const mockPatient: Patient = {
        id: "patient_GR5XXM",
        userName: "Baby XYZ",
        userEmail: "parent@earlysteps.m",
        dateOfBirth: "2024-01-15",
        guardianName: "John & Jane Smith",
        medicalRecordNumber: "MRN-789456",
      };

      setPatient(mockPatient);
      setLoading(false);
    };

    simulatePatientFetch();
  }, []);

  // Simulate submitting assessment
  const handleSubmitAssessment = async () => {
    // Validation
    const requiredFields = Object.entries(riskFactorData).filter(
      ([key, value]) => key !== "others" && key !== "daysOnVentilator" && !value
    );

    if (requiredFields.length > 0) {
      toast({
        title: "Incomplete Assessment",
        description: "Please complete all required risk factor fields.",
        variant: "destructive",
      });
      return;
    }

    if (hinesScore < 0 || hinesScore > 78) {
      toast({
        title: "Invalid Hines Score",
        description: "Hines score must be between 0 and 78.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    setSubmitProgress(0);

    // Simulate submission progress
    const progressSteps = [
      { progress: 20, message: "Validating assessment data..." },
      { progress: 40, message: "Calculating risk scores..." },
      { progress: 60, message: "Generating clinical report..." },
      { progress: 80, message: "Saving to patient record..." },
      { progress: 100, message: "Assessment completed!" },
    ];

    for (const step of progressSteps) {
      setSubmitProgress(step.progress);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    // Simulate successful submission
    try {
      const assessmentData: ClinicalAssessment = {
        patientId: patient?.id || "",
        clinicianName,
        clinicianEmail,
        riskFactor: riskFactorData,
        hinesScore,
        notes,
        assessmentDate: new Date(),
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast({
        title: "Assessment Submitted Successfully",
        description:
          "The clinical assessment has been saved to the patient record.",
      });

      // Reset form
      setRiskFactorData({
        gestation: "",
        birthWeight: "",
        sga: "",
        intraUterineInsults: "",
        antenatalSteroids: "",
        resuscitationAtBirth: "",
        ventilation: "",
        daysOnVentilator: "",
        perfusion: "",
        shockTherapy: "",
        hypoglycemia: "",
        bloodSugars: "",
        daysOfHypoglycemia: "",
        neurosonogram: "",
        infection: "",
        nnj: "",
        hypothyroidism: "",
        others: "",
      });
      setHinesScore(0);
      setNotes("");
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Unable to save assessment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
      setSubmitProgress(0);
    }
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
                Loading Patient Data
              </h2>
              <p className="text-muted-foreground">
                Please wait while we fetch patient information...
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
            <h1 className="text-4xl font-bold text-red-800 mb-4 flex items-center justify-center gap-3">
              <Stethoscope className="w-8 h-8 text-red-600 animate-pulse" />
              Clinical Assessment Dashboard
              <Stethoscope className="w-8 h-8 text-red-600 animate-pulse" />
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive neuromotor development assessment platform
            </p>
          </div>

          {/* Information Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <PatientInfoSection patient={patient} />
            <ClinicianInfoSection
              clinicianName={clinicianName}
              clinicianEmail={clinicianEmail}
            />
          </div>

          {/* Assessment Forms */}
          <div className="space-y-8">
            <RiskFactorSection
              riskData={riskFactorData}
              setRiskData={setRiskFactorData}
            />
            <HinesScoreSection
              hinesScore={hinesScore}
              setHinesScore={setHinesScore}
            />

            {/* Clinical Notes */}
            <Card className="enhanced-card border-2 border-red-200 bg-gradient-to-r from-red-50/30 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <FileText className="w-6 h-6" />
                  Clinical Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label className="text-red-700">
                    Additional Observations
                  </Label>
                  <Textarea
                    placeholder="Enter any additional clinical observations, recommendations, or notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="border-red-200 focus:border-red-400 min-h-[120px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submission Section */}
          <div className="mt-12">
            {submitting ? (
              <Card className="enhanced-card border-2 border-red-300 bg-gradient-to-r from-red-100/50 to-red-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <Save className="w-6 h-6 animate-pulse" />
                    Submitting Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={submitProgress} className="w-full" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Processing...</span>
                      <span>{Math.round(submitProgress)}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-red-700">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                      Saving clinical assessment data
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center">
                <Button
                  onClick={handleSubmitAssessment}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  disabled={!patient}
                >
                  <Save className="w-6 h-6 mr-3" />
                  Submit Clinical Assessment
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  Assessment will be saved to patient record and available for
                  review
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
