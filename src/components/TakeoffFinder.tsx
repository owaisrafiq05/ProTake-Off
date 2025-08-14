"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, ArrowRight, Zap, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TakeoffFinder = () => {
  const [zipCode, setZipCode] = useState("");
  const [takeoffType, setTakeoffType] = useState("");
  const [distance, setDistance] = useState("");
  const [projectSize, setProjectSize] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Allow empty search to show all takeoffs
    const params = new URLSearchParams();

    // Only add parameters if they are provided
    if (zipCode && /^[0-9]{5}$/.test(zipCode)) {
      params.append("zipCode", zipCode);
    } else if (zipCode && !/^[0-9]{5}$/.test(zipCode)) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }

    if (takeoffType) {
      params.append("takeoffType", takeoffType);
    }

    if (distance) {
      params.append("distance", distance);
    }

    if (projectSize) {
      params.append("size", projectSize);
    }

    // Navigate to find-takeoffs page with or without parameters
    const queryString = params.toString();
    navigate(`/find-takeoffs${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <section
      id="find-takeoffs"
      className="relative bg-white py-20 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23059669" fillOpacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3Ccircle cx="27" cy="7" r="1"/%3E%3Ccircle cx="47" cy="7" r="1"/%3E%3Ccircle cx="7" cy="27" r="1"/%3E%3Ccircle cx="27" cy="27" r="1"/%3E%3Ccircle cx="47" cy="27" r="1"/%3E%3Ccircle cx="7" cy="47" r="1"/%3E%3Ccircle cx="27" cy="47" r="1"/%3E%3Ccircle cx="47" cy="47" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] bg-repeat' />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-brand-100/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-brand-50/50 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center bg-brand-50 text-brand-700 px-4 py-2 rounded-full text-sm font-medium border border-brand-200 mb-6">
            <Zap className="h-4 w-4 mr-2" />
            Advanced Search
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Your <span className="text-brand-600">Takeoff</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Use our advanced filters to find the perfect takeoff for your
            project or browse our entire catalog. Get professional, ready-to-use
            estimates tailored to your exact needs.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-4xl mx-auto relative"
        >
          {/* Form Header */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mr-3">
              <Filter className="h-6 w-6 text-brand-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Advanced Takeoff Search
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ZIP Code Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-left">
                ZIP Code
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Enter your ZIP code (optional)"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="pl-10 border-gray-300 text-lg py-4 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            {/* Takeoff Type Select */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-left">
                Takeoff Type
              </label>
              <Select value={takeoffType} onValueChange={setTakeoffType}>
                <SelectTrigger className="w-full border-gray-300 text-lg py-4 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all">
                  <SelectValue placeholder="Select takeoff type (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="landscaping">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Landscaping</span>
                      <span className="text-sm text-gray-500">
                        Garden design & installation
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="irrigation">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Irrigation</span>
                      <span className="text-sm text-gray-500">
                        Sprinkler & watering systems
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="bundle">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Bundle</span>
                      <span className="text-sm text-gray-500">
                        Combined landscaping & irrigation
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Distance Select */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-left">
                Distance
              </label>
              <Select value={distance} onValueChange={setDistance}>
                <SelectTrigger className="w-full border-gray-300 text-lg py-4 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all">
                  <SelectValue placeholder="Select search radius (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">25 miles</span>
                      <span className="text-sm text-gray-500">
                        Local contractors
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="100">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">100 miles</span>
                      <span className="text-sm text-gray-500">
                        Regional contractors
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="150">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">150+ miles</span>
                      <span className="text-sm text-gray-500">
                        Extended search area
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="all">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">All</span>
                      <span className="text-sm text-gray-500">
                        Nationwide search
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Project Size Select */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-left">
                Project Size
              </label>
              <Select value={projectSize} onValueChange={setProjectSize}>
                <SelectTrigger className="w-full border-gray-300 text-lg py-4 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all">
                  <SelectValue placeholder="Select your project size (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Small Sized</span>
                      <span className="text-sm text-gray-500">
                        $50K - $150K
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Medium Sized</span>
                      <span className="text-sm text-gray-500">
                        $150K - $300K
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="large">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Large Sized</span>
                      <span className="text-sm text-gray-500">$350K - $1M</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="corporate">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Corporate Sized</span>
                      <span className="text-sm text-gray-500">$1M+</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="all">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">All</span>
                      <span className="text-sm text-gray-500">
                        Any project size
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <Button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 group"
            >
              {zipCode || takeoffType || distance || projectSize
                ? "Find Available Takeoffs"
                : "Browse All Takeoffs"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            {error && (
              <div className="text-red-500 text-sm text-left pt-3">{error}</div>
            )}
          </div>

          {/* Trust Indicator */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <span className="font-medium text-brand-600">500+</span>{" "}
              contractors trust Protakeoffs.ai for their estimates
            </p>
          </div>
        </form>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">2 min</div>
            <div className="text-sm text-gray-600">Average search time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">10K+</div>
            <div className="text-sm text-gray-600">Available takeoffs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">$50-$150</div>
            <div className="text-sm text-gray-600">Typical pricing</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">98%</div>
            <div className="text-sm text-gray-600">Match accuracy</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TakeoffFinder;
