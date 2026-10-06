import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Voyager Luxe UI Catch:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[500px] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-[#F5E6D3] rounded-2xl shadow-luxury p-8 text-center">
            <span className="text-3xl text-luxury-brown block mb-3">✦</span>
            <h2 className="font-serif text-2xl font-bold text-luxury-dark mb-2">
              Exceptional Moment Encountered
            </h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Our digital concierge encountered a momentary discrepancy. Your journey data remains fully secure.
            </p>
            <button
              onClick={() => (window.location.href = '/')}
              className="btn-primary w-full text-xs font-semibold uppercase tracking-wider"
            >
              Return to Grand Sanctuary
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
