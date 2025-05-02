import React from 'react'
import { Component } from 'react'

class ErrorBoundary extends Component {
    state= { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught:', error, errorInfo);
    }
    
    handleRetry = () => {
        this.setState({ hasError: false });
        window.location.reload();
    };

    render() {
        if(this.state.hasError) {
            return(
                <div className='error-fallback text-center p-8 text-red-400'>
                    <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
                    <button 
                     onClick={this.handleRetry}
                     className='bg-white text-purple-950 px-4 py-2 rounded'
                     aria-label="Retry loading application"
                    >
                        Retry
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;