import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Tour, TourBookingForm } from "@/lib/types";
import { Star } from "lucide-react";

const tourBookingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  numberOfTravelers: z.string().min(1, "Please select number of travelers"),
  preferredTour: z.string().min(1, "Please select a tour"),
  preferredDate: z.string().min(1, "Please select a date"),
  specialRequirements: z.string().optional(),
});

export default function Tours() {
  const { toast } = useToast();
  
  const { data: tours = [], isLoading } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const bookingMutation = useMutation({
    mutationFn: (data: TourBookingForm) => apiRequest("POST", "/api/bookings/tours", data),
    onSuccess: () => {
      toast({
        title: "Booking Successful!",
        description: "Your tour booking has been submitted. We'll contact you soon.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: "There was an error submitting your booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<TourBookingForm>({
    resolver: zodResolver(tourBookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      numberOfTravelers: "",
      preferredTour: "",
      preferredDate: "",
      specialRequirements: "",
    },
  });

  const onSubmit = (data: TourBookingForm) => {
    bookingMutation.mutate(data);
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading tours...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Amazing Tours</h1>
          <p className="text-xl text-gray-600">Handcrafted experiences for every type of traveler</p>
        </div>

        {/* Filter Options */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Destinations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Destinations</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="americas">Americas</SelectItem>
              <SelectItem value="africa">Africa</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Durations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Durations</SelectItem>
              <SelectItem value="1-3">1-3 Days</SelectItem>
              <SelectItem value="4-7">4-7 Days</SelectItem>
              <SelectItem value="8+">8+ Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Price Range</SelectItem>
              <SelectItem value="under-500">Under $500</SelectItem>
              <SelectItem value="500-1000">$500-$1000</SelectItem>
              <SelectItem value="1000+">$1000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tours Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Available Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tour Package</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tours.map((tour) => (
                  <TableRow key={tour.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center">
                        <img
                          src={tour.image}
                          alt={tour.name}
                          className="w-16 h-12 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <div className="font-semibold">{tour.name}</div>
                          <div className="text-sm text-gray-600">{tour.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-900">{tour.duration}</TableCell>
                    <TableCell className="text-sm font-semibold text-primary">${tour.price}</TableCell>
                    <TableCell>{renderStars(tour.rating)}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => {
                          form.setValue("preferredTour", tour.name);
                          document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Book Now
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Booking Form */}
        <Card id="booking-form">
          <CardHeader>
            <CardTitle>Book Your Tour</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numberOfTravelers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Travelers</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select number" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 Person</SelectItem>
                          <SelectItem value="2">2 People</SelectItem>
                          <SelectItem value="3">3 People</SelectItem>
                          <SelectItem value="4">4+ People</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredTour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Tour</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tour" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tours.map((tour) => (
                            <SelectItem key={tour.id} value={tour.name}>
                              {tour.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialRequirements"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Special Requirements</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any special requirements or requests..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={bookingMutation.isPending}
                  >
                    {bookingMutation.isPending ? "Booking..." : "Book Tour Now"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
