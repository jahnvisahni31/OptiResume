'use client';

import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Download,
  FileText,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function AnalysisPage() {
  const { id } = useParams();
  
  // TODO: Fetch analysis data from Supabase
  const analysis = {
    overall_score: 85,
    ats_score: 90,
    keyword_score: 75,
    format_score: 95,
    sections: [
      {
        section_type: 'summary',
        score: 80,
        feedback: 'Your professional summary is clear but could be more impactful.',
        suggestions: [
          'Add quantifiable achievements',
          'Include industry-specific keywords',
          'Keep it concise (3-4 sentences)',
        ],
      },
      // Add more sections...
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Resume Analysis Results</h1>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Overall Score</h2>
              <span className="text-3xl font-bold text-primary">
                {analysis.overall_score}%
              </span>
            </div>
            <Progress value={analysis.overall_score} className="mb-4" />
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">ATS Score</p>
                <span className="font-semibold">{analysis.ats_score}%</span>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Keywords</p>
                <span className="font-semibold">{analysis.keyword_score}%</span>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Format</p>
                <span className="font-semibold">{analysis.format_score}%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto py-4 px-6">
                <BarChart className="w-5 h-5 mr-2" />
                Compare with Industry
              </Button>
              <Button variant="outline" className="h-auto py-4 px-6">
                <FileText className="w-5 h-5 mr-2" />
                Export to PDF
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {analysis.sections.map((section) => (
            <Card key={section.section_type} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold capitalize mb-1">
                    {section.section_type}
                  </h3>
                  <p className="text-muted-foreground">{section.feedback}</p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {section.score >= 70 ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      Score: {section.score}%
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="space-y-2">
                {section.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                    {suggestion}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
};