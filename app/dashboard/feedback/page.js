'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FeedbackPage() {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment })
    });
    
    if (res.ok) {
        setSubmitted(true);
        setTimeout(() => router.back(), 2000);
    } else {
        alert('Failed to submit feedback');
    }
  };

  if (submitted) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
            <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-2xl font-bold text-green-800">Thank You!</h1>
                <p className="text-green-600">Your feedback helps us improve.</p>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-2">Rate Your Meal</h1>
      <p className="text-gray-500 mb-8">How was the Paneer Butter Masala yesterday?</p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="mb-6 text-center">
            <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                    <button 
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-4xl transition ${rating >= star ? 'scale-110' : 'opacity-30 grayscale'}`}
                    >
                        ⭐
                    </button>
                ))}
            </div>
            <p className="font-bold text-gray-700">
                {rating === 5 ? 'Excellent 🤩' : rating === 4 ? 'Good 🙂' : rating === 3 ? 'Okay 😐' : 'Not Good 😞'}
            </p>
        </div>

        <textarea
            className="w-full border rounded-lg p-3 h-32 mb-4"
            placeholder="Tell us what you liked or didn't like..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <button className="w-full bg-black text-white py-3 rounded-xl font-bold active:scale-95 transition">
            Submit Feedback
        </button>
        <button type="button" onClick={() => router.back()} className="w-full mt-4 text-gray-500 py-2">
            Cancel
        </button>
      </form>
    </div>
  );
}
