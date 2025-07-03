import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const questions = [
  {
    id: 1,
    text: "When you face a difficult situation, what’s your first instinct?",
    options: {
      A: "I try to analyze or gather more information (Head)",
      B: "I notice strong emotions or focus on how others feel about it (Heart)",
      C: "I go with my gut or try to control the situation physically (Gut)"
    }
  },
  {
    id: 2,
    text: "What bothers you most when something’s off?",
    options: {
      A: "Feeling uncertain or lacking clarity (Head)",
      B: "Feeling rejected or unappreciated (Heart)",
      C: "Feeling controlled or disrespected (Gut)"
    }
  },
  // Add additional questions here as needed
];

const encouragementByType = {
  1: "It's okay if you make some mistakes.",
  2: "It's okay if you don't try to please everyone.",
  3: "It's okay if you are a work in progress.",
  4: "It's okay if you wonder why you are you.",
  5: "It's okay if you don't know the answer.",
  6: "It's okay if you have a lot of questions.",
  7: "It's okay if you miss your old life.",
  8: "It's okay if you feel vulnerable.",
  9: "It's okay if you get upset."
};

export default function EnneagramApp() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const tallyResults = () => {
    const tally = { A: 0, B: 0, C: 0 };
    Object.values(answers).forEach(letter => {
      tally[letter]++;
    });
    return tally;
  };

  const renderConclusion = () => {
    const tally = tallyResults();
    const max = Math.max(tally.A, tally.B, tally.C);
    const dominant = Object.keys(tally).find(k => tally[k] === max);

    const conclusions = {
      A: ["Type 5: Knowledge & Privacy", "Type 6: Security & Guidance", "Type 7: Stimulation & Avoidance of Pain"],
      B: ["Type 2: Helpfulness & Love", "Type 3: Success & Admiration", "Type 4: Uniqueness & Identity"],
      C: ["Type 8: Control & Strength", "Type 9: Peace & Avoidance", "Type 1: Integrity & Improvement"]
    };

    const encouragements = {
      A: [encouragementByType[5], encouragementByType[6], encouragementByType[7]],
      B: [encouragementByType[2], encouragementByType[3], encouragementByType[4]],
      C: [encouragementByType[8], encouragementByType[9], encouragementByType[1]]
    };

    return (
      <div className="mt-6 px-4 text-base">
        <h2 className="text-lg font-bold mb-3">Suggested Enneagram Types:</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
          {conclusions[dominant].map(type => (
            <li key={type}>{type}</li>
          ))}
        </ul>
        <h3 className="font-semibold mb-2">Encouragement for You:</h3>
        <ul className="list-disc list-inside space-y-1 mb-4">
          {encouragements[dominant].map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
        <div className="text-center">
          <Button onClick={handleRetake} className="w-full md:w-auto">Retake Quiz</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      {!submitted ? (
        <div className="space-y-4">
          {questions.map(q => (
            <Card key={q.id} className="shadow-md">
              <CardContent className="p-4">
                <p className="font-medium mb-3 text-sm md:text-base">{q.text}</p>
                <div className="space-y-2">
                  {Object.entries(q.options).map(([letter, text]) => (
                    <Button
                      key={letter}
                      variant={answers[q.id] === letter ? 'default' : 'outline'}
                      onClick={() => handleAnswer(q.id, letter)}
                      className="w-full text-left whitespace-normal"
                    >
                      {letter}: {text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        renderConclusion()
      )}
      {!submitted && (
        <div className="mt-6 text-center">
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
            className="w-full md:w-auto"
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}