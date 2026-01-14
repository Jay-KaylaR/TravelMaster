import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  showSearch?: boolean;
  primaryAction?: {
    text: string;
    onClick: () => void;
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
  };
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  showSearch = false,
  primaryAction,
  secondaryAction,
}: HeroProps) {
  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
        <div className="max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{title}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">{subtitle}</p>
          
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {primaryAction && (
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold"
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.text}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 text-lg font-semibold"
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Search Section */}
      {showSearch && (
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="glass-morphism p-8 rounded-2xl shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <Label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                    Destination
                  </Label>
                  <Input
                    id="destination"
                    placeholder="Where to?"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="checkin" className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in
                  </Label>
                  <Input
                    id="checkin"
                    type="date"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="checkout" className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out
                  </Label>
                  <Input
                    id="checkout"
                    type="date"
                    className="w-full"
                  />
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                    Search
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </section>
  );
}
