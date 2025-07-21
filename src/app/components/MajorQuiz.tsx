'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Brain, Trophy, ArrowRight } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: "What gets you most excited to learn about?",
    options: [
      { id: 'a', text: 'How things work & technology', majors: ['engineering', 'computer-science'] },
      { id: 'b', text: 'People & human behavior', majors: ['psychology', 'sociology'] },
      { id: 'c', text: 'Creative expression & art', majors: ['art', 'design', 'media'] },
      { id: 'd', text: 'Business & entrepreneurship', majors: ['business', 'economics'] },
    ]
  },
  {
    id: 2,
    question: "In a group project, you naturally:",
    options: [
      { id: 'a', text: 'Take charge and organize everyone', majors: ['business', 'management'] },
      { id: 'b', text: 'Come up with creative solutions', majors: ['design', 'art', 'engineering'] },
      { id: 'c', text: 'Research and analyze information', majors: ['research', 'science'] },
      { id: 'd', text: 'Help everyone work together', majors: ['psychology', 'education'] },
    ]
  },
  {
    id: 3,
    question: "Your ideal work environment is:",
    options: [
      { id: 'a', text: 'Fast-paced startup or tech company', majors: ['computer-science', 'business'] },
      { id: 'b', text: 'Creative studio or agency', majors: ['art', 'design', 'media'] },
      { id: 'c', text: 'Research lab or think tank', majors: ['science', 'research'] },
      { id: 'd', text: 'Helping people in community settings', majors: ['psychology', 'education', 'social-work'] },
    ]
  },
  {
    id: 4,
    question: "When facing a problem, you prefer to:",
    options: [
      { id: 'a', text: 'Break it down logically step-by-step', majors: ['engineering', 'computer-science', 'mathematics'] },
      { id: 'b', text: 'Think outside the box creatively', majors: ['art', 'design', 'media'] },
      { id: 'c', text: 'Research what others have tried', majors: ['research', 'science', 'history'] },
      { id: 'd', text: 'Consider how it affects people', majors: ['psychology', 'social-work', 'sociology'] },
    ]
  },
  {
    id: 5,
    question: "What kind of impact do you want to make?",
    options: [
      { id: 'a', text: 'Build the next big innovation', majors: ['engineering', 'computer-science', 'business'] },
      { id: 'b', text: 'Create beautiful, inspiring work', majors: ['art', 'design', 'media'] },
      { id: 'c', text: 'Advance human knowledge', majors: ['science', 'research', 'academia'] },
      { id: 'd', text: 'Help people live better lives', majors: ['psychology', 'medicine', 'education'] },
    ]
  }
];

const majorRecommendations = {
  'computer-science': { name: 'Computer Science', icon: '💻', description: 'Build the future with code!' },
  'engineering': { name: 'Engineering', icon: '⚙️', description: 'Design solutions that change the world!' },
  'business': { name: 'Business', icon: '💼', description: 'Lead teams and drive innovation!' },
  'psychology': { name: 'Psychology', icon: '🧠', description: 'Understand and help people thrive!' },
  'art': { name: 'Art & Design', icon: '🎨', description: 'Express creativity and inspire others!' },
  'design': { name: 'Design', icon: '✨', description: 'Create beautiful, functional experiences!' },
  'media': { name: 'Media & Communications', icon: '📱', description: 'Shape how the world communicates!' },
  'science': { name: 'Science', icon: '🔬', description: 'Discover how the universe works!' },
  'research': { name: 'Research', icon: '📊', description: 'Push the boundaries of knowledge!' },
  'education': { name: 'Education', icon: '📚', description: 'Shape the next generation!' },
  'social-work': { name: 'Social Work', icon: '🤝', description: 'Make a difference in communities!' },
  'sociology': { name: 'Sociology', icon: '👥', description: 'Understand how society works!' },
  'economics': { name: 'Economics', icon: '📈', description: 'Understand markets and decision-making!' },
  'mathematics': { name: 'Mathematics', icon: '🔢', description: 'Solve complex problems with numbers!' },
  'history': { name: 'History', icon: '📜', description: 'Learn from the past to shape the future!' },
  'medicine': { name: 'Medicine', icon: '⚕️', description: 'Heal and help people directly!' },
  'management': { name: 'Management', icon: '👔', description: 'Lead teams to success!' },
  'academia': { name: 'Academia', icon: '🎓', description: 'Teach and research at universities!' },
};

