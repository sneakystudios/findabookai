import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function BookRecommendationApp() {
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');
  const [length, setLength] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/getRecommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genre, mood, length }),
      });
      const data = await response.json();
      setRecommendation(data.recommendation);
    } catch (error) {
      console.error('Error:', error);
      setRecommendation('Sorry, an error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Find a Book AI</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="genre">Preferred Genre:</Label>
            <Input
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="e.g., Science Fiction, Romance, Mystery"
              required
            />
          </div>
          <div>
            <Label htmlFor="mood">Current Mood:</Label>
            <Input
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="e.g., Happy, Reflective, Excited"
              required
            />
          </div>
          <div>
            <Label htmlFor="length">Preferred Book Length:</Label>
            <Input
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="e.g., Short, Medium, Long"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Getting Recommendation...' : 'Get Recommendation'}
          </Button>
        </form>
      </CardContent>
      {recommendation && (
        <CardFooter>
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">Your Recommendation:</h3>
            <p>{recommendation}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
