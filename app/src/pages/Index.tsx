import {
  Activity,
  Clock,
  DollarSign,
  Heart,
  Shield,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-baby.jpg";

const Index = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Premature baby with medical care"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-teal/20"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-brand-dark mb-6 leading-tight">
            What If we could spot{" "}
            <span className="text-brand-blue">Cerebral Palsy</span>, before the
            child ever misses a milestone?
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We propose a Multimodal diagnostic system using Graphical
            Convolutional Networks that predicts Cerebral Palsy
          </p>
          <Button
            onClick={() => scrollToSection("solution")}
            size="lg"
            className="bg-brand-accent hover:bg-brand-accent/90 text-brand-dark font-semibold text-lg px-8 py-4"
          >
            Learn How It Works
          </Button>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">
              Why It Matters?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="text-6xl font-bold text-brand-blue mb-4">
                  90%
                </div>
                <p className="text-lg text-muted-foreground">
                  A Delayed Diagnosis, reduces the effectiveness of
                  Neuroplasticity based therapies by up to 90%
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="text-6xl font-bold text-brand-teal mb-4">
                  25-30%
                </div>
                <p className="text-lg text-muted-foreground">
                  Early interventions, (&lt;1 year age) improves cognitive
                  outcome by 25-30%
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="text-6xl font-bold text-brand-accent mb-4">
                  70-80%
                </div>
                <p className="text-lg text-muted-foreground">
                  Around 70-80% Indian families cannot afford a CT or MRI scan
                  out-of-pocket
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section id="solution" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">
              Proposed Solution & Clinical Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              An accessible and affordable diagnostic tool that uses standard
              RGB videos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-brand-teal" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-4">
                Early Prediction
              </h3>
              <p className="text-muted-foreground">
                Predicts Cerebral Palsy before the age of 5 months
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="w-8 h-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-4">
                Fast Diagnosis
              </h3>
              <p className="text-muted-foreground">
                Reduces diagnosis time by 95%
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-brand-accent" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-4">
                Zero Cost
              </h3>
              <p className="text-muted-foreground">
                Out of pocket expenditure for users is zero
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Team Section */}
      <section id="team" className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">
              Meet the Team
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img
                    src="/aswin.jpeg"
                    alt="Aswin Tony Joseph"
                    className="w-full h-full rounded-full object-cover object-center"
                  />
                </div>
                <h3 className="font-semibold text-brand-dark mb-2">
                  Aswin Tony Joseph
                </h3>
                <p className="text-sm text-muted-foreground">
                  Government Medical College Thiruvananthapuram
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img
                    src="/meenakshi.jpg"
                    alt="Meenakshi N"
                    className="w-full h-full rounded-full object-cover object-center"
                  />
                </div>
                <h3 className="font-semibold text-brand-dark mb-2">
                  Meenakshi N
                </h3>
                <p className="text-sm text-muted-foreground">
                  Government Medical College Thiruvananthapuram
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img
                    src="/chitraksh.jpg"
                    alt="Chitraksh Vasantati"
                    className="w-full h-full rounded-full object-cover object-center"
                  />
                </div>
                <h3 className="font-semibold text-brand-dark mb-2">
                  Chitraksh Vasantati
                </h3>
                <p className="text-sm text-muted-foreground">
                  Indian Institute of Technology, Tirupati
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img
                    src="/amit.jpg"
                    alt="Amit Jomy"
                    className="w-full h-full rounded-full object-cover object-center"
                  />
                </div>
                <h3 className="font-semibold text-brand-dark mb-2">
                  Amit Jomy
                </h3>
                <p className="text-sm text-muted-foreground">
                  Indian Institute of Technology, Tirupati
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ethical Considerations Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">
              Ethical Considerations
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-brand-teal/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="w-4 h-4 text-brand-teal" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark mb-2">
                  Informed Consent
                </h3>
                <p className="text-muted-foreground">
                  All participants provide informed consent before participation
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="w-4 h-4 text-brand-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark mb-2">
                  Confidentiality & Data Privacy
                </h3>
                <p className="text-muted-foreground">
                  Strict data protection and privacy measures
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-brand-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Heart className="w-4 h-4 text-brand-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark mb-2">
                  IEC Approval
                </h3>
                <p className="text-muted-foreground">
                  The study shall proceed only after the approval of IEC
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-brand-teal/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="w-4 h-4 text-brand-teal" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark mb-2">
                  Data Management
                </h3>
                <p className="text-muted-foreground">
                  Data will be used solely for research and shall be destroyed
                  after 5 years
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
