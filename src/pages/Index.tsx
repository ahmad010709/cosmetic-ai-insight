
import { useState, useEffect } from "react";
import { Camera, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageAnalyzer from "@/components/ImageAnalyzer";
import NameAnalyzer from "@/components/NameAnalyzer";
import { AnalysisResult } from "@/types/cosmetics";
import ResultsDisplay from "@/components/ResultsDisplay";
import { useAdMob } from "@/hooks/useAdMob";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { showBannerAd, hideBannerAd, isNative, isInitialized } = useAdMob();

  // Show banner ad when component mounts
  useEffect(() => {
    if (isNative && isInitialized) {
      showBannerAd();
    }

    // Cleanup: hide banner ad when component unmounts
    return () => {
      if (isNative && isInitialized) {
        hideBannerAd();
      }
    };
  }, [isNative, isInitialized, showBannerAd, hideBannerAd]);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setIsAnalyzing(false);
    // Show banner ad again when returning to main screen
    if (isNative && isInitialized) {
      showBannerAd();
    }
  };

  if (analysisResult) {
    return <ResultsDisplay result={analysisResult} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Cosmetica AI
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Analyze ingredients with the power of AI
          </p>
        </div>

        {/* Analysis Tabs */}
        <Card className="backdrop-blur-sm bg-white/80 shadow-xl border-0">
          <CardContent className="p-8">
            <Tabs defaultValue="image" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100">
                <TabsTrigger 
                  value="image" 
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <Camera className="w-4 h-4" />
                  Analyze by Image
                </TabsTrigger>
                <TabsTrigger 
                  value="name" 
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  Analyze by Name
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="image" className="mt-0">
                <ImageAnalyzer
                  onAnalysisComplete={handleAnalysisComplete}
                  onAnalysisStart={handleAnalysisStart}
                  isAnalyzing={isAnalyzing}
                />
              </TabsContent>
              
              <TabsContent value="name" className="mt-0">
                <NameAnalyzer
                  onAnalysisComplete={handleAnalysisComplete}
                  onAnalysisStart={handleAnalysisStart}
                  isAnalyzing={isAnalyzing}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer - with extra padding for banner ad on mobile */}
        <div className={`text-center mt-12 text-gray-500 text-sm ${isNative ? 'mb-16' : ''}`}>
          <p>© 2025 Cosmetica AI. All rights reserved.</p>
          <p className="mt-1">Analyze ingredients with the power of AI.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
