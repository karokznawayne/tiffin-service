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
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0fdf4', padding: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3.75rem', marginBottom: '1rem' }}>🎉</div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#166534' }}>Thank You!</h1>
                <p style={{ color: '#15803d' }}>Your feedback helps us improve.</p>
            </div>
        </div>
    );
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Rate Your Meal</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>How was the Paneer Butter Masala yesterday?</p>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                {[1, 2, 3, 4, 5].map(star => (
                    <button 
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        style={{ fontSize: '2.25rem', padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', transition: 'transform 0.1s', transform: rating >= star ? 'scale(1.1)' : 'scale(1)', opacity: rating >= star ? 1 : 0.3, filter: rating >= star ? 'none' : 'grayscale(100%)' }}
                    >
                        ⭐
                    </button>
                ))}
            </div>
            <p style={{ fontWeight: 'bold', color: '#374151' }}>
                {rating === 5 ? 'Excellent 🤩' : rating === 4 ? 'Good 🙂' : rating === 3 ? 'Okay 😐' : 'Not Good 😞'}
            </p>
        </div>

        <textarea
            style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '0.75rem', height: '8rem', marginBottom: '1rem', resize: 'none' }}
            placeholder="Tell us what you liked or didn't like..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <button style={{ width: '100%', background: 'black', color: 'white', padding: '0.75rem', borderRadius: '0.75rem', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            Submit Feedback
        </button>
        <button type="button" onClick={() => router.back()} style={{ width: '100%', marginTop: '1rem', color: '#6b7280', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
            Cancel
        </button>
      </form>
    </div>
  );
}
