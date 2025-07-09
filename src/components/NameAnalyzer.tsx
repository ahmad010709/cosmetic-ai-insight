
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { AnalysisResult } from "@/types/cosmetics";

interface NameAnalyzerProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onAnalysisStart: () => void;
  isAnalyzing: boolean;
}

const NameAnalyzer = ({ onAnalysisComplete, onAnalysisStart, isAnalyzing }: NameAnalyzerProps) => {
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");

  const analyzeByName = async () => {
    if (!productName.trim()) {
      toast.error("Please enter a product name");
      return;
    }

    onAnalysisStart();
    
    try {
      // Simulate AI analysis - In a real app, you'd send this to your AI service
      await new Promise(resolve => setTimeout(resolve, 3000));

      const mockResult: AnalysisResult = {
        productName: productName,
        brand: brandName || "Generic Brand",
        category: "Skincare Product",
        description: `${productName} is a high-quality cosmetic product designed to enhance your beauty routine with effective ingredients.`,
        rating: 4.2,
        reviewCount: 892,
        keyBenefits: ["Moisturizing", "Nourishing", "Gentle Formula", "Long-lasting"],
        skinTypes: ["All Skin Types"],
        texture: "Smooth cream",
        scent: "Light fragrance",
        priceRange: "$15-45",
        availability: "Available in most beauty stores",
        ingredients: [
          {
            name: "Glycerin",
            purpose: "Humectant",
            benefits: ["Moisture retention", "Skin softening", "Barrier protection"],
            concerns: [],
            rating: "safe"
          },
          {
            name: "Cetyl Alcohol",
            purpose: "Emollient",
            benefits: ["Skin conditioning", "Texture enhancement"],
            concerns: [],
            rating: "safe"
          },
          {
            name: "Parfum",
            purpose: "Fragrance",
            benefits: ["Pleasant scent"],
            concerns: ["May cause allergic reactions in sensitive individuals"],
            rating: "caution"
          }
        ],
        warnings: ["For external use only", "Avoid contact with eyes"],
        usage: "Apply to clean skin as needed. Use daily for best results.",
        formula: [
          "Aqua", "Glycerin", "Cetyl Alcohol", "Stearyl Alcohol", 
          "Dimethicone", "Parfum", "Tocopherol", "Phenoxyethanol"
        ]
      };

      onAnalysisComplete(mockResult);
      toast.success("Analysis completed successfully!");
    } catch (error) {
      console.error("Analysis failed:", error);
      toast.error("Failed to analyze the product. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Enter Product Details</h3>
        <p className="text-gray-600">
          Search for a product by name and brand to get detailed analysis.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product-name">Product Name *</Label>
            <Input
              id="product-name"
              placeholder="e.g., Vitamin C Serum, Moisturizing Cream"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              disabled={isAnalyzing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="brand-name">Brand Name (Optional)</Label>
            <Input
              id="brand-name"
              placeholder="e.g., The Ordinary, CeraVe, Neutrogena"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              disabled={isAnalyzing}
            />
          </div>

          <Button
            onClick={analyzeByName}
            disabled={isAnalyzing || !productName.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Searching & Analyzing...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Analyze Product
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>
          Our AI will search for the product online and provide detailed 
          ingredient analysis, ratings, and safety information.
        </p>
      </div>
    </div>
  );
};

export default NameAnalyzer;
