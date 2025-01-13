'use client';

import { Button } from '@/components/ui/button';
import { Upload, Sparkles, CheckCircle, FileText, BarChart, Shield } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
  if (file.type === 'application/pdf') {
    try {
      setUploadedFile(file); // Set the file in the state
      setScore(null); // Reset score while processing

      // Create a FormData object for file upload
      const formData = new FormData();
      formData.append('file', file);

      // Make an API request to upload and analyze the file
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload or process the file.');
      }

      const data = await response.json();
      if (data.score !== undefined) {
        setScore(data.score); // Update state with the score
      } else {
        throw new Error('Invalid response from server.');
      }
    } catch (error) {
      console.error('Error uploading or analyzing file:', error);
      alert('Something went wrong. Please try again.');
    }
  } else {
    alert('Please upload a PDF file.');
  }
};
return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background to-secondary">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Optimize Your Resume with AI
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-8">
              Get instant, AI-powered feedback on your resume. Improve your chances of landing your dream job with expert analysis and recommendations.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="text-lg px-8">
                Try for Free
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>

          {/* Upload Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging
                    ? 'border-primary bg-primary/5'
                    : 'border-muted-foreground/25'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  Drop your resume here
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to upload (PDF only)
                </p>
                <Button variant="outline">
                  Select File
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                </Button>
              </div>
            </Card>

            <Card className="p-8">
              {!uploadedFile ? (
                <div className="text-center h-full flex flex-col items-center justify-center">
                  <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    AI-Powered Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload your resume to get started
                  </p>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="text-center mb-8">
                    <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Resume Analysis Complete
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {uploadedFile.name}
                    </p>
                  </div>
                  {score !== null && (
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-4 text-primary">
                        {score}%
                      </div>
                      <p className="text-muted-foreground">
                        Your resume matches {score}% of modern ATS requirements
                      </p>
                      <Button className="mt-8" asChild>
                        <Link href={`/analysis/demo`}>View Detailed Report</Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-background py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our AI Resume Scorer?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">ATS Optimization</h3>
              <p className="text-muted-foreground">
                Ensure your resume passes through Applicant Tracking Systems with our advanced compatibility analysis.
              </p>
            </Card>
            <Card className="p-8">
              <BarChart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Industry Insights</h3>
              <p className="text-muted-foreground">
                Compare your resume against industry standards and get tailored recommendations.
              </p>
            </Card>
            <Card className="p-8">
              <FileText className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Feedback</h3>
              <p className="text-muted-foreground">
                Receive detailed, section-by-section analysis with actionable improvement suggestions.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
};