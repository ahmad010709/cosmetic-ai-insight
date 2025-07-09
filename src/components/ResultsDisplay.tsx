
import { ArrowLeft, Star, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnalysisResult } from "@/types/cosmetics";

interface ResultsDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ResultsDisplay = ({ result, onReset }: ResultsDisplayProps) => {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "safe":
        return "text-green-600 bg-green-100";
      case "caution":
        return "text-yellow-600 bg-yellow-100";
      case "avoid":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case "safe":
        return <CheckCircle className="w-4 h-4" />;
      case "caution":
        return <AlertTriangle className="w-4 h-4" />;
      case "avoid":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={onReset}
          className="mb-6 hover:bg-purple-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Analyzer
        </Button>

        <div className="space-y-6">
          {/* Product Header */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {result.productName}
                  </CardTitle>
                  <p className="text-lg text-gray-600 mt-1">{result.brand}</p>
                  <Badge variant="secondary" className="mt-2">
                    {result.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(result.rating)}
                  </div>
                  <p className="text-sm text-gray-600">
                    {result.rating}/5 ({result.reviewCount} reviews)
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{result.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.keyBenefits.map((benefit, index) => (
                      <Badge key={index} variant="outline" className="bg-purple-50">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Suitable For</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.skinTypes.map((type, index) => (
                      <Badge key={index} variant="outline" className="bg-pink-50">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium">Texture:</span> {result.texture}
                </div>
                <div>
                  <span className="font-medium">Scent:</span> {result.scent}
                </div>
                <div>
                  <span className="font-medium">Price Range:</span> {result.priceRange}
                </div>
                <div>
                  <span className="font-medium">Availability:</span> {result.availability}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Usage Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{result.usage}</p>
              </CardContent>
            </Card>
          </div>

          {/* Ingredient Analysis */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Ingredient Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.ingredients.map((ingredient, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{ingredient.name}</h4>
                      <Badge className={getRatingColor(ingredient.rating)}>
                        {getRatingIcon(ingredient.rating)}
                        <span className="ml-1 capitalize">{ingredient.rating}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{ingredient.purpose}</p>
                    
                    {ingredient.benefits.length > 0 && (
                      <div className="mb-2">
                        <span className="text-sm font-medium text-green-700">Benefits: </span>
                        <span className="text-sm text-gray-700">
                          {ingredient.benefits.join(", ")}
                        </span>
                      </div>
                    )}
                    
                    {ingredient.concerns.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-amber-700">Concerns: </span>
                        <span className="text-sm text-gray-700">
                          {ingredient.concerns.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Complete Formula */}
          {result.formula.length > 0 && (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Complete Formula (INCI)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {result.formula.join(", ")}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-700 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Important Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {result.warnings.map((warning, index) => (
                    <li key={index} className="text-amber-700 text-sm flex items-start gap-2">
                      <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                      {warning}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
