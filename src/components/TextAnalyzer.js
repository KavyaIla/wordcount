import React, { useState } from 'react';

function TextAnalyzer() {
  const [text, setText] = useState('');
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Calculate word count
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleSubmit = async () => {
    if (!text.trim()) {
      setReview('Please enter some text to analyze.');
      return;
    }

    setIsLoading(true);
    setReview('');

    try {
      const response = await fetch('/api/analyze-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setReview(result.analysis);
    } catch (error) {
      console.error('Error analyzing text:', error);
      setReview('Error analyzing text. Please make sure the server is running and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '48px',
            fontWeight: '800',
            marginBottom: '16px',
            letterSpacing: '-1px'
          }}>
            ✨ AI Text Analyzer
          </div>
          <p style={{ 
            color: '#6B7280', 
            fontSize: '18px',
            margin: '0',
            lineHeight: '1.6'
          }}>
            Transform your writing with AI-powered analysis and insights
          </p>
        </div>

        {/* Input Section */}
        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            color: '#4B5563',
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px'
          }}>
            📝 Your Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            placeholder="Paste your essay, article, or any text you'd like analyzed here..."
            style={{ 
              width: '100%',
              padding: '20px', 
              fontSize: '16px', 
              border: '2px solid #E5E7EB',
              borderRadius: '16px',
              fontFamily: 'inherit',
              resize: 'vertical',
              outline: 'none',
              transition: 'all 0.3s ease',
              background: '#FAFAFA',
              lineHeight: '1.6',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.border = '2px solid #8B5CF6';
              e.target.style.background = '#FFFFFF';
              e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.border = '2px solid #E5E7EB';
              e.target.style.background = '#FAFAFA';
              e.target.style.boxShadow = 'none';
            }}
          />
          {/* Word Count */}
          <div style={{
            textAlign: 'right',
            color: '#6B7280',
            fontSize: '15px',
            marginTop: '8px',
            fontWeight: '500',
            letterSpacing: '0.5px',
          }}>
            Word Count: {wordCount}
          </div>
        </div>

        {/* Button */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
              padding: '16px 40px',
              fontSize: '16px',
              fontWeight: '600',
              background: isLoading 
                ? 'linear-gradient(135deg, #D1D5DB, #9CA3AF)' 
                : 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: isLoading 
                ? 'none' 
                : '0 8px 25px rgba(139, 92, 246, 0.3)',
              transform: isLoading ? 'scale(0.95)' : 'scale(1)',
              minWidth: '200px'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 12px 35px rgba(139, 92, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.3)';
              }
            }}
          >
            {isLoading ? (
              <>
                <span style={{ 
                  display: 'inline-block',
                  animation: 'spin 1s linear infinite',
                  marginRight: '8px'
                }}>
                  ⚡
                </span>
                Analyzing...
              </>
            ) : (
              <>
                🚀 Analyze with AI
              </>
            )}
          </button>
        </div>

        {/* Loading Animation */}
        {isLoading && (
          <div style={{ 
            textAlign: 'center',
            padding: '32px',
            background: 'linear-gradient(135deg, #F3F4F6, #E5E7EB)',
            borderRadius: '16px',
            marginBottom: '32px',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
              borderRadius: '50%',
              animation: 'pulse 1.5s ease-in-out infinite',
              marginBottom: '16px'
            }}></div>
            <p style={{ 
              color: '#6B7280',
              fontSize: '16px',
              margin: '0',
              fontWeight: '500'
            }}>
              🤖 AI is analyzing your text...
            </p>
          </div>
        )}

        {/* Results Section */}
        {review && (
          <div style={{ 
            background: 'linear-gradient(135deg, #F8FAFC, #F1F5F9)',
            padding: '32px', 
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                fontSize: '20px'
              }}>
                🎯
              </div>
              <h3 style={{ 
                color: '#1F2937',
                fontSize: '24px',
                fontWeight: '700',
                margin: '0',
                background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                AI Analysis Results
              </h3>
            </div>
            
            <div style={{
              background: '#FFFFFF',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              textAlign: 'left'
            }}>
              {review.split('\n').map((line, index) => (
                <p key={index} style={{ 
                  margin: line.trim() ? '12px 0' : '8px 0',
                  lineHeight: '1.8',
                  color: '#374151',
                  fontSize: '16px',
                  textAlign: 'left'
                }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

export default TextAnalyzer;