export default function MajorQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (optionId: string) => {
    const newAnswers = [...answers, optionId];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const majorScores: { [key: string]: number } = {};
    
    answers.forEach((answer, questionIndex) => {
      const question = quizQuestions[questionIndex];
      const selectedOption = question.options.find(opt => opt.id === answer);
      
      if (selectedOption) {
        selectedOption.majors.forEach(major => {
          majorScores[major] = (majorScores[major] || 0) + 1;
        });
      }
    });

    return Object.entries(majorScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([major]) => major);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (showResults) {
    const topMajors = calculateResults();
    
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-green-400 text-white text-sm px-4 py-2 rounded-full font-bold border-0 shadow-lg mb-6">
              <Trophy className="h-4 w-4 mr-2" />
              QUIZ COMPLETE!
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white drop-shadow-lg">
              Your Perfect Major Matches! 🎯
            </h2>
            <p className="text-xl text-white/90 mb-12 font-medium">
              Based on your answers, here are your top major recommendations:
            </p>

            <div className="grid gap-6 md:grid-cols-3 mb-12">
              {topMajors.map((major, index) => {
                const majorInfo = majorRecommendations[major as keyof typeof majorRecommendations];
                return (
                  <Card key={major} className={`text-center bg-white/95 backdrop-blur-sm border-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                    index === 0 ? 'border-yellow-400 ring-4 ring-yellow-200' : 'border-white/40'
                  }`}>
                    <CardHeader className="pb-6">
                      <div className={`mx-auto mb-4 w-16 h-16 ${index === 0 ? 'bg-yellow-400' : 'bg-purple-500'} rounded-full flex items-center justify-center shadow-lg text-2xl`}>
                        {majorInfo?.icon || '🎓'}
                      </div>
                      {index === 0 && (
                        <Badge className="bg-yellow-400 text-yellow-900 text-xs px-3 py-1 rounded-full font-bold border-0 mb-2">
                          TOP MATCH!
                        </Badge>
                      )}
                      <CardTitle className="text-xl font-black text-purple-600 mb-2">
                        {majorInfo?.name || major}
                      </CardTitle>
                      <CardDescription className="text-gray-600 font-medium">
                        {majorInfo?.description || 'A great fit for your interests!'}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border-4 border-white/40 shadow-xl mb-8">
              <h3 className="text-2xl font-black text-purple-600 mb-4">
                Want More Personalized Results? 🚀
              </h3>
              <p className="text-gray-600 font-medium mb-6">
                Sign up to unlock detailed major guides, career paths, and interactive lessons for your top matches!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-full font-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Sign Up - It&apos;s Free!
                  </Button>
                </Link>
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 text-lg px-8 py-3 rounded-full font-black"
                >
                  Retake Quiz
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="bg-blue-400 text-white text-sm px-4 py-2 rounded-full font-bold border-0 shadow-lg mb-6">
            <Brain className="h-4 w-4 mr-2" />
            DISCOVER YOUR MAJOR!
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white drop-shadow-lg">
            What&apos;s Your Perfect Major? 🤔
          </h2>
          <p className="text-xl text-white/90 font-medium mb-8">
            Take our fun 2-minute quiz to discover majors that match your personality and interests!
          </p>
          
          {/* Progress Bar */}
          <div className="bg-white/20 rounded-full h-3 mb-8 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/80 font-medium mb-8">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
        </div>

        <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm border-4 border-white/40 shadow-xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-black text-center text-purple-600 mb-4">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {question.options.map((option) => (
                <Button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  variant="outline"
                  className="w-full p-6 text-left border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 text-gray-700 font-medium text-lg justify-between group transition-all duration-200"
                >
                  <span>{option.text}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}