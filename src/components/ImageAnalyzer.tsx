
import { useState, useRef } from "react";
import { Camera, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { AnalysisResult } from "@/types/cosmetics";

interface ImageAnalyzerProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onAnalysisStart: () => void;
  isAnalyzing: boolean;
}

const ImageAnalyzer = ({ onAnalysisComplete, onAnalysisStart, isAnalyzing }: ImageAnalyzerProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    onAnalysisStart();
    
    try {
      // Simulate AI analysis - In a real app, you'd send this to your AI service
      await new Promise(resolve => setTimeout(resolve, 3000));

      const mockResult: AnalysisResult = {
        productName: "Advanced Vitamin C Serum",
        brand: "SkinCare Pro",
        category: "Face Serum",
        description: "A powerful anti-aging serum with 20% Vitamin C, designed to brighten skin tone and reduce fine lines.",
        rating: 4.5,
        reviewCount: 1247,
        keyBenefits: ["Brightening", "Anti-aging", "Antioxidant Protection", "Collagen Boost"],
        skinTypes: ["Normal", "Dry", "Combination"],
        texture: "Lightweight liquid",
        scent: "Citrus",
        priceRange: "$25-35",
        availability: "Available online and in stores",
        ingredients: [
          {
            name: "L-Ascorbic Acid (Vitamin C)",
            purpose: "Antioxidant and brightening agent",
            benefits: ["Collagen synthesis", "Skin brightening", "Free radical protection"],
            concerns: ["May cause irritation in sensitive skin"],
            rating: "safe"
          },
          {
            name: "Hyaluronic Acid",
            purpose: "Humectant",
            benefits: ["Deep hydration", "Plumping effect", "Moisture retention"],
            concerns: [],
            rating: "safe"
          },
          {
            name: "Niacinamide",
            purpose: "Skin conditioning agent",
            benefits: ["Pore minimizing", "Oil control", "Skin barrier support"],
            concerns: [],
            rating: "safe"
          }
        ],
        warnings: ["Patch test recommended", "Use sunscreen during the day"],
        usage: "Apply 2-3 drops to clean skin in the morning. Follow with moisturizer and SPF.",
        formula: [
          "Water", "L-Ascorbic Acid", "Propylene Glycol", "Hyaluronic Acid", 
          "Niacinamide", "Vitamin E Acetate", "Citric Acid", "Sodium Benzoate"
        ]
      };

      onAnalysisComplete(mockResult);
      toast.success("Analysis completed successfully!");
    } catch (error) {
      console.error("Analysis failed:", error);
      toast.error("Failed to analyze the image. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Upload an Image</h3>
        <p className="text-gray-600">
          Take a photo or drag and drop a product image here.
        </p>
      </div>

      <Card className="border-2 border-dashed border-gray-200 hover:border-purple-300 transition-colors">
        <CardContent className="p-8">
          {selectedImage ? (
            <div className="space-y-4">
              <img
                src={selectedImage}
                alt="Selected product"
                className="max-w-full h-64 object-contain mx-auto rounded-lg"
              />
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => setSelectedImage(null)}
                  disabled={isAnalyzing}
                >
                  Choose Different Image
                </Button>
                <Button
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Product"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Camera className="w-8 h-8 text-purple-500" />
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full max-w-xs"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                <p className="text-sm text-gray-500">
                  Supports JPG, PNG, WEBP up to 10MB
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />
    </div>
  );
};

export default ImageAnalyzer;
